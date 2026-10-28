/* =========================================================
   星轨 STARWAY · 站点交互
   - 星空场 / 加载页 / WebAudio 音乐 / 滚动进场 / 二维码占位
   - 页面渲染：首页、星轨计划、世界和平（人权宣言）、未成年人模式
   - 实名注册向导
   ========================================================= */

/* ---------------------------------------------------------
   1. 星空
   --------------------------------------------------------- */
function initStarfield(canvas, opts = {}) {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0, h = 0, stars = [], raf = null;

  const count = opts.count || 160;
  const palette = opts.palette || ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#CFC6FF", "#E8C268"];

  function resize() {
    const rect = canvas.getBoundingClientRect();
    w = rect.width || canvas.parentElement.clientWidth || window.innerWidth;
    h = rect.height || canvas.parentElement.clientHeight || window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
  }

  function build() {
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.4,
      base: Math.random() * 0.45 + 0.25,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.0012 + 0.0004,
      color: palette[Math.floor(Math.random() * palette.length)],
      drift: Math.random() * 0.08 + 0.01
    }));
  }

  let t = 0;
  function loop() {
    t += 1;
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      const alpha = s.base + Math.sin(t * s.speed * 60 + s.phase) * 0.35;
      ctx.globalAlpha = Math.max(0.06, Math.min(1, alpha));
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      if (s.r > 1.15) {
        ctx.globalAlpha = Math.max(0.04, alpha * 0.4);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
      s.y += s.drift * 0.12;
      if (s.y > h + 4) { s.y = -4; s.x = Math.random() * w; }
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(loop);
  }

  resize();
  loop();
  window.addEventListener("resize", () => {
    cancelAnimationFrame(raf);
    resize();
    loop();
  });
}

/* ---------------------------------------------------------
   2. 音乐引擎：WebAudio 合成环境氛围（无需外部音频文件）
   --------------------------------------------------------- */
const Music = (() => {
  let ctx = null, master = null, padGain = null, panner = null;
  let playing = false, started = false;
  let loopTimer = null, step = 0;
  let channel = "stereo";
  const listeners = [];

  const progressions = [
    [220.00, 277.18, 329.63, 440.00],
    [185.00, 277.18, 369.99, 440.00],
    [164.81, 246.94, 329.63, 415.30],
    [146.83, 220.00, 293.66, 369.99]
  ];
  const bells = [880, 987.77, 1108.73, 1318.51];

  function ensureCtx() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 3;
    if (typeof ctx.createStereoPanner === "function") {
      panner = ctx.createStereoPanner();
      master.connect(comp).connect(panner).connect(ctx.destination);
    } else {
      master.connect(comp).connect(ctx.destination);
    }
    padGain = ctx.createGain();
    padGain.gain.value = 0.16;
    padGain.connect(master);
    applyChannel();
    return ctx;
  }

  function padNote(freq, time, dur) {
    const g = ctx.createGain();
    const f = ctx.createBiquadFilter();
    f.type = "lowpass";
    f.frequency.value = 1100;
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(0.28, time + dur * 0.35);
    g.gain.linearRampToValueAtTime(0.0, time + dur);
    const o1 = ctx.createOscillator();
    o1.type = "sine";
    o1.frequency.value = freq;
    const o2 = ctx.createOscillator();
    o2.type = "triangle";
    o2.frequency.value = freq * 1.004;
    o1.connect(g); o2.connect(g);
    g.connect(f).connect(padGain);
    o1.start(time); o2.start(time);
    o1.stop(time + dur + 0.1); o2.stop(time + dur + 0.1);
  }

  function bellNote(freq, time) {
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, time);
    g.gain.linearRampToValueAtTime(0.06, time + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0008, time + 2.6);
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = freq;
    const o2 = ctx.createOscillator();
    o2.type = "sine";
    o2.frequency.value = freq * 2.01;
    const g2 = ctx.createGain();
    g2.gain.value = 0.25;
    o.connect(g); o2.connect(g2).connect(g);
    g.connect(master);
    o.start(time); o2.start(time);
    o.stop(time + 2.7); o2.stop(time + 2.7);
  }

  function schedule() {
    if (!playing) return;
    const now = ctx.currentTime + 0.05;
    const chord = progressions[step % progressions.length];
    chord.forEach((freq, i) => padNote(freq * (i === 3 ? 2 : 1), now + i * 0.12, 4.6));
    if (step % 2 === 0) {
      bellNote(bells[(step / 2) % bells.length], now + 1.4);
      bellNote(bells[((step / 2) + 2) % bells.length] / 2, now + 3.1);
    }
    step++;
  }

  function start() {
    if (!ensureCtx()) return false;
    if (playing) return true;

    const go = () => {
      if (ctx.state !== "running") return false;
      if (playing) return true;
      playing = true;
      started = true;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 2.4);
      schedule();
      loopTimer = setInterval(schedule, 4200);
      emit();
      return true;
    };

    if (ctx.state === "running") return go();

    // 被自动播放策略挂起：尝试恢复，失败则等用户首次交互
    try {
      const p = ctx.resume();
      if (p && typeof p.then === "function") {
        p.then(go, () => {});
      }
    } catch (e) {}
    return true;
  }

  function stop() {
    if (!ctx || !playing) return;
    playing = false;
    clearInterval(loopTimer);
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.7);
    emit();
  }

  function toggle() { playing ? stop() : start(); }
  function emit() { listeners.forEach(fn => fn(playing)); }
  function isPlaying() { return playing; }
  function hasStarted() { return started; }

  /* 单侧听力辅助：stereo | left | right | mono */
  function applyChannel() {
    if (!panner || !ctx) return;
    try {
      panner.disconnect();
    } catch (e) {}
    panner.connect(ctx.destination);
    panner.pan.cancelScheduledValues(ctx.currentTime);
    if (channel === "left") {
      panner.channelCount = 2; panner.channelCountMode = "max";
      panner.pan.setValueAtTime(-1, ctx.currentTime);
    } else if (channel === "right") {
      panner.channelCount = 2; panner.channelCountMode = "max";
      panner.pan.setValueAtTime(1, ctx.currentTime);
    } else if (channel === "mono") {
      panner.channelCount = 1; panner.channelCountMode = "explicit";
      panner.pan.setValueAtTime(0, ctx.currentTime);
    } else {
      panner.channelCount = 2; panner.channelCountMode = "max";
      panner.pan.setValueAtTime(0, ctx.currentTime);
    }
  }

  function setChannel(mode) {
    channel = mode || "stereo";
    if (ctx && panner) applyChannel();
  }

  return {
    start, stop, toggle, isPlaying, hasStarted,
    onChange: fn => listeners.push(fn),
    setChannel,
    getChannel: () => channel
  };
})();

