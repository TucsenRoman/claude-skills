/* Synced scrubber for ui-mockup: compare options that differ over time (an intro, a transition).
 *
 *   MockScrubber.create({
 *     mount: document.querySelector('#scrub'),
 *     duration: 3,                                  // seconds the timeline covers
 *     frame: { w: 1440, h: 900 },                   // each option's page size; panes scale it to fit
 *     panes: [
 *       { name: 'Already there', src: 'opening-A.html', note: 'The page is there from the start; the address types in while it fills.' },
 *       { name: 'Fast build', src: 'opening-B.html', note: 'The address types on an empty tray, then the page fades in.' },
 *     ],
 *     marks: [{ t: 0.3, label: 'First look' }, { t: 1.2, label: 'Page in' }],          // key moments, shared by every pane
 *     ranges: [{ pane: 1, from: 0, to: 1.1, label: 'Empty tray' }],                     // durations, drawn in that pane's lane
 *   })
 *
 * Each option page exposes one hook: window.__mockSeek(t) pauses its own clock and shows second t.
 * Pages should also read ?t=1.5 on load (seek there and stay paused) so board.sh can capture any moment.
 */
(function () {
  const ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  };
  const COLORS = ['#3b82f6', '#e0803a', '#16a34a', '#a855f7', '#e11d48'];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fmt = t => t.toFixed(2) + 's';

  function create(opt) {
    const marks = opt.marks || [], ranges = opt.ranges || [], dur = opt.duration;
    let t = 0, playing = false, rate = 1, last = null, dark = false;

    const root = document.createElement('div');
    root.className = 'ms';
    root.innerHTML = `
      <div class="ms-panes">${opt.panes.map((p, i) => `
        <figure class="ms-pane" data-i="${i}">
          <figcaption><b style="color:${COLORS[i % COLORS.length]}">${esc(p.name)}</b>${p.note ? `<span>${esc(p.note)}</span>` : ''}</figcaption>
          <div class="ms-view"><iframe src="${esc(p.src)}" width="${opt.frame.w}" height="${opt.frame.h}" loading="eager"></iframe></div>
        </figure>`).join('')}
      </div>
      <div class="ms-bar">
        <button class="ms-btn" data-act="play" aria-label="Play">${ICON.play}</button>
        <span class="ms-time">${fmt(0)}</span>
        <div class="ms-names">${opt.panes.map((p, i) => `<span style="color:${COLORS[i % COLORS.length]}">${esc(p.name)}</span>`).join('')}</div>
        <div class="ms-track">
          <div class="ms-lanes">${opt.panes.map((p, i) => `<div class="ms-lane" data-lane="${i}"></div>`).join('')}</div>
          <div class="ms-rail"></div>
          ${marks.map((m, k) => `<button class="ms-mark" data-mark="${k}" style="left:${(m.t / dur) * 100}%"><i></i><span>${esc(m.label)} · ${fmt(m.t)}</span></button>`).join('')}
          <div class="ms-head"></div>
          <input class="ms-range" type="range" min="0" max="${dur}" step="0.01" value="0" aria-label="Scrub">
        </div>
        <select class="ms-rate" aria-label="Speed"><option value="1">1x</option><option value="0.5">0.5x</option><option value="0.25">0.25x</option></select>
        <button class="ms-btn" data-act="theme" aria-label="Switch theme">${ICON.sun}</button>
      </div>`;
    opt.mount.appendChild(root);

    // Ranges sit in their pane's lane, colored like the pane's name
    for (const r of ranges) {
      const lane = root.querySelector(`[data-lane="${r.pane}"]`); if (!lane) continue;
      const seg = document.createElement('span');
      seg.className = 'ms-seg';
      seg.style.left = (r.from / dur) * 100 + '%';
      seg.style.width = Math.max(0.6, ((r.to - r.from) / dur) * 100) + '%';
      seg.style.background = COLORS[r.pane % COLORS.length];
      seg.title = `${r.label}: ${fmt(r.from)}–${fmt(r.to)} (${(r.to - r.from).toFixed(2)}s)`;
      seg.innerHTML = `<span>${esc(r.label)}</span>`;
      lane.appendChild(seg);
    }

    const frames = [...root.querySelectorAll('iframe')], views = [...root.querySelectorAll('.ms-view')];
    const range = root.querySelector('.ms-range'), head = root.querySelector('.ms-head'), time = root.querySelector('.ms-time');
    const playBtn = root.querySelector('[data-act="play"]'), themeBtn = root.querySelector('[data-act="theme"]');

    // Scale each page to its pane's width
    const fit = () => views.forEach((v, i) => {
      const s = v.clientWidth / opt.frame.w;
      frames[i].style.transform = `scale(${s})`;
      v.style.height = opt.frame.h * s + 'px';
    });
    new ResizeObserver(fit).observe(root.querySelector('.ms-panes'));

    function seek(to) {
      t = Math.max(0, Math.min(dur, to));
      range.value = t; head.style.left = (t / dur) * 100 + '%'; time.textContent = fmt(t);
      root.querySelectorAll('.ms-mark').forEach((el, k) => el.classList.toggle('on', Math.abs(marks[k].t - t) < 0.02));
      frames.forEach(f => { try { f.contentWindow.__mockSeek && f.contentWindow.__mockSeek(t); } catch (e) { /* cross-origin: serve options from the same folder */ } });
    }
    function setPlaying(on) {
      playing = on; last = null;
      playBtn.innerHTML = on ? ICON.pause : ICON.play;
      if (on && t >= dur) seek(0);
      if (on) requestAnimationFrame(tick);
    }
    function tick(now) {
      if (!playing) return;
      if (last != null) seek(t + ((now - last) / 1000) * rate);
      last = now;
      if (t >= dur) return setPlaying(false);
      requestAnimationFrame(tick);
    }

    range.addEventListener('input', () => { setPlaying(false); seek(+range.value); });
    playBtn.addEventListener('click', () => setPlaying(!playing));
    root.querySelector('.ms-rate').addEventListener('change', e => { rate = +e.target.value; });
    root.querySelectorAll('.ms-mark').forEach((el, k) => el.addEventListener('click', () => { setPlaying(false); seek(marks[k].t); }));
    root.addEventListener('keydown', e => {
      if (e.key === ' ') { e.preventDefault(); setPlaying(!playing); }
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        // Arrows step between marks, the moments the comparison is about
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const next = dir > 0 ? marks.find(m => m.t > t + 0.01) : [...marks].reverse().find(m => m.t < t - 0.01);
        if (next) { e.preventDefault(); setPlaying(false); seek(next.t); }
      }
    });
    themeBtn.addEventListener('click', () => {
      dark = !dark;
      root.classList.toggle('ms-dark', dark);
      themeBtn.innerHTML = dark ? ICON.moon : ICON.sun;
      // Options follow the theme through the same hook pattern
      frames.forEach(f => { try { f.contentWindow.__mockTheme && f.contentWindow.__mockTheme(dark ? 'dark' : 'light'); } catch (e) { /* same as above */ } });
    });

    // Start every pane at 0 once its page has loaded
    frames.forEach(f => f.addEventListener('load', () => { fit(); try { f.contentWindow.__mockSeek && f.contentWindow.__mockSeek(t); } catch (e) { /* same as above */ } }));
    fit();
    return { seek, play: () => setPlaying(true), pause: () => setPlaying(false), get time() { return t; } };
  }
  window.MockScrubber = { create };
})();
