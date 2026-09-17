import { Entities } from "@uipath/uipath-typescript/entities";
import type { UiPath } from "@uipath/uipath-typescript/core";
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