/* 音乐开关：所有 [data-music-toggle] 元素都可点 */
function initMusic() {
  const targets = Array.from(document.querySelectorAll("[data-music-toggle]"));
  const sync = (on) => {
    targets.forEach((t) => {
      t.classList.toggle("paused", !on);
      t.setAttribute("aria-pressed", on ? "true" : "false");
    });
  };
  Music.onChange(sync);

  targets.forEach((t) => {
    t.addEventListener("click", (e) => {
      e.stopPropagation();
      Music.toggle();
    });
  });

  if (document.body.hasAttribute("data-music-autoplay")) {
    const kick = () => {
      if (!Music.isPlaying()) Music.start();
      if (Music.isPlaying()) {
        window.removeEventListener("pointerdown", kick);
        window.removeEventListener("keydown", kick);
        window.removeEventListener("touchstart", kick);
      }
    };
    window.addEventListener("pointerdown", kick, { passive: true });
    window.addEventListener("keydown", kick);
    window.addEventListener("touchstart", kick, { passive: true });
    // 已授权过音频的浏览器可直接起播
    if (!sessionStorage.getItem("starway-muted")) {
      try { Music.start(); } catch (e) {}
    }
  }
  sync(Music.isPlaying());
}

/* ---------------------------------------------------------
   3. 加载页
   --------------------------------------------------------- */
function initLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;

  const fill = document.getElementById("loaderFill");
  const text = document.getElementById("loaderText");
  const tipEl = document.getElementById("loaderTip");
  const skip = document.getElementById("loaderSkip");

  const tips = {
    zh: [
      "按住 Shift 键，可以让星空中的小星星眨眼哦。加载完成后，去「未成年人模式」的星星乐园吧！",
      "《星痕》里的每一张星图，都来自我们手绘的 400 多张草图。",
      "页面加载时会自动播放主题曲《星尘》，在公共场合可以点按钮静音。",
      "「星轨计划」的项目不只在云南和甘肃，也在肯尼亚、叙利亚和尼泊尔。",
      "右上角可以切换中英文，整站都会跟着变。",
      "《萤火小镇》的 14 首环境音乐，每一首对应小镇的一盏灯。"
    ],
    en: [
      "Hold Shift to make the stars blink. When loading finishes, visit Star Park in Minor Mode.",
      "Every star map in Starscar began as one of 400+ hand-drawn sketches.",
      "The theme “Stardust” plays on load — you can mute it any time.",
      "The Starway Project works not only in Yunnan and Gansu, but in Kenya, Syria and Nepal.",
      "Switch between Chinese and English at the top right; the whole site follows.",
      "Firefly has 14 ambient tracks — one for each lamp in town."
    ]
  };
  let tipIndex = 0;
  const paintTip = () => {
    if (!tipEl) return;
    const list = tips[LANG.current] || tips.zh;
    tipEl.textContent = list[tipIndex % list.length];
  };
  paintTip();
  setInterval(() => {
    if (!tipEl) return;
    tipIndex++;
    tipEl.classList.add("fade");
    setTimeout(() => {
      paintTip();
      tipEl.classList.remove("fade");
    }, 420);
  }, 5200);
  document.addEventListener("langchange", paintTip);

  let pct = 0;
  const tick = setInterval(() => {
    pct = Math.min(100, pct + Math.random() * 13 + 5);
    if (fill) fill.style.width = pct + "%";
    if (text) {
      text.textContent = pct < 100
        ? (LANG.isZh() ? `正在加载宇宙… ${Math.floor(pct)}%` : `Loading the universe… ${Math.floor(pct)}%`)
        : (LANG.isZh() ? "准备就绪，正在启程…" : "Ready. Setting off…");
    }
    if (pct >= 100) {
      clearInterval(tick);
      setTimeout(dismiss, 620);
    }
  }, 240);

  let dismissed = false;
  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    loader.classList.add("hide");
    sessionStorage.setItem("starway-entered", "1");
    document.body.style.overflow = "";
    setTimeout(() => { loader.style.display = "none"; }, 950);
  }

  document.body.style.overflow = "hidden";
  if (skip) skip.addEventListener("click", dismiss);
}

