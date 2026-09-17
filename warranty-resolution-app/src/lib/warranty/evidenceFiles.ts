import type { EvidenceDocument } from "./types";

const EXTENSION_KIND: Record<string, EvidenceDocument["kind"]> = {
  pdf: "pdf",
  log: "log",
  txt: "log",
  csv: "log",
  zip: "zip",
  jpg: "image",
  jpeg: "image",
  png: "image",
  heic: "image",
};

/** A picked file as an evidence row. Id is derived so the same file twice is one row. */
export function fileToDocument(file: File, uploadedBy: string): EvidenceDocument {
  const dot = file.name.lastIndexOf(".");
  const extension = dot > 0 ? file.name.slice(dot + 1).toLowerCase() : "";
  const sizeKb = Math.max(1, Math.round(file.size / 1024));
  return {
    id: `up-${file.name}-${file.size}`,
    kind: EXTENSION_KIND[extension] ?? "pdf",
    title: file.name,
    verdict: `${extension.toUpperCase() || "FILE"} · ${sizeKb} KB`,
    addedAt: new Date().toISOString(),
    addedBy: uploadedBy,
    isNew: true,
    helpful: null,
  };
}
