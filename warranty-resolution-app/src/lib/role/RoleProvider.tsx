import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";

// The personas the app can sign in as, from the FUSION 2026 storyboard's settled
// cast. The storyboard pins three in the header strip — Sarah, Miguel, Ryan —
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
  /** Stages this persona is accountable for — scopes their queue. */
  stages: string[];
  /**
   * Case detail defaults to the work-focused layout for field-facing personas
   * (SDD §3 "Case Detail — field view").
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
  return "lead"; // Sarah Chen is the persona the demo opens on.
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(readInitialRole);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, role);
    } catch {
      /* ignore */
    }
  }, [role]);

  const setRole = useCallback((next: Role) => setRoleState(next), []);

  return (
    <RoleContext.Provider value={{ role, profile: ROLE_PROFILES[role], setRole }}>
      {children}
    </RoleContext.Provider>
  );
}