/* ---------------------------------------------------------
   4. 滚动进场
   --------------------------------------------------------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  if (!("IntersectionObserver" in window)) {
    items.forEach(el => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
  items.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 70 + "ms";
    io.observe(el);
  });
}

/* ---------------------------------------------------------
   5. 二维码占位图（伪码，仅作视觉占位）
   --------------------------------------------------------- */
function drawQR(canvas, seed = 1) {
  if (!canvas) return;
  const size = 250;
  const modules = 29;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const cell = size / modules;

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "#16110A";

  let s = seed * 9301 + 49297;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  const inFinder = (x, y) =>
    (x < 8 && y < 8) || (x > modules - 9 && y < 8) || (x < 8 && y > modules - 9);

  for (let y = 0; y < modules; y++) {
    for (let x = 0; x < modules; x++) {
      if (inFinder(x, y)) continue;
      if (rnd() > 0.52) ctx.fillRect(x * cell, y * cell, cell, cell);
    }
  }

  const finder = (ox, oy) => {
    ctx.fillStyle = "#16110A";
    ctx.fillRect(ox * cell, oy * cell, 7 * cell, 7 * cell);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect((ox + 1) * cell, (oy + 1) * cell, 5 * cell, 5 * cell);
    ctx.fillStyle = "#16110A";
    ctx.fillRect((ox + 2) * cell, (oy + 2) * cell, 3 * cell, 3 * cell);
  };
  finder(0, 0);
  finder(modules - 7, 0);
  finder(0, modules - 7);
}

/* ---------------------------------------------------------
   6. 图标
   --------------------------------------------------------- */
