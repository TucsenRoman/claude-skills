#!/usr/bin/env bash
# Refresh the upstream guides inside the ui-* skills. A map entry is a folder (copied whole,
# SKILL.md renamed GUIDE.md) or a single .md file (copied to GUIDE.md).
# Usage: sync.sh [--dry-run]
set -euo pipefail
dry=0; [ "${1:-}" = "--dry-run" ] && dry=1
SK="$HOME/.claude/skills"
here="$(cd "$(dirname "$0")/.." && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf -- "$tmp"' EXIT

node -e '
const j=require(process.argv[1]);
for (const [k,v] of Object.entries(j.repos)) console.log("REPO",k,v);
for (const m of j.map) console.log("MAP",m.repo,m.from,m.to);
' "$here/sources.json" > "$tmp/plan.txt"

while read -r kind a b c; do
  [ "$kind" = REPO ] && git clone --depth 1 -q "$b" "$tmp/$a"
done < "$tmp/plan.txt"

changed=0
while read -r kind repo from to; do
  [ "$kind" = MAP ] || continue
  src="$tmp/$repo/$from"; dst="$SK/$to"
  mkdir -p "$tmp/stage/$to"
  if [ -d "$src" ]; then cp -r "$src/." "$tmp/stage/$to/"
  elif [ -f "$src" ]; then cp "$src" "$tmp/stage/$to/GUIDE.md"
  else echo "MISSING upstream: $repo/$from (renamed or removed? update sources.json)"; continue; fi
  [ -f "$tmp/stage/$to/SKILL.md" ] && mv "$tmp/stage/$to/SKILL.md" "$tmp/stage/$to/GUIDE.md"
  if diff -rq "$tmp/stage/$to" "$dst" >/dev/null 2>&1; then echo "same     $to"
  else
    echo "UPDATED  $to"; changed=$((changed+1))
    if [ $dry -eq 0 ]; then rm -rf -- "$dst"; mkdir -p "$dst"; cp -r "$tmp/stage/$to/." "$dst/"; fi
  fi
done < "$tmp/plan.txt"

for d in "$tmp/emil/skills"/* "$tmp/taste/skills"/*; do
  [ -d "$d" ] || continue
  rel="${d#$tmp/}"; repo="${rel%%/*}"; path="${rel#*/}"
  grep -q "\"repo\": \"$repo\", \"from\": \"$path\"" "$here/sources.json" && continue
  grep -q "\"$repo/$path\"" "$here/sources.json" && continue  # deliberately ignored
  echo "NEW upstream skill (not mapped): $repo/$path"
done

echo "$changed guide folder(s) changed$([ $dry -eq 1 ] && echo ' (dry run, nothing written)')"
