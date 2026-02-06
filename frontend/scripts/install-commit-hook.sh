#!/usr/bin/env bash
set -euo pipefail

# Installs a prepare-commit-msg hook that fills the commit message file
# with the generated message when making a normal commit (not on merge/rebase).

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Determine the repository git directory so the script works when run from `frontend/` or repo root
GIT_DIR=$(git rev-parse --git-dir 2>/dev/null || echo ".git")
HOOK_PATH="$GIT_DIR/hooks/prepare-commit-msg"


mkdir -p "$(dirname "$HOOK_PATH")"

# Write hook with the absolute path to the node script embedded. Escape $1/$2 so
# they remain as variables in the generated hook (don't expand them at install time).
NODE_SCRIPT_PATH="${SCRIPT_DIR}/generate-commit-msg.js"

cat > "$HOOK_PATH" <<'HOOK'
#!/usr/bin/env bash
# prepare-commit-msg hook
# Arguments: $1 = path to the commit message file
#            $2 = commit source (message, template, merge, squash, commit)

MSGFILE="$1"
SOURCE="$2"

# Don't override messages created by merge, squash, or when an explicit message is provided
if [ "$SOURCE" = "merge" ] || [ "$SOURCE" = "squash" ] || [ "$SOURCE" = "commit" ]; then
  exit 0
fi

# The installer will replace __NODE_SCRIPT_PATH__ with the absolute path to the generator
NODE_SCRIPT="__NODE_SCRIPT_PATH__"
if [ -x "$(command -v node)" ] && [ -f "$NODE_SCRIPT" ]; then
  node "$NODE_SCRIPT" "$MSGFILE" || true
fi

HOOK

# Replace the placeholder with the real path (use macOS-compatible sed -i '')
sed -i '' "s|__NODE_SCRIPT_PATH__|$NODE_SCRIPT_PATH|g" "$HOOK_PATH"

chmod +x "$HOOK_PATH"
echo "Installed prepare-commit-msg hook to $HOOK_PATH"