const ICONS = {
  puzzle: '<svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 8h10a5 5 0 118 0h10v10a5 5 0 110 8v10H26a5 5 0 11-8 0H8V26a5 5 0 110-8V8z" fill="#FFB84D"/></svg>',
  note: '<svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 31V10l14-3v20" stroke="#FF8FB1" stroke-width="3" stroke-linecap="round"/><circle cx="13" cy="31" r="5" fill="#FF8FB1"/><circle cx="27" cy="27" r="5" fill="#FF8FB1"/></svg>',
  paint: '<svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="5" fill="#4DC3FF"/><circle cx="28" cy="14" r="5" fill="#FFB84D"/><circle cx="14" cy="28" r="5" fill="#FF8FB1"/><circle cx="28" cy="28" r="5" fill="#7FE08C"/></svg>',
  moon: '<svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 8a14 14 0 10 8 22A16 16 0 0128 8z" fill="#7FE08C"/><path d="M33 10 L34 13 L37 14 L34 15 L33 18 L32 15 L29 14 L32 13 Z" fill="#7FE08C"/></svg>',
  id: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="5" width="19" height="14" rx="2.5" stroke="#FFD966" stroke-width="1.6"/><circle cx="8.5" cy="11" r="2.2" stroke="#FFD966" stroke-width="1.4"/><path d="M13.5 10h5M13.5 14h4M5 15.5c.8-1.4 2-2 3.5-2s2.7.6 3.5 2" stroke="#FFD966" stroke-width="1.4" stroke-linecap="round"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8.5" stroke="#FFB84D" stroke-width="1.7"/><path d="M12 7v5.4l3.4 2.3" stroke="#FFB84D" stroke-width="1.7" stroke-linecap="round"/></svg>',
  coin: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="8.5" stroke="#7FE08C" stroke-width="1.7"/><path d="M9 12h6M12 8.6v6.8" stroke="#7FE08C" stroke-width="1.7" stroke-linecap="round"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3l7 3v6c0 4.3-2.9 7.6-7 9-4.1-1.4-7-4.7-7-9V6l7-3z" stroke="#4DC3FF" stroke-width="1.6" stroke-linejoin="round"/><path d="M9 12l2.2 2.2L15.5 10" stroke="#4DC3FF" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

/* ---------------------------------------------------------
   7. 页面渲染
   --------------------------------------------------------- */
const D = () => window.STARWAY_DATA;
const P = (v) => window.LANG.pick(v);

function renderIndex() {
  const grid = document.getElementById("gamesGrid");
  if (grid) {
    grid.innerHTML = D().games.map((g) => `
      <article class="game-card reveal in">
        <div class="game-cover"><img src="${g.img}" alt="${P(g.title)}"></div>
        <div class="game-body">
          <h3 class="game-title">${P(g.title)} <small>${g.sub}</small></h3>
          <div class="tags">${g.tags.map(t => `<span class="tag">${P(t)}</span>`).join("")}</div>
          <p class="game-desc">${P(g.desc)}</p>
          <div class="game-foot">
            <span class="pill ${g.on ? "on" : "dev"}">${P(g.pill)}</span>
            <span class="plat">${P(g.plat)}</span>
          </div>
        </div>
      </article>`).join("");
  }

  const list = document.getElementById("logList");
  if (list) {
    list.innerHTML = D().logs.map((l) => {
      const href = l.kind === "peace" ? "starway.html#ledger" : "index.html#games";
      return `
      <a class="log-row reveal in" href="${href}">
        <div class="log-date">${l.date}</div>
        <div class="log-main">
          <h3>${P(l.title)}</h3>
          <p>${P(l.desc)}</p>
        </div>
        <span class="log-tag ${l.kind}">${P(l.tag)}</span>
      </a>`;
    }).join("");
  }
}

function renderStarway() {
  const cn = document.getElementById("projCn");
  const intl = document.getElementById("projIntl");
  const card = (p) => `
    <article class="proj-card">
      <div class="reg">${P(p.region)}</div>
      <h3>${P(p.title)}</h3>
      <p>${P(p.desc)}</p>
      <div class="meter"><i style="width:${p.pct}%"></i></div>
      <div class="meta"><span>${P(p.meta)}</span><span>${p.pct}%</span></div>
    </article>`;
  if (cn) cn.innerHTML = D().projectsCn.map(card).join("");
  if (intl) intl.innerHTML = D().projectsIntl.map(card).join("");

  const grid = document.getElementById("donateGrid");
  if (grid) {
    grid.innerHTML = D().channels.map((c, i) => `
      <article class="donate-card">
        <figure class="recipient-photo">
          <img src="${c.photo}" alt="${P(c.alt)}" loading="lazy">
        </figure>
        <h3>${P(c.title)}</h3>
        <div class="sub">${P(c.sub)}</div>
        <p class="dc-desc">${P(c.desc)}</p>
        <div class="dc-count">${P(c.count)}</div>
        <a class="btn btn-gold" href="donate.html?ch=${i}">${LANG.isZh() ? "前往捐赠" : "Donate"}</a>
      </article>`).join("");
  }

  const ledger = document.getElementById("ledgerList");
  if (ledger) {
    ledger.innerHTML = D().ledger.map((r) => `
      <div class="trans-row">
        <span class="m">${r.m}</span>
        <span class="t">${P(r.t)}</span>
        <span class="a">${r.a}</span>
      </div>`).join("");
  }

  renderAmber();
}

/* ---------- 安珀警报 · 寻亲启事 ---------- */
function renderAmber() {
  const A = D().amber;
  if (!A) return;
  const banner = document.getElementById("amberBanner");
  const grid = document.getElementById("amberGrid");
  const active = A.cases.find((c) => c.level === "amber");

  if (banner && active) {
    banner.innerHTML = `
      <span class="ab-pulse" aria-hidden="true"></span>
      <div class="ab-tag">${P(A.banner.tag)}</div>
      <div class="ab-main">
        <b>${P(A.banner.title)}</b>
        <span>${P(active.name)} · ${P(active.age)} · ${P(active.place)}</span>
      </div>
      <a class="ab-call" href="tel:110">${P(A.banner.cta)}</a>`;
  }

  if (grid) {
    grid.innerHTML = A.cases.map((c, i) => `
      <article class="amber-card ${c.level}">
        <figure class="ac-photo"><img src="${c.photo}" alt="${P(c.name)}" loading="lazy"></figure>
        <div class="ac-body">
          <span class="ac-status">${P(A.status[c.level])}</span>
          <h3>${P(c.name)}</h3>
          <p class="ac-brief">${P(c.brief)}</p>
          <div class="ac-meta">
            <span>${P(A.lab.age)}：${P(c.age)}</span>
            <span>${P(A.lab.lost)}：${P(c.lost)}</span>
          </div>
        </div>
        <div class="ac-actions">
          <button class="ac-btn ghost" type="button" data-am-open="${i}">${P(A.lab.detail)}</button>
          <a class="ac-btn hot" href="tel:110">${P(A.lab.call)} 110</a>
        </div>
      </article>`).join("");
    grid.querySelectorAll("[data-am-open]").forEach((b) =>
      b.addEventListener("click", () => openAmber(+b.dataset.amOpen)));
  }
}

function openAmber(i) {
  const A = D().amber;
  const c = A.cases[i];
  if (!c) return;
  const modal = document.getElementById("amberModal");
  const body = document.getElementById("amBody");
  if (!modal || !body) return;

  const row = (k, v) => v && v.zh && v.zh !== "—"
    ? `<div class="am-row"><b>${P(k)}</b><span>${P(v)}</span></div>` : "";

  body.innerHTML = `
    <div class="am-head ${c.level}">
      <figure class="am-photo"><img src="${c.photo}" alt="${P(c.name)}"></figure>
      <div>
        <span class="ac-status">${P(A.status[c.level])}</span>
        <h3>${P(c.name)}</h3>
        <p class="am-brief">${P(c.brief)}</p>
      </div>
    </div>
    <div class="am-facts">
      ${row(A.lab.age, c.age)}
      ${row(A.lab.lost, c.lost)}
      ${row(A.lab.place, c.place)}
      ${row(A.lab.look, c.look)}
      ${row(A.lab.wear, c.wear)}
    </div>
    <div class="am-tip">
      <b>${P(A.lab.tipTitle)}</b>
      <p>${P(A.lab.tipNote)}</p>
      <textarea id="amTipText" rows="3" placeholder="${P(A.lab.tipPh)}"></textarea>
      <div class="am-tip-actions">
        <a class="ac-btn hot" href="tel:110">${P(A.lab.call)} 110</a>
        <button class="ac-btn gold" type="button" id="amTipSend">${P(A.lab.tipSend)}</button>
      </div>
    </div>
    <p class="am-note">${P(A.lab.alias)}</p>`;

  modal.hidden = false;
  document.body.style.overflow = "hidden";

  body.querySelector("#amTipSend").addEventListener("click", () => {
    toast(P(A.lab.tipDone), "#7DD9A6", "#0B2B1B");
    body.querySelector("#amTipText").value = "";
  });
}

function initAmberModal() {
  const modal = document.getElementById("amberModal");
  if (!modal || modal.dataset.bound) return;
  modal.dataset.bound = "1";
  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-am-close]")) {
      modal.hidden = true;
      document.body.style.overflow = "";
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) {
      modal.hidden = true;
      document.body.style.overflow = "";
    }
  });
}

