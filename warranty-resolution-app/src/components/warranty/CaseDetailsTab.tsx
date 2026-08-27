import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { PriorityBadge, SlaBadge } from "@/components/warranty/badges";
import { dateTime, money } from "@/lib/warranty/format";
import { ROLE_PROFILES } from "@/lib/role/RoleProvider";
import type { Priority, WarrantyCase } from "@/lib/warranty/types";

// The Details tab: the case record, grouped the way a warranty coordinator
// thinks about it — who and where, what broke, what it's worth, and the case
// variables Maestro carries.
//
// Almost everything is read-only, because the connected systems are the record:
// AssetVault owns the asset, the warranty system owns entitlement, SAP owns
// cost. Only fields the case itself owns are editable, and only for the case
// owner. Editing one writes to session state, not to Maestro.

type FieldType = "text" | "tel" | "email" | "number" | "select";

interface FieldDef {
  key: string;
  label: string;
  type?: FieldType;
  options?: readonly string[];
  /** Editable inline. Everything else is a system of record. */
  editable?: boolean;
  /** Read the value off the case rather than a flat key. */
  value: (c: WarrantyCase) => React.ReactNode;
  /** The raw value an editor starts from. */
  raw?: (c: WarrantyCase) => string;
  /** Applied on save. */
  patch?: (v: string) => Partial<WarrantyCase>;
}

const PRIORITIES: readonly Priority[] = ["P1", "P2", "P3", "P4"];
const OWNERS = Object.values(ROLE_PROFILES).map((p) => p.name);

const CARDS: { id: string; title: string; fields: FieldDef[] }[] = [
  {
    id: "customer",
    title: "Customer and site",
    fields: [
      { key: "customer", label: "Customer", value: (c) => c.customer },
      { key: "site", label: "Site", value: (c) => c.site },
      {
        key: "lineStatus",
        label: "Line status",
        value: (c) =>
          c.lineStatus ? (
            <span className="text-destructive">
              {c.lineStatus}
              {c.lineDownHours ? ` · ${c.lineDownHours} hr` : ""}
            </span>
          ) : (
            "Operational"
          ),
      },
      {
        key: "owner",
        label: "Case owner",
        type: "select",
        options: OWNERS,
        editable: true,
        value: (c) => `${c.owner}${c.ownerRole ? ` · ${c.ownerRole}` : ""}`,
        raw: (c) => c.owner,
        patch: (v) => ({
          owner: v,
          ownerRole: Object.values(ROLE_PROFILES).find((p) => p.name === v)?.title ?? "",
        }),
      },
    ],
  },
  {
    id: "asset",
    title: "Asset and entitlement",
    fields: [
      { key: "assetModel", label: "Model", value: (c) => c.asset.model || "—" },
      { key: "assetSerial", label: "Serial", value: (c) => c.asset.serial || "—" },
      { key: "assetDescription", label: "Description", value: (c) => c.asset.description || "—" },
      {
        key: "inService",
        label: "In service",
        value: (c) => (c.asset.inServiceMonths ? `${c.asset.inServiceMonths} months` : "—"),
      },
      { key: "warrantyStatus", label: "Warranty status", value: (c) => c.asset.warrantyStatus },
      {
        key: "coveragePosition",
        label: "Coverage position",
        value: (c) => String(c.variables["Coverage.Position"] ?? "—"),
      },
    ],
  },
  {
    id: "failure",
    title: "Failure and impact",
    fields: [
      { key: "description", label: "Reported failure", value: (c) => c.description },
      {
        key: "priority",
        label: "Priority",
        type: "select",
        options: PRIORITIES,
        editable: true,
        value: (c) => <PriorityBadge priority={c.priority} />,
        raw: (c) => c.priority,
        // The P1 override in SDD §1 keys off this, so changing it changes the
        // case clock — which is exactly why it is worth being editable.
        patch: (v) => ({ priority: v as Priority }),
      },
      {
        key: "queueReason",
        label: "Why it needs a person",
        value: (c) => c.queueReason ?? "Nothing outstanding",
      },
      { key: "openedAt", label: "Opened", value: (c) => dateTime(c.openedAt) },
      { key: "lastUpdatedAt", label: "Last update", value: (c) => dateTime(c.lastUpdatedAt) },
    ],
  },
  {
    id: "commercial",
    title: "Commercial and status",
    fields: [
      {
        key: "claimValue",
        label: "Claim value",
        type: "number",
        editable: true,
        value: (c) => money(c.claimValue),
        raw: (c) => String(c.claimValue),
        patch: (v) => ({ claimValue: Number(v) || 0 }),
      },
      { key: "currentStage", label: "Current stage", value: (c) => c.currentStage },
      {
        key: "activeLanes",
        label: "Open lanes",
        value: (c) => (c.activeLanes.length ? c.activeLanes.join(", ") : "None"),
      },
      { key: "status", label: "Status", value: (c) => c.status },
      { key: "slaStatus", label: "Stage SLA", value: (c) => <SlaBadge status={c.slaStatus} /> },
      { key: "closureReason", label: "Closure reason", value: (c) => c.closureReason ?? "—" },
    ],
  },
];

