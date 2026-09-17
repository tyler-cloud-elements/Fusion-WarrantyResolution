import { Entities, QueryFilterOperator } from "@uipath/uipath-typescript/entities";
import type { EntityRecord } from "@uipath/uipath-typescript/entities";
import type { UiPath } from "@uipath/uipath-typescript/core";
import type { CaseComment, EvidenceDocument } from "@/lib/warranty/types";
import { extensionOf, kindFromName } from "@/lib/warranty/evidenceFiles";
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

/** Notes per case. More than this and the oldest are not shown. */
const PAGE = 200;

/**
 * A long-text column comes back from a query as a size marker rather than its
 * contents, e.g. `HasValue=true Length=512`. Reading that record on its own
 * returns the text.
 */
const SIZE_MARKER = /^HasValue=(true|false)\s+Length=\d+$/i;

function text(record: EntityRecord, field: string): string {
  const value = record[field];
  return typeof value === "string" ? value.trim() : "";
}

/**
 * `CreatedBy` is a user object, not a name: `{ Name, Email, Id, … }`. Reading it
 * as a string gets nothing, which is why every note came back as "Unknown".
 * The nested fields need `expansionLevel` on the query to be populated at all.
 */
function person(record: EntityRecord, field: string): { name: string; email: string } {
  const value = record[field];
  if (!value || typeof value !== "object") {
    return { name: typeof value === "string" ? value.trim() : "", email: "" };
  }
  const user = value as { Name?: unknown; Email?: unknown };
  return {
    name: typeof user.Name === "string" ? user.Name : "",
    email: typeof user.Email === "string" ? user.Email : "",
  };
}

interface Attachment {
  name: string;
  mimeType: string;
  size: number;
}

/**
 * The attachment column, absent until a file is on the row.
 *
 * Its keys are capitalised (`Name`, `Type`, `Size`), unlike the lower-cased
 * shape the SDK's own types suggest, so both spellings are read.
 */
function attachment(record: EntityRecord): Attachment | null {
  const value = record[FIELD.document];
  if (!value) return null;
  if (typeof value === "string") {
    return value.trim() ? { name: value.trim(), mimeType: "", size: 0 } : null;
  }
  if (typeof value !== "object") return null;

  const file = value as Record<string, unknown>;
  const pick = (...keys: string[]) => keys.map((k) => file[k]).find((v) => v != null);
  const name = pick("Name", "name");
  const mimeType = pick("Type", "type", "contentType");
  const size = pick("Size", "size");
  return {
    name: typeof name === "string" && name ? name : "Attachment",
    mimeType: typeof mimeType === "string" ? mimeType : "",
    size: typeof size === "number" ? size : 0,
  };
}

export interface CaseLog {
  comments: CaseComment[];
  documents: EvidenceDocument[];
}

/**
 * Every note written against one case instance.
 *
 * Filtered by the server on `CaseId` rather than read whole and matched here,
 * so the tenant's other cases never come down the wire.
 *
 * Returns empty rather than throwing. A case that cannot reach Data Fabric
 * should still open on what the app already has.
 */
export async function fetchCaseLog(sdk: UiPath, caseInstanceId: string): Promise<CaseLog> {
  const entityId = integrationConfig.caseLogEntityId;
  if (!entityId || !caseInstanceId) return { comments: [], documents: [] };

  try {
    const entities = new Entities(sdk);
    const page = await entities.queryRecordsById(entityId, {
      filterGroup: {
        queryFilters: [
          { fieldName: FIELD.caseId, operator: QueryFilterOperator.Equals, value: caseInstanceId },
        ],
      },
      sortOptions: [{ fieldName: "CreateTime", isDescending: false }],
      // CreatedBy and CaseDocument are references. Without expansion the author
      // comes back empty and every note is signed "Unknown".
      expansionLevel: 3,
      pageSize: PAGE,
    });

    const comments: CaseComment[] = [];
    const documents: EvidenceDocument[] = [];

    for (const row of page.items) {
      const when = typeof row.CreateTime === "string" ? row.CreateTime : new Date().toISOString();
      const author = person(row, "CreatedBy");
      const who = author.name || author.email || "Unknown";

      const file = attachment(row);

      let body = text(row, FIELD.comment);
      if (SIZE_MARKER.test(body)) {
        const full = await entities.getRecordById(entityId, row.Id).catch(() => null);
        body = full ? text(full, FIELD.comment) : "";
      }
      if (body) {
        comments.push({
          author: who,
          role: "",
          time: when,
          text: body,
          authorEmail: author.email,
          // The row is one note. A comment filed with a document says so rather
          // than leaving the reader to spot it in the Documents tab.
          attachment: file ? { title: file.name, recordId: row.Id } : undefined,
        });
      }

      if (file) {
        const sizeKb = file.size ? Math.max(1, Math.round(file.size / 1024)) : 0;
        documents.push({
          id: row.Id,
          kind: kindFromName(file.name),
          title: file.name,
          // The same line an upload shows, so a note's document and a picked
          // file read alike in the list.
          verdict: sizeKb ? `${extensionOf(file.name)} · ${sizeKb} KB` : undefined,
          addedAt: when,
          addedBy: who,
          helpful: null,
          // What the viewer downloads the bytes against.
          attachmentRecordId: row.Id,
        });
      }
    }

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