function renderPeace() {
  const idx = document.getElementById("udhrIndex");
  if (idx) {
    idx.innerHTML = D().udhr.articles
      .map(a => `<a href="#art-${a.n}">${a.n}</a>`)
      .join("");
  }
  const pre = document.getElementById("preambleBody");
  if (pre) {
    const list = D().udhr.preamble[LANG.current] || D().udhr.preamble.zh;
    pre.innerHTML = list.map(t => `<p>${t}</p>`).join("");
  }
  const listEl = document.getElementById("articleList");
  if (listEl) {
    const zh = LANG.isZh();
    listEl.innerHTML = D().udhr.articles.map((a) => {
      const paras = a[LANG.current] || a.zh;
      return `
        <article class="pw-article" id="art-${a.n}">
          <div class="num">
            ${zh ? "第 " + toCn(a.n) + " 条" : "Art. " + a.n}
            <b>${zh ? "Article " + a.n : "第 " + a.n + " 条"}</b>
          </div>
          <div class="text">${paras.map(t => `<p>${t}</p>`).join("")}</div>
        </article>`;
    }).join("");
  }
  renderCharter();
}

/* ---------- 《联合国宪章》 ---------- */
const ROMAN_CN = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十",
  "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九"];

function renderCharter() {
  const C = window.UN_CHARTER;
  if (!C) return;
  const lang = LANG.current;
  const zh = lang === "zh";
  const word = (k) => P(D().pw[k]);

  const artLabel = (n) => {
    if (zh) return word("charterArtWord").replace("%s", C.cnNum[n] || n);
    return word("charterArtWord").replace("%s", n);
  };
  const chapLabel = (r) => {
    const i = C.chapters.findIndex((c) => c.r === r) + 1;
    if (zh) return word("charterChapter").replace("%s", ROMAN_CN[i] || i);
    return word("charterChapter").replace("%s", r);
  };

  const pre = document.getElementById("charterPreamble");
  if (pre) pre.innerHTML = (C.preamble[lang] || C.preamble.en).map((t) => `<p>${t}</p>`).join("");

  const idx = document.getElementById("charterIndex");
  if (idx) {
    const items = [{ h: "#charter-preamble", l: word("charterPreTitle") }]
      .concat(C.articles.map((a) => ({ h: "#" + a.anchor, l: artLabel(a.n) })))
      .concat([{ h: "#charter-structure", l: word("charterStructTitle") }]);
    idx.innerHTML = items.map((o) => `<a href="${o.h}">${o.l}</a>`).join("");
  }

  const listEl = document.getElementById("charterArticles");
  if (listEl) {
    listEl.innerHTML = C.articles.map((a) => {
      const paras = a[lang] || a.en;
      return `
        <article class="pw-article" id="${a.anchor}">
          <div class="num">
            ${artLabel(a.n)}
            <b>${zh ? "Article " + a.n : "第 " + a.n + " 条"}</b>
          </div>
          <div class="text">${paras.map((t) => `<p>${t}</p>`).join("")}</div>
        </article>`;
    }).join("");
  }

  const chap = document.getElementById("charterChapters");
  if (chap) {
    chap.innerHTML = C.chapters.map((c) => `
      <div class="chap${c.key ? " key" : ""}">
        <div class="r">${chapLabel(c.r)}</div>
        <div class="n">${zh ? c.zh : c.en}</div>
        <div class="a">${zh ? "第 " + c.arts + " 条" : "Arts. " + c.arts}</div>
      </div>`).join("");
  }
}

function toCn(n) {
  const d = ["零","一","二","三","四","五","六","七","八","九"];
  if (n <= 10) return n === 10 ? "十" : d[n];
  if (n < 20) return "十" + d[n - 10];
  if (n % 10 === 0) return d[Math.floor(n / 10)] + "十";
  return d[Math.floor(n / 10)] + "十" + d[n % 10];
}

let minorLeft = 42 * 60;

function renderMinorTime() {
  const el = document.getElementById("kidTime");
  if (!el) return;
  const m = String(Math.floor(minorLeft / 60)).padStart(2, "0");
  const s = String(minorLeft % 60).padStart(2, "0");
  el.textContent = LANG.isZh() ? `今天还剩 ${m}:${s}` : `${m}:${s} left today`;
}

function renderMinors() {
  const grid = document.getElementById("kidGames");
  if (grid) {
    grid.innerHTML = D().minorGames.map((g) => `
      <button class="kid-card ${g.cls}" type="button" data-game="${P(g.name)}">
        <div class="kid-icon">${ICONS[g.icon] || ""}</div>
        <h3>${P(g.name)}</h3>
        <span class="kid-age">${P(g.age)}</span>
      </button>`).join("");
    grid.querySelectorAll(".kid-card").forEach(bindKidCard);
  }

  const prot = document.getElementById("protectGrid");
  if (prot) {
    prot.innerHTML = D().protections.map((p) => `
      <div class="protect-card">
        <div class="ic">${ICONS[p.icon] || ""}</div>
        <div>
          <h4>${P(p.title)}</h4>
          <p>${P(p.desc)}</p>
        </div>
      </div>`).join("");
  }
  renderMinorTime();
}

