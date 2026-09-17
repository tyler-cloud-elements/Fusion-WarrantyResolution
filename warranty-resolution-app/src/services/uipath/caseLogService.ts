import { Entities } from "@uipath/uipath-typescript/entities";
import type { EntityRecord } from "@uipath/uipath-typescript/entities";
import type { UiPath } from "@uipath/uipath-typescript/core";
import type { CaseComment, EvidenceDocument } from "@/lib/warranty/types";
import { integrationConfig, isUiPathConfigured } from "./config";

// Writes to the WarrantyCaseCommentOrDocument entity in Data Fabric: one row per
// comment, per uploaded document, or per comment carrying a document.
//
// A document is an attachment on a record rather than a row of its own, so the
// two have to be written in that order: insert the row, then upload against the
// id it comes back with. There is no single call that does both.

/** The entity's own column names. Renaming one in Data Fabric breaks this. */
const FIELD = {
  caseId: "CaseId",
  comment: "CaseComment",
  document: "CaseDocument",
} as const;

export interface CaseNote {
  /** Maestro case instance GUID. The entity keys on it, not the business id. */
  caseId: string;
  comment?: string;
  file?: File;
}

export interface CaseNoteResult {
  recordId: string;
  /** False when the row was written but its attachment was not. */
  fileAttached: boolean;
}

export function isCaseLogConfigured(): boolean {
  return isUiPathConfigured() && Boolean(integrationConfig.caseLogEntityId);
}

/**
 * Writes one note, with its document if it has one.
 *
 * Throws rather than degrading. The caller has already put the comment on screen
 * from session state, so the demo is intact either way, and a write that failed
 * silently would leave the entity and the screen disagreeing with nobody the
 * wiser.
 */
export async function writeCaseNote(sdk: UiPath, note: CaseNote): Promise<CaseNoteResult> {
  const entityId = integrationConfig.caseLogEntityId;
  if (!entityId) throw new Error("No case log entity configured");
  if (!note.caseId) throw new Error("No case instance id to write against");
  if (!note.comment?.trim() && !note.file) throw new Error("Nothing to write");

  const entities = new Entities(sdk);

  const row: Record<string, unknown> = { [FIELD.caseId]: note.caseId };
  if (note.comment?.trim()) row[FIELD.comment] = note.comment.trim();

  const record = await entities.insertRecordById(entityId, row);
  const recordId = record?.Id;
  if (!recordId) throw new Error("Data Fabric accepted the row but returned no id");

  if (!note.file) return { recordId, fileAttached: false };

  // The row is already written at this point. A failed upload is reported as a
  // failed upload, not as a failed comment, because deleting the row to make the
  // call atomic would throw away the part that succeeded.
  await entities.uploadAttachment(entityId, recordId, FIELD.document, note.file);
  return { recordId, fileAttached: true };
}


// ── Reading back ────────────────────────────────────────────────────────────

/** How many rows to walk looking for one case's notes. */
const PAGE = 200;
const MAX_PAGES = 5;

function text(record: EntityRecord, field: string): string {
  const value = record[field];
  return typeof value === "string" ? value.trim() : "";
}

/** An attachment column holds an object once a file is on the row, null before. */
function attachmentName(record: EntityRecord): string | null {
  const value = record[FIELD.document];
  if (!value || typeof value !== "object") return null;
  const name = (value as { name?: unknown }).name;
  return typeof name === "string" && name ? name : "Attachment";
}

export interface CaseLog {
  comments: CaseComment[];
  documents: EvidenceDocument[];
}

/**
 * Every note written against one case instance.
 *
 * The entity has no server-side filter, so rows come back whole and are matched
 * here. A row can carry a comment, a document, or both, and contributes to
 * whichever lists apply rather than being one or the other.
 *
 * Returns empty rather than throwing. A case that cannot reach Data Fabric
 * should still open on what the app already has.
 */
export async function fetchCaseLog(sdk: UiPath, caseInstanceId: string): Promise<CaseLog> {
  const entityId = integrationConfig.caseLogEntityId;
  if (!entityId || !caseInstanceId) return { comments: [], documents: [] };

  try {
    const entities = new Entities(sdk);
    // The cursor type is internal to the SDK, so it is carried rather than
    // named: the first page asks for none, later pages hand back what they got.
    const rows: EntityRecord[] = [];
    let page = await entities.getAllRecords(entityId, { pageSize: PAGE });
    rows.push(...page.items);
    for (let i = 1; i < MAX_PAGES && page.hasNextPage && page.nextCursor; i++) {
      page = await entities.getAllRecords(entityId, { pageSize: PAGE, cursor: page.nextCursor });
      rows.push(...page.items);
    }

    const mine = rows.filter((r) => text(r, FIELD.caseId) === caseInstanceId);
    const comments: CaseComment[] = [];
    const documents: EvidenceDocument[] = [];

    for (const row of mine) {
      const when = typeof row.CreateTime === "string" ? row.CreateTime : new Date().toISOString();
      const who = text(row, "CreatedBy") || "Unknown";

      const body = text(row, FIELD.comment);
      if (body) comments.push({ author: who, role: "", time: when, text: body });

      const file = attachmentName(row);
      if (file) {
        documents.push({
          // The record id, so a second read does not duplicate the row and the
          // attachment can be downloaded against it.
          id: row.Id,
          kind: "pdf",
          title: file,
          addedAt: when,
          addedBy: who,
          helpful: null,
        });
      }
    }

    comments.sort((a, b) => Date.parse(a.time) - Date.parse(b.time));
    documents.sort((a, b) => Date.parse(b.addedAt) - Date.parse(a.addedAt));
    return { comments, documents };
  } catch (err) {
    console.warn("Could not read the case log from Data Fabric:", err);
    return { comments: [], documents: [] };
  }
}

/** The attachment on one note row. */
export function downloadCaseNoteFile(sdk: UiPath, recordId: string): Promise<Blob> {
  return new Entities(sdk).downloadAttachment(
    integrationConfig.caseLogEntityId,
    recordId,
    FIELD.document,
  );
}
