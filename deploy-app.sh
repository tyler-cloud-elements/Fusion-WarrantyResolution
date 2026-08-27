#!/usr/bin/env bash
#
# Build, pack, publish, and deploy a UiPath coded app.
#
# Usage:
#   ./deploy-app.sh <app-path> [version]
#
# Examples:
#   ./deploy-app.sh warranty-resolution-app
#   ./deploy-app.sh warranty-resolution-app 1.2.0
#
# When no version is provided, the script reads the current version from
# <app-path>/.uipath/app.config.json and bumps the patch component.
#
# First deploy only: pass --path-name to pin the URL segment, e.g.
#   uip codedapp deploy -n warranty-resolution-app --path-name warranty-resolution
# On an upgrade the routing name already exists and passing it again fails with
# HTTP 400 "routing name must be unique" — which is why this script never sends it.

set -euo pipefail

APP_PATH="${1:-}"
VERSION_ARG="${2:-}"

if [[ -z "$APP_PATH" ]]; then
  echo "Usage: $0 <app-path> [version]" >&2
  exit 1
fi

if [[ ! -d "$APP_PATH" ]]; then
  echo "App path not found: $APP_PATH" >&2
  exit 1
fi

if ! command -v uip >/dev/null 2>&1; then
  echo "uip CLI not found in PATH. Install with: npm i -g @uipath/cli" >&2
  echo "Then, from OUTSIDE this repo: uip tools install @uipath/codedapp-tool" >&2
  exit 1
fi

cd "$APP_PATH"

# Read JSON value — uses jq when present, falls back to a sed extractor for
# the simple shapes we ship in .uipath/app.config.json and package.json.
read_json() {
  local file="$1" key="$2"
  if [[ ! -f "$file" ]]; then return 0; fi
  if command -v jq >/dev/null 2>&1; then
    jq -r --arg k "$key" '.[$k] // empty' "$file"
  else
    sed -n "s/.*\"${key}\"[[:space:]]*:[[:space:]]*\"\\([^\"]*\\)\".*/\\1/p" "$file" | head -1
  fi
}

CONFIG_FILE=".uipath/app.config.json"
APP_NAME=$(read_json "$CONFIG_FILE" "appName")
CURRENT_VERSION=$(read_json "$CONFIG_FILE" "appVersion")

if [[ -z "$APP_NAME" ]]; then
  APP_NAME=$(read_json "package.json" "name")
fi
if [[ -z "$APP_NAME" ]]; then
  echo "Could not determine app name (looked in $CONFIG_FILE and package.json)." >&2
  exit 1
fi

if [[ -n "$VERSION_ARG" ]]; then
  VERSION="$VERSION_ARG"
elif [[ -n "$CURRENT_VERSION" ]]; then
  IFS='.' read -r MAJOR MINOR PATCH <<<"$CURRENT_VERSION"
  if [[ -z "${MAJOR:-}" || -z "${MINOR:-}" || -z "${PATCH:-}" ]]; then
    echo "Could not parse version '$CURRENT_VERSION' from $CONFIG_FILE — pass version explicitly." >&2
    exit 1
  fi
  VERSION="$MAJOR.$MINOR.$((PATCH + 1))"
else
  VERSION="0.1.0"
fi

echo "==> $APP_NAME"
echo "    path:    $APP_PATH"
echo "    version: $VERSION${CURRENT_VERSION:+ (was $CURRENT_VERSION)}"

# The platform injects <base href="/<routing-name>/">, so the bundle MUST use
# relative asset paths. `build:uipath` sets UIPATH_BUILD=1, which flips
# vite.config.ts to base "./".
echo "==> npm run build:uipath"
npm run build:uipath

# `uip codedapp pack` only WARNS on absolute asset paths, and the result is a
# blank page in production. Fail here instead.
echo "==> verifying relative asset paths"
if grep -qE '(src|href)="/assets' dist/index.html; then
  echo "Absolute asset paths in dist/index.html — the deployed app would 404 its bundle." >&2
  grep -oE '(src|href)="[^"]*assets[^"]*"' dist/index.html >&2
  exit 1
fi
grep -oE '(src|href)="[^"]*assets[^"]*"' dist/index.html | head -3

echo "==> uip codedapp pack dist -n $APP_NAME -v $VERSION"
uip codedapp pack dist -n "$APP_NAME" -v "$VERSION"

echo "==> uip codedapp publish"
uip codedapp publish -n "$APP_NAME" --version "$VERSION"

echo "==> uip codedapp deploy"
uip codedapp deploy -n "$APP_NAME"

echo "==> Done. $APP_NAME v$VERSION deployed."
