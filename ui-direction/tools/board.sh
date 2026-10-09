#!/usr/bin/env bash
# Render UI options into one labeled PNG board (plus one PNG per option and theme).
#
# Usage:
#   board.sh --out <dir> [--width 390] [--themes light,dark] [--screen 844] [--title "..."] Label=path-or-url ...
#
#   --width   layout width per option (390 phone, 1440 desktop). Default 390.
#   --themes  light, dark, or light,dark. Default light.
#   --screen  also write a "first screen" board cropped to this height. Default 844 (phone) / 900 (desktop).
#   Label=... an .html file, or an http(s) URL (e.g. a running dev server route).
#
# Writes <dir>/shots/<Label>-<theme>.png, <dir>/board-full.png, <dir>/board-screen.png.
# Needs Chrome or Edge. Renders with prefers-reduced-motion forced on, so count-ups and entrances show final state. Pages render inside an iframe of the exact width, because
# headless Chrome will not make a window narrower than ~500px.
set -euo pipefail

out=""; width=390; themes="light"; screen=""; title=""; items=()
while [ $# -gt 0 ]; do
  case "$1" in
    --out) out="$2"; shift 2 ;;
    --width) width="$2"; shift 2 ;;
    --themes) themes="$2"; shift 2 ;;
    --screen) screen="$2"; shift 2 ;;
    --title) title="$2"; shift 2 ;;
    *=*) items+=("$1"); shift ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done
[ -n "$out" ] && [ ${#items[@]} -gt 0 ] || { echo "usage: board.sh --out DIR Label=path ..." >&2; exit 2; }
[ -n "$screen" ] || { [ "$width" -le 500 ] && screen=844 || screen=900; }

CHROME=""
for c in "/c/Program Files/Google/Chrome/Application/chrome.exe" "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
         "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" "$(command -v google-chrome || true)" "$(command -v chromium || true)"; do
  [ -n "$c" ] && [ -x "$c" ] && { CHROME="$c"; break; }
done
[ -n "$CHROME" ] || { echo "Chrome/Edge not found" >&2; exit 1; }

winpath() { if command -v cygpath >/dev/null; then cygpath -w "$1"; else echo "$1"; fi; }
fileurl() { if command -v cygpath >/dev/null; then echo "file:///$(cygpath -m "$1")"; else echo "file://$1"; fi; }
chrome() { "$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --force-prefers-reduced-motion "$@" >/dev/null 2>&1 || true; }

mkdir -p "$out/shots"; out="$(cd "$out" && pwd)"
win=$(( width < 500 ? 800 : width + 40 ))
labels=(); maxh=0
for it in "${items[@]}"; do
  label="${it%%=*}"; src="${it#*=}"; labels+=("$label")
  if [[ "$src" =~ ^https?:// ]]; then url="$src"; h=3000
  else
    src="$(cd "$(dirname "$src")" && pwd)/$(basename "$src")"; url="$(fileurl "$src")"
    cat > "$out/.measure.html" <<EOF
<!doctype html><body style="margin:0"><iframe id=f src="$url" style="width:${width}px;height:${screen}px;border:0"></iframe><pre id=o></pre>
<script>f.onload=()=>setTimeout(()=>{const d=f.contentDocument;o.textContent='H='+Math.max(d.documentElement.scrollHeight,d.body.scrollHeight)},2500)</script></body>
EOF
    h=$("$CHROME" --headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=12000 --window-size=$win,$screen \
        --dump-dom "$(fileurl "$out/.measure.html")" 2>/dev/null | grep -o 'H=[0-9]*' | head -1 | cut -d= -f2 || true)
    [ -n "$h" ] || h=3000
  fi
  cat > "$out/.wrap-$label.html" <<EOF
<!doctype html><body style="margin:0;background:#888"><iframe src="$url" style="display:block;width:${width}px;height:${h}px;border:0"></iframe></body>
EOF
  [ "$h" -gt "$maxh" ] && maxh=$h
  for th in ${themes//,/ }; do
    pref=1; [ "$th" = dark ] && pref=0
    chrome --blink-settings=preferredColorScheme=$pref --virtual-time-budget=12000 --window-size=$win,$h \
      --screenshot="$(winpath "$out/shots/$label-$th.png")" "$(fileurl "$out/.wrap-$label.html")"
  done
done

board() { # $1 = cell height (auto or Npx), $2 = output name
  local cells="" n=0
  for label in "${labels[@]}"; do
    local row=""
    for th in ${themes//,/ }; do
      row+="<div style=\"width:${width}px;height:$1;overflow:hidden;border-radius:$([ "$width" -le 500 ] && echo 28 || echo 8)px;box-shadow:0 8px 30px #0004;flex:none\"><img src=\"shots/$label-$th.png\" style=\"width:${win}px;max-width:none;display:block\"></div>"
      n=$((n+1))
    done
    cells+="<div><p style=\"margin:0 0 16px\">$label</p><div style=\"display:flex;gap:16px;align-items:flex-start\">$row</div></div>"
  done
  local head=""; [ -n "$title" ] && head="<h1 style=\"width:100%;margin:0 0 8px;font-size:26px\">$title</h1>"
  printf '%s' "<!doctype html><body style=\"margin:0;padding:40px;background:#cfcac2;font:700 28px system-ui;display:flex;flex-wrap:wrap;gap:56px;align-items:flex-start\">$head$cells</body>" > "$out/.$2.html"
  local bw=$(( 80 + n * (width + 16) + ${#labels[@]} * 56 ))
  local bh; if [ "$1" = auto ]; then bh=$(( maxh + 200 )); else bh=$(( ${1%px} + 260 )); fi
  chrome --virtual-time-budget=3000 --window-size=$bw,$bh --screenshot="$(winpath "$out/$2.png")" "$(fileurl "$out/.$2.html")"
}
board "${screen}px" board-screen
board auto board-full
echo "$out/board-screen.png"
echo "$out/board-full.png"