function renderDonate() {
  /* 捐赠列表页（donate.html?ch=0 受助者直捐 / ch=1 公益机构直捐） */
  const dWrap = document.getElementById("donateDetail");
  if (!dWrap) return;

  const idx = Math.max(0, Math.min(D().channels.length - 1, parseInt(new URLSearchParams(location.search).get("ch"), 10) || 0));
  const mod = D().channels[idx];
  const list = idx === 0 ? D().recipients : D().ngos;
  document.title = (LANG.isZh() ? "前往捐赠 · " : "Donate · ") + P(mod.title) + " · 星轨";

  const unit = (c, i) => `
    <article class="dd-unit" id="unit-${i}">
      <div class="dd-head">
        ${c.photo ? `<figure class="dd-photo"><span class="dd-num">${String(i + 1).padStart(2, "0")}</span><img src="${c.photo}" alt="${P(c.alt || c.title)}" loading="lazy"></figure>` : ""}
        <div class="dd-info">
          <h2>${P(c.title)}</h2>
          <div class="dd-meta">
            ${c.person ? `<span><b>${LANG.isZh() ? "受助人" : "Who"}</b>${P(c.person)}</span>` : ""}
            <span><b>${LANG.isZh() ? "所在地" : "Where"}</b>${P(c.region)}</span>
          </div>
          <div class="dd-story">${c.story.map((s) => `<p>${P(s)}</p>`).join("")}</div>
          <div class="dd-meter">
            <div class="meter"><i style="width:${c.pct}%"></i></div>
            <div class="meta"><span>${LANG.isZh() ? "已筹集" : "Raised"} ${c.raised} / ${c.goal}</span><span>${c.pct}%</span></div>
          </div>
        </div>
      </div>
      <div class="dd-body">
        <div class="dd-main">
          <div class="dd-plan">
            <h3>${LANG.isZh() ? "项目计划" : "Project plan"}</h3>
            <ol>${c.plan.map((s) => `<li>${P(s)}</li>`).join("")}</ol>
          </div>
          <div class="dd-updates">
            <h3>${LANG.isZh() ? "项目进展" : "Updates"}</h3>
            ${c.updates.map((u) => `
              <div class="dd-update">
                <span class="d">${u.d}</span>
                <span class="t">${P(u.t)}</span>
              </div>`).join("")}
          </div>
        </div>
        <aside class="dd-pay">
          <h3>${LANG.isZh() ? "扫码捐赠" : "Scan to donate"}</h3>
          <div class="qr-box big"><canvas data-qr="${c.seed}"></canvas></div>
          <div class="qr-note">${P(c.note)}</div>
        </aside>
      </div>
    </article>`;

  dWrap.innerHTML = `
    <div class="dd-module-head">
      <div class="dd-eyebrow">${LANG.isZh() ? "前往捐赠" : "Donate now"}</div>
      <h1>${P(mod.title)}</h1>
      <p class="dd-mod-desc">${P(mod.desc)}</p>
      <div class="dc-count">${P(mod.count)}</div>
      <nav class="dd-nav">
        ${list.map((c, i) => `<a href="#unit-${i}">${String(i + 1).padStart(2, "0")} · ${P(c.title)}</a>`).join("")}
        <a class="dd-back" href="starway.html#donate">← ${LANG.isZh() ? "返回星轨计划" : "Back"}</a>
      </nav>
    </div>
    ${list.map(unit).join("")}
    <ul class="dd-assure">
      <li>${LANG.isZh() ? "款项直接进入受助人 / 机构官方账户，平台不经手资金" : "Funds go directly to the recipient / NGO account; the platform never touches money"}</li>
      <li>${LANG.isZh() ? "执行票据按月公示于星轨计划页" : "Receipts published monthly on the Starway Project page"}</li>
      <li>${LANG.isZh() ? "演示环境：所有收款码均为占位，扫码不会产生真实扣款 · 详见<a href='legal.html#donation'>捐赠与资金说明</a>" : "Demo: all QR codes are placeholders, no real payment occurs · see <a href='legal.html#donation'>Donations &amp; Funds</a>"}</li>
    </ul>`;
  dWrap.querySelectorAll("canvas[data-qr]").forEach((cv) => drawQR(cv, parseInt(cv.dataset.qr, 10)));
}

function renderPage() {
  const page = document.body.dataset.page;
  if (page === "home") renderIndex();
  else if (page === "starway") renderStarway();
  else if (page === "donate") renderDonate();
  else if (page === "peace") renderPeace();
  else if (page === "minors") renderMinors();
}

/* ---------------------------------------------------------
   8. 未成年人模式
   --------------------------------------------------------- */
function bindKidCard(card) {
  if (card.dataset.bound) return;
  card.dataset.bound = "1";
  card.addEventListener("click", () => {
    const name = card.dataset.game || "";
    const msg = LANG.isZh()
      ? `「${name}」即将开玩 —— 演示页面，可在这里接入真实小游戏～`
      : `“${name}” is about to start — this is a demo, plug your real mini-game in here.`;
    toast(msg, "#241B4A", "#FFFFFF");
  });
}

