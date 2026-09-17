import { useCallback, useState } from "react";
import { fileToDocument } from "./evidenceFiles";
import { addCaseComment, addCaseEvidence } from "./useCases";
import { useRole } from "@/lib/role/useRole";
import { isCaseLogConfigured, writeCaseNote } from "@/services/uipath/caseLogService";
import { useUiPath } from "@/services/uipath/UiPathProvider";
import type { WarrantyCase } from "./types";

// Adding a comment, a document, or a comment carrying a document. One path, so
// the three cannot drift apart, and one place that knows a note also goes to
// Data Fabric.

export interface CaseNoteInput {
  comment?: string;
  file?: File | null;
}

export interface CaseNotes {
  submit: (input: CaseNoteInput) => Promise<void>;
  /** A write is in flight. */
  pending: boolean;
  /** Why the last note did not reach Data Fabric, if it did not. */
  error: string | null;
  /** True when a note will be written, rather than only held in session. */
  writesToEntity: boolean;
}

export function useCaseNotes(warrantyCase: WarrantyCase): CaseNotes {
  const { sdk, isAuthenticated } = useUiPath();
  const { profile } = useRole();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const writesToEntity = isCaseLogConfigured() && isAuthenticated && Boolean(sdk);

  const submit = useCallback(
    async ({ comment, file }: CaseNoteInput) => {
      const text = comment?.trim() ?? "";
      if (!text && !file) return;

      // On screen first. The demo should never sit waiting on a round trip, and
      // a failed write is reported rather than rolled back.
      if (text) {
        addCaseComment(warrantyCase, {
          author: profile.name,
          role: profile.title,
          time: new Date().toISOString(),
          text,
        });
      }
      if (file) addCaseEvidence(warrantyCase, [fileToDocument(file, profile.name)]);

      if (!writesToEntity) return;

      setPending(true);
      setError(null);
      try {
        // The instance GUID is what the entity's CaseId column holds. A demo row
        // has none, so its business id goes instead: a row that says
        // WR-2026-0417 is more use than a row that says nothing.
        await writeCaseNote(sdk!, {
          caseId: warrantyCase.instanceId || warrantyCase.id,
          comment: text || undefined,
          file: file ?? undefined,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Data Fabric rejected the write");
        console.warn("Case note not written to Data Fabric:", err);
      } finally {
        setPending(false);
      }
    },
    [sdk, profile.name, profile.title, warrantyCase, writesToEntity],
  );

  return { submit, pending, error, writesToEntity };
}
