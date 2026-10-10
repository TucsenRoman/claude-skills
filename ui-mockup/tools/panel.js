/* Shared control panel for ui-mockup labs.
 *
 *   const panel = MockPanel.create({
 *     mount: document.querySelector('#panel'),
 *     title: 'Token lab',
 *     themes: true,                       // Light/Dark preview switch
 *     groups: [{ name: 'Colors', open: true, controls: [
 *       { key: 'surface', label: 'Surface', info: 'Cards and fields.', type: 'color', light: '#FFFFFF', dark: '#23161B' },
 *       { key: 'body', label: 'Body size', type: 'range', value: 15, min: 12, max: 20, step: 1, unit: 'px' },
 *       { key: 'carry', label: 'Carry speed', type: 'toggle', value: false },
 *     ]}],
 *     palette: [{ name: 'mist-100', hex: '#EDE6E8' }, ...],   // the project's own tokens, as quick picks for colors
 *     frame: { el: phoneEl, presets: [{ name: 'iPhone 15', w: 393, h: 852 }, ...], value: 'iPhone 15' },
 *     inspect: { root: mockEl, map: [['.card', ['surface', 'r-lg']], ...], name: el => 'Day card' },
 *     output: state => 'lines to paste back',
 *     check: state => ['visible problems'],
 *     onChange: state => { ... },          // state = { theme, values, frame }
 *   })
 */
