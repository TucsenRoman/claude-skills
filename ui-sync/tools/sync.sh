#!/usr/bin/env bash
# Watch the upstream skills the ui- stages learn from. Copies nothing into the skills.
#   sync.sh            report what changed upstream since each repo was last reviewed,
#                      per stage, and write the diffs to a temp folder for reading
#   sync.sh --mark     record each repo's current HEAD as reviewed (run after absorbing)
set -euo pipefail
here="$(cd "$(dirname "$0")/.." && pwd)"
json="$here/sources.json"
mode="${1:-check}"

if [ "$mode" = "--mark" ]; then
  node -e '
    const fs = require("fs"), cp = require("child_process"), f = process.argv[1]
    const j = JSON.parse(fs.readFileSync(f, "utf8"))
    for (const r of Object.values(j.repos)) r.seen = cp.execSync(`git ls-remote ${r.url} HEAD`).toString().split(/\s/)[0]
    fs.writeFileSync(f, JSON.stringify(j, null, 2).replace(/\{\n\s+"repo": ("[^"]+"),\n\s+"path": ("[^"]+"),\n\s+"stage": ("[^"]+")\n\s+\}/g, "{ \"repo\": $1, \"path\": $2, \"stage\": $3 }") + "\n")
    console.log("marked:", Object.entries(j.repos).map(([k, r]) => k + " " + r.seen.slice(0, 8)).join(", "))
  ' "$json"
  exit 0
fi

out="$(mktemp -d)"
node -e '
  const j = require(process.argv[1])
  for (const [k, r] of Object.entries(j.repos)) console.log("REPO", k, r.url, r.seen)
  for (const w of j.watch) console.log("WATCH", w.repo, w.path, w.stage)
  for (const i of j.ignore) console.log("IGNORE", i)
' "$json" > "$out/plan.txt"

while read -r kind name url seen; do
  [ "$kind" = REPO ] || continue
  git clone -q --filter=blob:none "$url" "$out/$name"
  head="$(git -C "$out/$name" rev-parse HEAD)"
  if [ "$head" = "$seen" ]; then echo "same     $name"; continue; fi
  echo "CHANGED  $name ($(git -C "$out/$name" log --oneline "$seen..$head" 2>/dev/null | wc -l) commits since last review)"
  while read -r k repo path stage; do
    [ "$k" = WATCH ] && [ "$repo" = "$name" ] || continue
    if ! git -C "$out/$name" cat-file -e "HEAD:$path" 2>/dev/null; then echo "  MISSING  $path (moved or removed? fix sources.json)"; continue; fi
    if ! git -C "$out/$name" diff --quiet "$seen" HEAD -- "$path" 2>/dev/null; then
      mkdir -p "$out/diffs/$stage"
      git -C "$out/$name" diff "$seen" HEAD -- "$path" > "$out/diffs/$stage/$(echo "$name-$path" | tr '/.' '__').diff"
      echo "  $stage  <-  $path"
    fi
  done < "$out/plan.txt"
  # Upstream skills nobody watches yet
  for d in "$out/$name/skills"/*/ "$out/$name/.agents/skills/impeccable/reference"/*.md; do
    [ -e "$d" ] || continue
    rel="${d#$out/$name/}"; rel="${rel%/}"
    grep -q "\"path\": \"$rel" "$json" && continue
    grep -q "\"$name/$rel\"" "$json" && continue
    echo "  NEW (unwatched)  $rel"
  done
done < "$out/plan.txt"

echo "diffs: $out/diffs"