function inputType(type?: FieldType): React.HTMLInputTypeAttribute {
  if (type === "number") return "number";
  if (type === "email") return "email";
  if (type === "tel") return "tel";
  return "text";
}

export function CaseDetailsTab({
  warrantyCase,
  editable = false,
  onSave,
  rail = false,
}: {
  warrantyCase: WarrantyCase;
  /** Case owner only — enables the pencils. */
  editable?: boolean;
  onSave?: (patch: Partial<WarrantyCase>) => void;
  rail?: boolean;
}) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  function startEdit(field: FieldDef) {
    setDraft(field.raw?.(warrantyCase) ?? "");
    setEditingKey(field.key);
  }

  function cancel() {
    setEditingKey(null);
    setDraft("");
  }

  function save(field: FieldDef) {
    const value = draft.trim();
    if (!value || !field.patch) return cancel();
    onSave?.(field.patch(value));
    cancel();
  }

  return (
    <div className={rail ? "flex flex-col gap-4" : "grid gap-4 lg:grid-cols-2"}>
      {CARDS.map((card) => (
        <Card key={card.id} className="gap-4 p-5">
          <span className="text-base font-semibold">{card.title}</span>
          <div className="flex flex-col gap-4">
            {card.fields.map((field) => {
              const isEditing = editingKey === field.key;
              const canEdit = editable && field.editable && !rail;
              return (
                <div key={field.key} className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">{field.label}</span>
                  {isEditing ? (
                    <div className="flex flex-col gap-2">
                      {field.type === "select" ? (
                        <Select value={draft} onValueChange={setDraft}>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((o) => (
                              <SelectItem key={o} value={o}>
                                {o}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          autoFocus
                          type={inputType(field.type)}
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          className={cn(field.type === "number" && "tabular-nums")}
                        />
                      )}
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={cancel}>
                          Cancel
                        </Button>
                        <Button size="sm" disabled={!draft.trim()} onClick={() => save(field)}>
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{field.value(warrantyCase)}</span>
                      {canEdit && (
                        <button
                          type="button"
                          aria-label={`Edit ${field.label}`}
                          onClick={() => startEdit(field)}
                          className="grid size-6 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <Pencil className="size-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      ))}

      {/* Case variables get their own card: they are Maestro's, not the app's,
          and the instance view shows the same list. */}
      <Card className="gap-4 p-5">
        <span className="text-base font-semibold">Case variables</span>
        <div className="flex flex-col gap-4">
          {Object.entries(warrantyCase.variables).map(([name, value]) => (
            <div key={name} className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">{name}</span>
              <span className="text-sm font-medium">{String(value)}</span>
            </div>
          ))}
          {warrantyCase.instanceId && (
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground">Instance ID</span>
              <span className="text-sm font-medium tabular-nums">{warrantyCase.instanceId}</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