(function () {
  const ICON = {
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    text: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7V5h16v2M9 19h6M12 5v14"/></svg>',
    pick: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/></svg>',
  };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const norm = v => (typeof v === 'string' ? v.toUpperCase() : v);

  function create(opt) {
    const defaults = {}, values = {};
    for (const g of opt.groups) for (const c of g.controls) {
      defaults[c.key] = c.type === 'color' ? { light: c.light, dark: c.dark } : c.value;
      values[c.key] = c.type === 'color' ? { light: c.light, dark: c.dark } : c.value;
    }
    const state = { theme: 'light', values, frame: null, text: [] };
    const isChanged = k => {
      const d = defaults[k], v = values[k];
      return typeof d === 'object' ? norm(d.light) !== norm(v.light) || norm(d.dark) !== norm(v.dark) : norm(d) !== norm(v);
    };
    let changedOnly = false;

    const root = document.createElement('div');
    root.className = 'mp';
    root.innerHTML = `
      <div class="mp-head"><span class="mp-title">${esc(opt.title || 'Controls')}</span>
        ${opt.themes ? `<button class="mp-icon" data-act="theme" aria-label="Switch theme">${ICON.sun}<span class="mp-tip">Light · switch to dark</span></button>` : ''}
        ${opt.text ? `<button class="mp-icon" data-act="text" aria-label="Edit text">${ICON.text}<span class="mp-tip">Edit text in the mock</span></button>` : ''}
        ${opt.inspect ? `<button class="mp-icon" data-act="inspect" aria-label="Select an element">${ICON.pick}<span class="mp-tip">Select an element in the mock</span></button>` : ''}
        <button class="mp-icon" data-act="copy" aria-label="Copy changes">${ICON.copy}<span class="mp-badge"></span><span class="mp-tip">No changes yet</span></button></div>
      <div class="mp-bar">
        <button class="mp-pill" data-act="changed">Changed only</button>
        ${opt.frame ? `<div class="mp-frame"><select data-frame>${opt.frame.presets.map(p => `<option>${esc(p.name)}</option>`).join('')}<option value="custom">Custom</option></select>
          <input data-fw type="number" min="280" max="1600"> × <input data-fh type="number" min="400" max="1400"></div>` : ''}
        <div class="mp-sel"><span></span><button class="mp-pill" data-act="unselect">Clear</button></div>
      </div>
      <div class="mp-warn"></div>
      <div class="mp-body"></div>`;
    opt.mount.appendChild(root);
    const body = root.querySelector('.mp-body');

    // ---- rows ----
    const rowOf = {};
    for (const g of opt.groups) {
      const det = document.createElement('details');
      det.className = 'mp-group'; if (g.open) det.open = true;
      det.innerHTML = `<summary>${esc(g.name)}<span class="mp-count"></span></summary><div class="mp-rows"></div>`;
      body.appendChild(det);
      const rows = det.querySelector('.mp-rows');
      for (const c of g.controls) {
        const row = document.createElement('div');
        row.className = 'mp-row'; row.dataset.key = c.key; row.group = det;
        const info = c.info ? `<button class="mp-i" data-act="info">i</button>` : '';
        const label = `<span class="mp-label">${esc(c.label)} ${info}</span>`;
        if (c.type === 'color') {
          const sw = side => `<span class="mp-sw"><b>${side === 'light' ? 'L' : 'D'}</b><span class="mp-chip" data-chip="${side}"><input type="color" data-color="${side}"></span><input class="mp-hex" data-hex="${side}" spellcheck="false"></span>`;
          row.innerHTML = `<div class="mp-line">${label}${sw('light')}${sw('dark')}<button class="mp-reset" data-act="reset" title="Reset">↺</button></div>
            <div class="mp-info">${esc(c.info || '')}</div>
            ${opt.palette ? `<div class="mp-picks"><span class="mp-picks-for"></span>${opt.palette.map(p => `<button class="mp-pick" data-pick="${esc(p.hex)}" data-name="${esc(p.name)}" style="background:${esc(p.hex)}"></button>`).join('')}</div>` : ''}`;
        } else if (c.type === 'range') {
          row.innerHTML = `<div class="mp-line">${label}<input class="mp-num" data-num type="number" min="${c.min}" max="${c.max}" step="${c.step || 1}"><span class="mp-unit">${esc(c.unit || '')}</span><button class="mp-reset" data-act="reset" title="Reset">↺</button></div>
            <div class="mp-info">${esc(c.info || '')}</div><input type="range" data-range min="${c.min}" max="${c.max}" step="${c.step || 1}">`;
        } else if (c.type === 'toggle') {
          row.innerHTML = `<div class="mp-line">${label}<button class="mp-pill" data-toggle></button><button class="mp-reset" data-act="reset" title="Reset">↺</button></div><div class="mp-info">${esc(c.info || '')}</div>`;
        } else if (c.type === 'select' && (c.options.length > 3 || c.options.join('').length > 24)) {
          row.innerHTML = `<div class="mp-line">${label}<button class="mp-reset" data-act="reset" title="Reset">↺</button></div><div class="mp-info">${esc(c.info || '')}</div><select class="mp-dd" data-dd>${c.options.map(o => `<option>${esc(o)}</option>`).join('')}</select>`
        } else if (c.type === 'select') {
          row.innerHTML = `<div class="mp-line">${label}<span class="mp-seg" data-select>${c.options.map(o => `<button data-v="${esc(o)}">${esc(o)}</button>`).join('')}</span><button class="mp-reset" data-act="reset" title="Reset">↺</button></div><div class="mp-info">${esc(c.info || '')}</div>`;
        }
        row.control = c;
        rows.appendChild(row);
        rowOf[c.key] = row;
      }
    }

    // ---- sync view from state ----
    function syncRow(row) {
      const c = row.control, v = values[c.key], ch = isChanged(c.key);
      row.classList.toggle('is-changed', ch);
      if (c.type === 'color') for (const side of ['light', 'dark']) {
        const hex = v[side], dch = norm(hex) !== norm(defaults[c.key][side]);
        row.querySelector(`[data-chip="${side}"]`).style.background = hex;
        const picker = row.querySelector(`[data-color="${side}"]`); if (/^#[0-9a-f]{6}$/i.test(hex)) picker.value = hex;
        const hx = row.querySelector(`[data-hex="${side}"]`); if (document.activeElement !== hx) hx.value = hex; hx.classList.toggle('changed', dch);
      }
      if (c.type === 'color') { row.querySelectorAll('[data-pick]').forEach(p => p.classList.toggle('on', norm(p.dataset.pick) === norm(v[pickSide])));
      } else if (c.type === 'range') {
        row.querySelector('[data-range]').value = v;
        const n = row.querySelector('[data-num]'); if (document.activeElement !== n) n.value = v; n.classList.toggle('changed', ch);
      } else if (c.type === 'toggle') {
        const b = row.querySelector('[data-toggle]'); b.textContent = v ? 'On' : 'Off'; b.classList.toggle('on', !!v);
      } else if (c.type === 'select') {
        row.querySelectorAll('[data-select] button').forEach(b => b.classList.toggle('on', b.dataset.v === v));
        const dd = row.querySelector('[data-dd]'); if (dd) dd.value = v;
      }
    }
    function sync() {
      Object.values(rowOf).forEach(syncRow);
      const changedKeys = Object.keys(values).filter(isChanged).concat(state.text.filter(t => t.from !== t.to));
      body.querySelectorAll('.mp-group').forEach(det => {
        const rows = [...det.querySelectorAll('.mp-row')];
        const n = rows.filter(r => isChanged(r.dataset.key)).length;
        det.querySelector('.mp-count').textContent = n ? n + ' changed' : '';
        rows.forEach(r => r.classList.toggle('hidden', changedOnly && !isChanged(r.dataset.key)));
        det.style.display = changedOnly && n === 0 ? 'none' : '';
      });
      const badge = root.querySelector('.mp-badge'), tip = root.querySelector('[data-act="copy"] .mp-tip');
      badge.textContent = changedKeys.length; badge.classList.toggle('on', changedKeys.length > 0);
      tip.textContent = changedKeys.length ? `Copy ${changedKeys.length} change${changedKeys.length > 1 ? 's' : ''}` : 'No changes yet';
      root.querySelector('.mp-warn').textContent = opt.check ? opt.check(state).join(' ') : '';
    }
    function changed() { sync(); opt.onChange && opt.onChange(state); }

    // ---- events ----
    body.addEventListener('input', e => {
      const row = e.target.closest('.mp-row'); if (!row) return;
      const k = row.dataset.key, c = row.control;
      if (e.target.dataset.color) { values[k] = { ...values[k], [e.target.dataset.color]: e.target.value.toUpperCase() }; changed(); }
      else if (e.target.dataset.hex) { const v = e.target.value.trim(); if (/^#[0-9a-f]{6}$/i.test(v) || /^rgba?\(/i.test(v)) { values[k] = { ...values[k], [e.target.dataset.hex]: v.toUpperCase() }; changed(); } }
      else if ('dd' in e.target.dataset) { values[k] = e.target.value; changed(); }
      else if ('range' in e.target.dataset || 'num' in e.target.dataset) { const n = +e.target.value; if (!Number.isNaN(n)) { values[k] = Math.max(c.min, Math.min(c.max, n)); changed(); } }
    });
    let pickSide = 'light';
    body.addEventListener('click', e => {
      const row = e.target.closest('.mp-row'); if (!row) return;
      const k = row.dataset.key, c = row.control, act = e.target.closest('[data-act]')?.dataset.act;
      if (act === 'info') { row.querySelector('.mp-info').classList.toggle('on'); return; }
      if (act === 'reset') { values[k] = typeof defaults[k] === 'object' ? { ...defaults[k] } : defaults[k]; changed(); return; }
      if (e.target.closest('[data-toggle]')) { values[k] = !values[k]; changed(); return; }
      const sel = e.target.closest('[data-select] button'); if (sel) { values[k] = sel.dataset.v; changed(); return; }
      const pk = e.target.closest('[data-pick]'); if (pk) { values[k] = { ...values[k], [pickSide]: pk.dataset.pick.toUpperCase() }; changed(); return; }
      const chip = e.target.closest('[data-chip], [data-hex]');
      if (chip && c.type === 'color' && opt.palette) {
        pickSide = chip.dataset.chip || chip.dataset.hex;
        body.querySelectorAll('.mp-row.picking').forEach(r => r !== row && r.classList.remove('picking'));
        row.classList.add('picking');
        row.querySelector('.mp-picks-for').textContent = `Project tokens for ${pickSide}:`;
      }
    });
    root.querySelector('[data-act="changed"]').addEventListener('click', e => { changedOnly = !changedOnly; e.currentTarget.classList.toggle('on', changedOnly); sync(); });
    const copyBtn = root.querySelector('[data-act="copy"]');
    copyBtn.addEventListener('click', async () => {
      const edits = state.text.filter(t => t.from !== t.to).map(t => `"${t.from}" → "${t.to}"`);
      const text = [opt.output ? opt.output(state) : JSON.stringify(values, null, 2), edits.length ? '// text\n' + edits.join('\n') : ''].filter(Boolean).join('\n') || 'No changes yet.';
      const tip = copyBtn.querySelector('.mp-tip');
      try { await navigator.clipboard.writeText(text); tip.textContent = 'Copied'; }
      catch { window.prompt('Copy the changes:', text); }
      copyBtn.classList.add('tip-on'); setTimeout(() => { copyBtn.classList.remove('tip-on'); sync(); }, 1200);
    });
    const themeBtn = root.querySelector('[data-act="theme"]');
    themeBtn && themeBtn.addEventListener('click', () => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      const dark = state.theme === 'dark';
      root.classList.toggle('mp-dark', dark);
      themeBtn.innerHTML = (dark ? ICON.moon : ICON.sun) + `<span class="mp-tip">${dark ? 'Dark · switch to light' : 'Light · switch to dark'}</span>`;
      changed();
    });

    // ---- frame sizing ----
    if (opt.frame) {
      const sel = root.querySelector('[data-frame]'), fw = root.querySelector('[data-fw]'), fh = root.querySelector('[data-fh]');
      const setFrame = (w, h) => { state.frame = { w, h }; opt.frame.el.style.width = w + 'px'; opt.frame.el.style.height = h + 'px'; fw.value = w; fh.value = h; opt.onChange && opt.onChange(state); };
      const start = opt.frame.presets.find(p => p.name === opt.frame.value) || opt.frame.presets[0];
      sel.value = start.name; setFrame(start.w, start.h);
      sel.addEventListener('change', () => { const p = opt.frame.presets.find(x => x.name === sel.value); if (p) setFrame(p.w, p.h); });
      const custom = () => { sel.value = 'custom'; setFrame(+fw.value || 360, +fh.value || 740); };
      fw.addEventListener('change', custom); fh.addEventListener('change', custom);
    }

    // ---- text editing ----
    if (opt.text) {
      const btn = root.querySelector('[data-act="text"]'), troot = opt.text.root;
      let on = false;
      const leaf = el => { for (let n = el; n && n !== troot; n = n.parentElement) if ([...n.childNodes].some(c => c.nodeType === 3 && c.textContent.trim())) return n; return null; };
      btn.addEventListener('click', () => { on = !on; btn.classList.toggle('on', on); troot.classList.toggle('mp-editing', on); });
      troot.addEventListener('click', e => {
        if (!on) return; const el = leaf(e.target); if (!el) return;
        e.preventDefault(); e.stopPropagation();
        if (!el.mpEdit) { el.mpEdit = { from: el.textContent, to: el.textContent }; state.text.push(el.mpEdit); }
        el.contentEditable = 'plaintext-only'; el.focus();
      }, true);
      troot.addEventListener('input', e => {
        const el = e.target; if (!el.mpEdit) return;
        el.mpEdit.to = el.textContent;
        const twin = opt.text.twin && opt.text.twin(el); if (twin) twin.textContent = el.textContent;
        sync();
      });
      troot.addEventListener('focusout', e => { if (e.target.mpEdit) e.target.removeAttribute('contenteditable'); });
    }

    // ---- element select ----
    if (opt.inspect) {
      const btn = root.querySelector('[data-act="inspect"]'), bar = root.querySelector('.mp-sel');
      let on = false, hovered = null, picked = null;
      const match = el => { for (const [selector, keys] of opt.inspect.map) { const hit = el.closest(selector); if (hit && opt.inspect.root.contains(hit)) return { el: hit, keys, selector }; } return null; };
      const stop = () => { on = false; btn.classList.remove('on'); opt.inspect.root.classList.remove('mp-inspecting'); hovered && hovered.classList.remove('mp-hover-outline'); hovered = null; };
      const clear = () => { picked && picked.classList.remove('mp-picked-outline'); picked = null; bar.classList.remove('on'); body.querySelectorAll('.mp-row.hit').forEach(r => r.classList.remove('hit')); };
      btn.addEventListener('click', () => { if (on) return stop(); on = true; btn.classList.add('on'); opt.inspect.root.classList.add('mp-inspecting'); });
      opt.inspect.root.addEventListener('mousemove', e => { if (!on) return; const m = match(e.target); const el = m && m.el; if (el !== hovered) { hovered && hovered.classList.remove('mp-hover-outline'); hovered = el; el && el.classList.add('mp-hover-outline'); } }, true);
      opt.inspect.root.addEventListener('click', e => {
        if (!on) return; e.preventDefault(); e.stopPropagation();
        const m = match(e.target); stop(); if (!m) return;
        clear(); picked = m.el; picked.classList.add('mp-picked-outline');
        bar.querySelector('span').textContent = 'Selected: ' + (opt.inspect.name ? opt.inspect.name(m.el, m.selector) : m.selector);
        bar.classList.add('on');
        let first = null;
        for (const k of m.keys) { const r = rowOf[k]; if (!r) continue; r.classList.add('hit'); r.group.open = true; first = first || r; }
        first && first.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }, true);
      bar.querySelector('[data-act="unselect"]').addEventListener('click', clear);
    }

    sync();
    return {
      state,
      get: k => values[k],
      color: k => values[k][state.theme],
      defaults: k => defaults[k],
      isChanged,
      setDark: dark => root.classList.toggle('mp-dark', dark),
      resetAll: () => { for (const k of Object.keys(values)) values[k] = typeof defaults[k] === 'object' ? { ...defaults[k] } : defaults[k]; changed(); },
    };
  }
  window.MockPanel = { create };
})();
