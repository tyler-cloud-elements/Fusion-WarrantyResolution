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

  // A row is keyed on the Maestro instance GUID, so a case without one has
  // nothing to key on. Demo rows stay in session state rather than writing a row
  // the entity cannot join back to anything.
  const writesToEntity =
    isCaseLogConfigured() && isAuthenticated && Boolean(sdk) && Boolean(warrantyCase.instanceId);

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
        await writeCaseNote(sdk!, {
          caseId: warrantyCase.instanceId,
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
