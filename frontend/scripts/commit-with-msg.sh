#!/usr/bin/env bash
set -euo pipefail

# Wrapper to generate a commit message from staged changes and commit with it.
# Usage: ./scripts/commit-with-msg.sh [git commit args...]

TMPMSG="/tmp/git-commit-msg.$$"
node "$(dirname "$0")/generate-commit-msg.js" "$TMPMSG"

# If additional args supplied, pass them to git commit; without -m, git will use -F file
if [ "$#" -eq 0 ]; then
  git commit -F "$TMPMSG"
else
  git commit -F "$TMPMSG" "$@"
fi

ret=$?
rm -f "$TMPMSG"
exit $ret