function toast(text, bg = "#FFFFFF", color = "#241B4A") {
  const el = document.createElement("div");
  el.textContent = text;
  Object.assign(el.style, {
    position: "fixed",
    left: "50%",
    bottom: "40px",
    transform: "translateX(-50%) translateY(20px)",
    padding: "14px 26px",
    borderRadius: "999px",
    background: bg,
    color: color,
    fontSize: "14px",
    fontWeight: "600",
    zIndex: "300",
    opacity: "0",
    transition: "all .35s cubic-bezier(.22,.61,.36,1)",
    boxShadow: "0 18px 40px rgba(0,0,0,.3)",
    maxWidth: "calc(100% - 40px)",
    textAlign: "center"
  });
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    el.style.opacity = "1";
    el.style.transform = "translateX(-50%) translateY(0)";
  });
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateX(-50%) translateY(16px)";
    setTimeout(() => el.remove(), 400);
  }, 2600);
}

function initMinors() {
  const modal = document.getElementById("gateModal");
  if (!modal) return;

  const qEl = document.getElementById("gateQ");
  const input = document.getElementById("gateInput");
  const err = document.getElementById("gateErr");
  const okBtn = document.getElementById("gateOk");
  const cancelBtn = document.getElementById("gateCancel");
  let answer = 0;

  const newQuestion = () => {
    const a = Math.floor(Math.random() * 6) + 3;
    const b = Math.floor(Math.random() * 6) + 2;
    answer = a * b;
    qEl.textContent = `${a} × ${b} = ?`;
    input.value = "";
    err.textContent = "";
  };

  const open = () => {
    newQuestion();
    modal.classList.add("open");
    setTimeout(() => input.focus(), 260);
  };
  document.querySelectorAll("#gateBtn, #gateBtn2, #exitMinor").forEach((b) => {
    b.addEventListener("click", open);
  });
  cancelBtn.addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("open"); });

  const submit = () => {
    if (parseInt(input.value.trim(), 10) === answer) {
      err.style.color = "#7DD9A6";
      err.textContent = LANG.isZh() ? "验证通过 · 已进入家长管理面板（示例）" : "Verified · parent panel opened (demo)";
      setTimeout(() => {
        modal.classList.remove("open");
        err.style.color = "";
        err.textContent = "";
      }, 900);
    } else {
      newQuestion();
      err.style.color = "";
      err.textContent = LANG.isZh() ? "答案不正确，请再试一次" : "Wrong answer, please try again";
      input.focus();
    }
  };
  okBtn.addEventListener("click", submit);
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });

  renderMinorTime();
  setInterval(() => {
    if (minorLeft > 0) minorLeft--;
    renderMinorTime();
  }, 1000);
}

/* ---------------------------------------------------------
   9. 实名注册向导
   --------------------------------------------------------- */
