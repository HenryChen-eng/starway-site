/* =========================================================
   《边界哨声》详情页交互
   世界切换 / 遗物状态 / 流弹时刻粒子特效 / 特殊状态
   ========================================================= */
(function () {
  "use strict";

  /* ---------- 1. 世界切换：安宁 ⇄ 战火 ---------- */
  const body = document.body;
  const dissolve = document.getElementById("bwDissolve");
  function setWorld(mode) {
    const war = mode === "war";
    body.classList.toggle("war", war);
    if (dissolve) {
      dissolve.classList.remove("run");
      void dissolve.offsetWidth; /* 重启动画 */
      dissolve.classList.add("run");
    }
    document.querySelectorAll("[data-world-btn]").forEach((b) => {
      const m = b.dataset.worldBtn;
      b.classList.toggle("on-peace", m === "peace" && !war);
      b.classList.toggle("on-war", m === "war" && war);
    });
  }
  document.querySelectorAll("[data-world-btn]").forEach((b) => {
    b.addEventListener("click", () => setWorld(b.dataset.worldBtn));
  });

  /* ---------- 1b. 滚动后出现的迷你世界切换 ---------- */
  const fab = document.getElementById("bwFab");
  if (fab) {
    const hero = document.querySelector(".bw-hero");
    const onScroll = () => {
      const past = window.scrollY > (hero ? hero.offsetHeight * 0.6 : 500);
      if (past && fab.hidden) { fab.hidden = false; requestAnimationFrame(() => fab.classList.add("show")); }
      else if (!past && !fab.hidden) { fab.classList.remove("show"); setTimeout(() => { if (!fab.classList.contains("show")) fab.hidden = true; }, 420); }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 1c. 石碑刻痕演示 ---------- */
  const carveBtn = document.getElementById("carveBtn");
  const carveReset = document.getElementById("carveReset");
  const carveFace = document.getElementById("carveFace");
  const carveIns = document.getElementById("carveIns");
  const carveN = document.getElementById("carveN");
  if (carveBtn && carveFace && carveIns && carveN) {
    const NAMES = ["陈婆婆", "小满", "阿禾", "周爷爷", "阿柚", "老赵"];
    const NAMES_EN = ["Granny Chen", "Xiaoman", "A-He", "Grpa Zhou", "A-You", "Lao Zhao"];
    let n = 0;
    const setTick = () => {
      const zh = document.documentElement.getAttribute("data-lang") !== "en";
      const pool = zh ? NAMES : NAMES_EN;
      const d = document.createElement("div");
      d.className = "tick";
      d.textContent = `LOOP ${String(n).padStart(2, "0")} · ${pool[(n - 1) % pool.length]}${n > pool.length ? (zh ? " · 再次" : " · again") : ""}`;
      carveFace.appendChild(d);
      carveN.textContent = n;
      if (n >= 4) carveIns.classList.add("show");
    };
    carveBtn.addEventListener("click", () => {
      const empty = carveFace.querySelector(".carve-empty");
      if (empty) empty.remove();
      n += 1;
      setTick();
    });
    carveReset.addEventListener("click", () => {
      n = 0;
      carveFace.innerHTML = '<span class="carve-empty"></span>';
      carveFace.querySelector(".carve-empty").setAttribute(
        "data-zh", "石碑还很干净。每一轮没能带走的人，都会留下淡淡的名字。");
      carveFace.querySelector(".carve-empty").setAttribute(
        "data-en", "The stone is still clean. Everyone you couldn't take with you leaves a faint name.");
      carveFace.querySelector(".carve-empty").textContent =
        document.documentElement.getAttribute("data-lang") === "en"
          ? "The stone is still clean. Everyone you couldn't take with you leaves a faint name."
          : "石碑还很干净。每一轮没能带走的人，都会留下淡淡的名字。";
      carveN.textContent = "0";
      carveIns.classList.remove("show");
    });
  }

  /* ---------- 2. 遗物：完好 ⇄ 损毁 ---------- */
  document.querySelectorAll(".bw-relic").forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("dmg");
      const st = card.querySelector(".st");
      const zh = document.documentElement.getAttribute("data-lang") !== "en";
      if (st) st.textContent = card.classList.contains("dmg")
        ? (zh ? "已损毁 · 点击复原" : "Damaged · click to restore")
        : (zh ? "完好 · 点击查看损毁" : "Intact · click to damage");
    });
  });

  /* ---------- 3. 特殊状态演示 ---------- */
  const bindState = (btnId, viewId, cls) => {
    const btn = document.getElementById(btnId);
    const view = document.getElementById(viewId);
    if (!btn || !view) return;
    btn.addEventListener("click", () => {
      view.classList.toggle(cls);
      const zh = document.documentElement.getAttribute("data-lang") !== "en";
      btn.textContent = view.classList.contains(cls)
        ? (zh ? "退出演示" : "Exit demo")
        : btn.dataset.label || btn.textContent;
    });
  };
  bindState("trustBtn", "trustView", "broken");
  bindState("relicBtn", "relicView", "reading");
  document.querySelectorAll("#trustBtn, #relicBtn").forEach((b) => { b.dataset.label = b.textContent; });

  /* ---------- 4. 流弹时刻：画布粒子特效 ---------- */
  const cv = document.getElementById("fxCanvas");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const scene = new Image();
  scene.src = "assets/img/bw-peace.png";

  let W = 0, H = 0, shake = 0;
  const shards = [], dust = [], flashes = [], debris = [];

  function resize() {
    const r = cv.getBoundingClientRect();
    W = cv.width = Math.round(r.width);
    H = cv.height = Math.round(r.height);
  }
  window.addEventListener("resize", resize);
  resize();

  const rnd = (a, b) => a + Math.random() * (b - a);

  function impact(x, y) {
    /* 冲击漫反射闪光：微弱、短促、柔和衰减 */
    flashes.push({ x, y, r: 8, a: 0.5 });
    /* 分层玻璃碎片：大小有别、带反光 */
    for (let i = 0; i < 26; i++) {
      shards.push({
        x, y,
        vx: rnd(-3.4, 3.4), vy: rnd(-5.2, -0.6),
        s: rnd(2, 7.5), rot: rnd(0, Math.PI), vr: rnd(-0.22, 0.22),
        a: 1, tone: Math.random() < 0.5 ? "205,224,240" : "168,196,220",
        ground: y + rnd(60, 130)
      });
    }
    /* 瓦片 / 石块碎屑 */
    for (let i = 0; i < 10; i++) {
      debris.push({ x, y, vx: rnd(-2.6, 2.6), vy: rnd(-4.4, -1), s: rnd(2, 5), a: 1 });
    }
    /* 尘土扬起、缓慢消散 */
    for (let i = 0; i < 12; i++) {
      dust.push({ x: x + rnd(-10, 10), y: y + rnd(-6, 10), r: rnd(4, 9), vr: rnd(0.35, 0.9), a: rnd(0.16, 0.3) });
    }
    /* 子像素微抖动 */
    shake = 1;
  }

  function step() {
    requestAnimationFrame(step);
    if (!W) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);

    /* 背景场景 */
    if (scene.complete && scene.naturalWidth) {
      const ir = scene.naturalWidth / scene.naturalHeight, cr = W / H;
      let dw, dh;
      if (ir > cr) { dh = H; dw = H * ir; } else { dw = W; dh = W / ir; }
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(scene, (W - dw) / 2, (H - dh) / 2, dw, dh);
    } else {
      ctx.fillStyle = "#1a150f"; ctx.fillRect(0, 0, W, H);
    }

    /* 抖动（子像素级，柔和） */
    if (shake > 0.01) {
      ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
      shake *= 0.86;
    }

    /* 闪光 */
    for (let i = flashes.length - 1; i >= 0; i--) {
      const f = flashes[i];
      const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r);
      g.addColorStop(0, `rgba(255,244,214,${f.a})`);
      g.addColorStop(1, "rgba(255,244,214,0)");
      ctx.fillStyle = g;
      ctx.fillRect(f.x - f.r, f.y - f.r, f.r * 2, f.r * 2);
      f.r += 2.4; f.a *= 0.82;
      if (f.a < 0.02) flashes.splice(i, 1);
    }

    /* 玻璃碎片 */
    for (let i = shards.length - 1; i >= 0; i--) {
      const p = shards[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.24; p.rot += p.vr;
      if (p.y >= p.ground) { p.y = p.ground; p.vy = 0; p.vx *= 0.6; p.a *= 0.965; }
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, p.a) * 0.9;
      ctx.fillStyle = `rgb(${p.tone})`;
      ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      ctx.globalAlpha = Math.max(0, p.a) * 0.85;
      ctx.fillStyle = "rgba(255,255,255,.9)";
      ctx.fillRect(-p.s / 2, -p.s / 4, p.s, 1);
      ctx.restore();
      if (p.a < 0.03) shards.splice(i, 1);
    }

    /* 石块碎屑 */
    for (let i = debris.length - 1; i >= 0; i--) {
      const p = debris[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.28; p.a *= 0.972;
      ctx.globalAlpha = Math.max(0, p.a);
      ctx.fillStyle = "#6E6A5C";
      ctx.fillRect(p.x, p.y, p.s, p.s);
      if (p.a < 0.03) debris.splice(i, 1);
    }

    /* 尘土 */
    for (let i = dust.length - 1; i >= 0; i--) {
      const d = dust[i];
      d.r += d.vr; d.a *= 0.972;
      const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r);
      g.addColorStop(0, `rgba(196,178,146,${d.a})`);
      g.addColorStop(1, "rgba(196,178,146,0)");
      ctx.fillStyle = g;
      ctx.fillRect(d.x - d.r, d.y - d.r, d.r * 2, d.r * 2);
      if (d.a < 0.015) dust.splice(i, 1);
    }
    ctx.globalAlpha = 1;
  }
  step();

  cv.addEventListener("click", (e) => {
    const r = cv.getBoundingClientRect();
    impact(e.clientX - r.left, e.clientY - r.top);
  });
  const fireBtn = document.getElementById("fxFire");
  if (fireBtn) fireBtn.addEventListener("click", () => impact(rnd(W * 0.25, W * 0.75), rnd(H * 0.3, H * 0.55)));
  const clearBtn = document.getElementById("fxClear");
  if (clearBtn) clearBtn.addEventListener("click", () => { shards.length = 0; dust.length = 0; flashes.length = 0; debris.length = 0; shake = 0; });

  /* ---------- 5. 愿望单占位 ---------- */
  const wl = document.getElementById("bwWishlist");
  if (wl) wl.addEventListener("click", () => {
    const zh = document.documentElement.getAttribute("data-lang") !== "en";
    if (window.toast) toast(zh ? "商店页准备中 · 上线后第一时间开放愿望单" : "Store page in progress — wishlist opens at launch");
  });
})();
