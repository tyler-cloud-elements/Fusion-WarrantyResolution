// Runtime configuration, read once from Vite env.
//
// Every value is optional. With the UiPath block unset the app runs entirely on
// the bundled demo dataset — which is the state a fresh clone starts in, and the
// state to leave it in until the real case is published.

import type { UiPathSDKConfig } from "@uipath/uipath-typescript/core";

function env(key: string): string {
  const value = import.meta.env[key as keyof ImportMetaEnv];
  return typeof value === "string" ? value.trim() : "";
}

export const uipathConfig = {
  baseUrl: env("VITE_UIPATH_BASE_URL"),
  orgName: env("VITE_UIPATH_ORG_NAME"),
  tenantName: env("VITE_UIPATH_TENANT_NAME"),
  clientId: env("VITE_UIPATH_CLIENT_ID"),
  redirectUri: env("VITE_UIPATH_REDIRECT_URI"),
  scopes: env("VITE_UIPATH_SCOPES"),
} as const;

export const caseConfig = {
  /** processKey of the published Maestro case. Blank ⇒ demo dataset only. */
  processKey: env("VITE_CASE_PROCESS_KEY"),
  folderKey: env("VITE_CASE_FOLDER_KEY"),
  /**
   * The process the "New case" button starts.
   *
   * Falls back to the case process itself, which is the common setup. Point it
   * at a separate seeding process when one exists — the demo arguments
   * (`demoScenario`, `demoRunId`, `ownerEmail`) suggest a launcher rather than
   * the case's own intake contract, so this is deliberately its own setting.
   */
  newCaseProcessKey: env("VITE_NEW_CASE_PROCESS_KEY") || env("VITE_CASE_PROCESS_KEY"),
  newCaseFolderKey: env("VITE_NEW_CASE_FOLDER_KEY") || env("VITE_CASE_FOLDER_KEY"),
} as const;

export const integrationConfig = {
  evidenceEntityId: env("VITE_EVIDENCE_ENTITY_ID"),
  evidenceWebhookUrl: env("VITE_EVIDENCE_WEBHOOK_URL"),
  assistantAgentId: env("VITE_ASSISTANT_AGENT_ID"),
  assistantFolderId: env("VITE_ASSISTANT_FOLDER_ID"),
} as const;

/**
 * The SDK cannot be constructed without these four. When any is missing the app
 * stays in demo mode and never renders a login screen — a demo that asks for
 * credentials it does not have is worse than one that just runs.
 */
export function isUiPathConfigured(): boolean {
  return Boolean(
    uipathConfig.baseUrl &&
      uipathConfig.orgName &&
      uipathConfig.tenantName &&
      uipathConfig.clientId,
  );
}

/** True once a case is pointed at — the gate on every live read. */
export function isCaseConfigured(): boolean {
  return isUiPathConfigured() && Boolean(caseConfig.processKey);
}

export function isAssistantConfigured(): boolean {
  return Boolean(integrationConfig.assistantAgentId && integrationConfig.assistantFolderId);
}

/**
 * Default redirect URI: the app's own origin + path. That is what the UiPath
 * Coded Apps host needs, since the app is served under /<routing-name>/ and the
 * External App is registered against that exact URL.
 */
function defaultRedirectUri(): string {
  if (typeof window === "undefined") return "";
  const { origin, pathname } = window.location;
  return pathname === "/" ? origin : `${origin}${pathname}`;
}

export function buildSdkConfig(): UiPathSDKConfig {
  return {
    baseUrl: uipathConfig.baseUrl,
    orgName: uipathConfig.orgName,
    tenantName: uipathConfig.tenantName,
    clientId: uipathConfig.clientId,
    redirectUri: uipathConfig.redirectUri || defaultRedirectUri(),
    scope: uipathConfig.scopes,
  };
}

/** Deep link to a task in Action Center, for the "Open in Action Center" affordance. */
export function actionCenterUrl(taskId: number | string): string | null {
  if (!uipathConfig.baseUrl || !uipathConfig.orgName || !uipathConfig.tenantName) return null;
  return `${uipathConfig.baseUrl}/${uipathConfig.orgName}/${uipathConfig.tenantName}/actions_/tasks/${taskId}`;
}

/**
 * Deep link to a case instance run in Maestro.
 *
 * The shape is the one the product actually uses — the case processKey is part
 * of the path and the folder rides as a query param, both of which the page
 * needs to resolve the run:
 *   /{org}/{tenant}/maestro_/cases/{processKey}/instances/{instanceId}?folderKey=…
 */
export function maestroInstanceUrl(
  instanceId: string,
  folderKey?: string,
  processKey?: string,
): string | null {
  const key = processKey || caseConfig.processKey;
  if (!instanceId || !key) return null;
  if (!uipathConfig.baseUrl || !uipathConfig.orgName || !uipathConfig.tenantName) return null;

  const folder = folderKey || caseConfig.folderKey;
  const query = folder ? `?folderKey=${encodeURIComponent(folder)}` : "";
  return `${uipathConfig.baseUrl}/${uipathConfig.orgName}/${uipathConfig.tenantName}/maestro_/cases/${key}/instances/${instanceId}${query}`;
}

/** True once the "New case" button has somewhere to send a job. */
export function isNewCaseConfigured(): boolean {
  return isUiPathConfigured() && Boolean(caseConfig.newCaseProcessKey);
}
