import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";

import { useFlags } from "@/lib/flags";
import { renameProfiles } from "@/lib/warranty/ciPersona";

// The personas the app can sign in as, from the FUSION 2026 storyboard's settled
// cast. The storyboard pins three in the header strip (Sarah, Miguel, Ryan)
// and names three more who own work in the case: Priya (process owner), Tom
// (claims administration) and Kelsey (parts). Kelsey is switchable here because
// the parts substitution lane needs an actor; Priya and Tom appear as names on
// cases without being sign-in identities.
//
// The storyboard is explicit that the cast is settled: no second Priya, no
// duplicated engineer. Add a persona only when the case plan grows an owner
// that none of these six covers.
export type Role = "lead" | "engineering" | "quality" | "parts";

export interface RoleProfile {
  role: Role;
  name: string;
  email: string;
  title: string;
  initials: string;
  /** The stage owner label this persona maps to in the case plan and the SDD. */
  ownerGroup: string;
  /** Stages this persona is accountable for. Scopes their queue. */
  stages: string[];
  /**
   * Case detail defaults to the work-focused layout for field-facing personas
   * (SDD §3 "Case Detail, field view").
   */
  prefersFieldView?: boolean;
}

export const ROLE_PROFILES: Record<Role, RoleProfile> = {
  lead: {
    role: "lead",
    name: "Sarah Chen",
    email: "sarah.chen@cobaltridge.com",
    title: "Warranty Resolution Lead",
    initials: "SC",
    ownerGroup: "Global Warranty Operations",
    stages: [
      "Intake and impact triage",
      "Coverage and evidence review",
      "Resolution decision",
      "Waiting for customer evidence",
      "Close and learn",
    ],
  },
  engineering: {
    role: "engineering",
    name: "Miguel Alvarez",
    email: "miguel.alvarez@cobaltridge.com",
    title: "Reliability and Controls Engineer",
    initials: "MA",
    ownerGroup: "Engineering",
    stages: ["Diagnose and contain", "Engineering exception"],
    prefersFieldView: true,
  },
  quality: {
    role: "quality",
    name: "Ryan Ochoa",
    email: "ryan.ochoa@cobaltridge.com",
    title: "Product Quality Lead",
    initials: "RO",
    ownerGroup: "Quality / Reliability",
    stages: ["Close and learn", "Product-quality escalation"],
  },
  parts: {
    role: "parts",
    name: "Kelsey Nordstrom",
    email: "kelsey.nordstrom@cobaltridge.com",
    title: "Parts and Logistics Lead",
    initials: "KN",
    ownerGroup: "Parts / Logistics",
    stages: ["Parts substitution review", "Restore and validate"],
    prefersFieldView: true,
  },
};

/** Everyone who can own a case or appear in the trail, including non-sign-in names. */
export const CAST = [
  ...Object.values(ROLE_PROFILES).map((p) => ({ name: p.name, title: p.title })),
  { name: "Priya Raghunathan", title: "Warranty Process Owner" },
  { name: "Tom Beckerman", title: "Claims Administrator" },
];

const STORAGE_KEY = "warranty-app-role";

interface RoleContextValue {
  role: Role;
  profile: RoleProfile;
  setRole: (role: Role) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const RoleContext = createContext<RoleContextValue | null>(null);

function readInitialRole(): Role {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored in ROLE_PROFILES) return stored as Role;
  } catch {
    /* ignore */
  }
  // The lead is the persona the demo opens on. Named by role rather than by name
  // here, because who the lead IS now depends on a flag this function cannot read.
  return "lead";
}

/**
 * THE CAST AS THE APP SHOULD SHOW IT, which depends on a flag.
 *
 * `ROLE_PROFILES` above stays the source of truth — the storyboard's settled cast,
 * and what the app is without the CI flag. This is the accessor everything reads
 * instead, because with `ciCoverageDecision` on the lead is Scott Florentino
 * (../warranty/ciPersona.ts).
 *
 * **IT EXISTS BECAUSE THE PROVIDER IS NOT THE ONLY READER.** Renaming inside
 * `RoleProvider` below would have been one line and would have left the old name
 * in three places: the persona switcher menu
 * (../../components/ui/shell-user-profile-menu-items.tsx), the switcher itself
 * (../../components/warranty/PersonaSwitcher.tsx) and the case Details tab's owner
 * dropdown (../../components/warranty/CaseDetailsTab.tsx). All three import the
 * constant directly. They read this now, and the provider does too, so there is
 * one answer to "what is the lead called" rather than two.
 *
 * That last one had a sharper version of the bug: it looks a persona's title up by
 * `p.name === chosenOwner`. With the menu renamed and the lookup table not, picking
 * the lead as owner would have found nobody and blanked the role.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useRoleProfiles(): Record<Role, RoleProfile> {
  const { ciCoverageDecision } = useFlags();
  return useMemo(
    () => (ciCoverageDecision ? renameProfiles(ROLE_PROFILES) : ROLE_PROFILES),
    [ciCoverageDecision],
  );
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(readInitialRole);
  const profiles = useRoleProfiles();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, role);
    } catch {
      /* ignore */
    }
  }, [role]);

  const setRole = useCallback((next: Role) => setRoleState(next), []);

  return (
    <RoleContext.Provider value={{ role, profile: profiles[role], setRole }}>
      {children}
    </RoleContext.Provider>
  );
}