function initRegister() {
  const pane1 = document.getElementById("pane1");
  if (!pane1) return;

  const $ = (id) => document.getElementById(id);
  const panes = {
    1: pane1,
    2: $("pane2"),
    g: $("paneGuardian"),
    done: $("paneDone")
  };
  const stepEls = Array.from(document.querySelectorAll(".steps .s"));
  const setPane = (key, stepIdx) => {
    Object.entries(panes).forEach(([k, el]) => el && el.classList.toggle("on", k === key));
    stepEls.forEach((el, i) => {
      el.classList.toggle("on", i === stepIdx);
      el.classList.toggle("done", i < stepIdx);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const err = (el, msg) => { if (el) el.textContent = msg || ""; };

  // 短信验证码（演示）
  const bindSms = (btnId, phoneId, errId) => {
    const btn = $(btnId);
    const inp = $(phoneId);
    if (!btn) return;
    btn.addEventListener("click", () => {
      const digits = inp ? inp.value.replace(/\D/g, "") : "";
      if (digits.length !== 11) {
        err($(errId), LANG.isZh() ? "请先填写 11 位手机号" : "Enter an 11-digit number first");
        if (inp) inp.focus();
        return;
      }
      err($(errId), "");
      let left = 60;
      btn.disabled = true;
      const paint = () => {
        btn.textContent = LANG.isZh() ? `${left}s 后重发` : `Resend in ${left}s`;
      };
      paint();
      const timer = setInterval(() => {
        left--;
        if (left <= 0) {
          clearInterval(timer);
          btn.disabled = false;
          btn.textContent = LANG.isZh() ? "获取验证码" : "Send code";
          return;
        }
        paint();
      }, 1000);
      toast(LANG.isZh() ? "验证码已发送（演示环境，任意 4 位以上数字可通过）" : "Code sent (demo: any 4+ digits will pass)");
    });
  };
  bindSms("sendCode", "phone", "err1");
  bindSms("sendGuard", "gphone", "errG");

  $("next1").addEventListener("click", () => {
    const phone = $("phone").value.replace(/\D/g, "");
    const code = $("code").value.replace(/\D/g, "");
    const pw = $("pw").value;
    if (phone.length !== 11) return err($("err1"), LANG.isZh() ? "请输入 11 位手机号" : "Please enter an 11-digit mobile number");
    if (code.length < 4) return err($("err1"), LANG.isZh() ? "请输入短信验证码" : "Please enter the SMS code");
    if (pw.length < 8) return err($("err1"), LANG.isZh() ? "密码至少 8 位" : "Password must be at least 8 characters");
    err($("err1"), "");
    setPane(2, 1);
  });

  $("back2").addEventListener("click", () => setPane(1, 0));
  $("backG").addEventListener("click", () => setPane(2, 1));

  $("next2").addEventListener("click", () => {
    const name = $("realname").value.trim();
    const idnum = $("idnum").value.trim();
    const birth = $("birth").value;
    if (name.length < 2) return err($("err2"), LANG.isZh() ? "请填写真实姓名" : "Please enter your legal name");
    if (idnum.length < 6) return err($("err2"), LANG.isZh() ? "请填写证件号码" : "Please enter your document number");
    if (!birth) return err($("err2"), LANG.isZh() ? "请选择出生日期" : "Please choose your date of birth");
    if (!$("agree").checked) return err($("err2"), LANG.isZh() ? "请先阅读并同意协议" : "Please accept the terms first");
    err($("err2"), "");

    const age = calcAge(birth);
    if (age < 18) {
      setPane("g", 1);
    } else {
      finish(false, age);
    }
  });

  $("submitG").addEventListener("click", () => {
    const gn = $("gname").value.trim();
    const gp = $("gphone").value.replace(/\D/g, "");
    const gc = $("gcode").value.replace(/\D/g, "");
    if (gn.length < 2) return err($("errG"), LANG.isZh() ? "请填写监护人姓名" : "Please enter the guardian's name");
    if (gp.length !== 11) return err($("errG"), LANG.isZh() ? "请填写监护人手机号" : "Please enter the guardian's mobile number");
    if (gc.length < 4) return err($("errG"), LANG.isZh() ? "请填写监护人收到的验证码" : "Please enter the guardian's code");
    err($("errG"), "");
    finish(true, calcAge($("birth").value));
  });

  function calcAge(v) {
    const b = new Date(v);
    if (isNaN(b.getTime())) return 99;
    const now = new Date();
    let a = now.getFullYear() - b.getFullYear();
    const m = now.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < b.getDate())) a--;
    return a;
  }

  function finish(isMinor, age) {
    setPane("done", 2);
    /* 写入账号 / 实名状态（演示：前端本地存储） */
    if (window.AUTH) AUTH.set({ on: true, name: ($("realname").value.trim() || "星轨用户"), age: age, minor: isMinor });
    const ret = new URLSearchParams(location.search).get("return");
    const t = $("doneTitle");
    const d = $("doneText");
    const go = $("doneGo");
    if (isMinor) {
      t.dataset.zh = "注册完成 · 已开启未成年人模式";
      t.dataset.en = "Done · minor mode enabled";
      d.dataset.zh = `实名核验通过，账号年龄 ${age} 岁。监护人授权已记录，已自动进入未成年人模式：每日 60 分钟、22:00–08:00 休息、不开放付费。`;
      d.dataset.en = `Identity verified, account age ${age}. Guardian consent recorded; minor mode is on: 60 minutes a day, closed 22:00–08:00, payments disabled.`;
      go.setAttribute("href", "minors.html");
      go.dataset.zh = "进入未成年人模式";
      go.dataset.en = "Enter minor mode";
    } else {
      t.dataset.zh = "注册完成";
      t.dataset.en = "You're all set";
      d.dataset.zh = `实名核验通过，账号年龄 ${age} 岁。已为你开启完整内容与星轨计划捐赠入口。`;
      d.dataset.en = `Identity verified, account age ${age}. Full content and the Starway Project donation entry are now available.`;
      go.setAttribute("href", "index.html");
      go.dataset.zh = "进入官网";
      go.dataset.en = "Enter the site";
      if (ret) {
        go.setAttribute("href", ret);
        go.dataset.zh = "继续刚才的操作";
        go.dataset.en = "Continue where you left off";
      }
    }
    LANG.apply();
  }
}

/* ---------------------------------------------------------
   10. 启动
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  // 截图/调试辅助：?snap=1 关闭动效；&y=1234 滚动；?lang=en 强制语言
  const params = new URLSearchParams(location.search);
  if (params.has("lang")) LANG.apply(params.get("lang"));
  if (params.has("snap")) {
    document.documentElement.style.scrollBehavior = "auto";
    const s = document.createElement("style");
    s.textContent = ".reveal{opacity:1!important;transform:none!important;transition:none!important}";
    document.head.appendChild(s);
  }

  window.renderPage = renderPage;
  LANG.apply();

  initStarfield(document.getElementById("starfield"));
  initStarfield(document.getElementById("kidsStars"), { count: 120, palette: ["#FFFFFF", "#FFD966", "#FFB3C6", "#D9D2FF"] });
  initLoader();
  initReveal();
  initMinors();
  initRegister();
  initAmberModal();
  initMusic();

  document.querySelectorAll(".lang-switch button, .pw-lang button").forEach((b) => {
    b.addEventListener("click", () => LANG.toggle(b.dataset.lang));
  });

  if (params.has("snap")) {
    const y = parseInt(params.get("y"), 10);
    if (!isNaN(y)) setTimeout(() => window.scrollTo(0, y), 80);
  }

  // 数字滚动
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals, 10) : 0;
    const dur = 1200;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = target * eased;
      el.textContent = prefix + cur.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
});
