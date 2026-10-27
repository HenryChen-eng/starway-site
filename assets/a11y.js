/* =========================================================
   辅助功能 · ACESSIBILITY ENGINE
   一份实现，五个页面共用：星轨计划 / 未成年人模式 / 世界和平 / 首页 / 实名注册

   设计原则
   1) 只在 <html> 上打标记，不侵入页面结构；
   2) 重复能力合并：
      · 大字体（适老） + 内容放大  → 同一项，分「标准 / 大字 / 特大」三档
      · TalkBack + 文字转语音      → 同一项「屏幕朗读」
      · 高对比度文字               → 独立一项
   3) 所有开关落到 localStorage，跨页保持一致。
   ========================================================= */

(function () {
  "use strict";

  const KEY = "starway-a11y";
  const html = document.documentElement;

  const DEFAULTS = {
    large: 0,        // 0 标准 · 1 大字 · 2 特大（= 内容放大）
    contrast: false, // 高对比度文字
    invert: false,   // 颜色反转
    cb: "off",       // 色彩视觉增强：off | rg | by
    motion: false,   // 减少动效
    tts: false,      // 屏幕朗读（TalkBack / 文字转语音）
    select: false,   // 随选朗读
    imgdesc: false,  // 图片描述
    stt: false,      // 语音识别文字
    captions: false, // 字幕
    channel: "stereo" // 立体声 | left | right | mono
  };

  const VOICE = { zh: "zh-CN", en: "en-US", ru: "ru-RU", fr: "fr-FR", ar: "ar-SA" };

  /* ---------------------------------------------------------
     文案（俄 / 法 / 阿 用英文回落，与全站 data-zh/data-en 规则一致）
     --------------------------------------------------------- */
  const STR = {
    title:    { zh: "辅助功能", en: "Accessibility", ru: "Специальные возможности", fr: "Accessibilité", ar: "إمكانية الوصول" },
    sub:      { zh: "无障碍与适老化", en: "A11Y SETTINGS", ru: "НАСТРОЙКИ ДОСТУПА", fr: "RÉGLAGES D'ACCESSIBILITÉ", ar: "إعدادات الوصول" },
    close:    { zh: "关闭面板", en: "Close panel", ru: "Закрыть панель", fr: "Fermer le panneau", ar: "إغلاق اللوحة" },
    secVision:{ zh: "视觉", en: "Vision", ru: "ЗРЕНИЕ", fr: "VISION", ar: "البصر" },
    secVoice: { zh: "读屏与语音", en: "Screen reader & voice", ru: "ЧТЕНИЕ И ГОЛОС", fr: "LECTURE ET VOIX", ar: "قارئ الشاشة والصوت" },
    secAudio: { zh: "音频", en: "Audio", ru: "ЗВУК", fr: "AUDIO", ar: "الصوت" },
    secMotion:{ zh: "动效", en: "Motion", ru: "ДВИЖЕНИЕ", fr: "MOUVEMENT", ar: "الحركة" },

    large:    { zh: "大字体 / 内容放大", en: "Large text / magnification", ru: "Крупный шрифт / увеличение", fr: "Grandes polices / zoom", ar: "خط كبير / تكبير المحتوى" },
    largeD:   { zh: "适老字号：正文、按钮与表单一起放大", en: "Senior-friendly scale: body, buttons and forms together", ru: "Для пожилых: текст, кнопки и формы вместе", fr: "Confort senior : texte, boutons et formulaires ensemble", ar: "مقاس مريح لكبار السن: النص والأزرار معاً" },
    std:      { zh: "标准", en: "Std", ru: "Станд", fr: "Norm", ar: "عادي" },
    lg:       { zh: "大字", en: "Large", ru: "Крупный", fr: "Grand", ar: "كبير" },
    xl:       { zh: "特大", en: "Max", ru: "Макс", fr: "Max", ar: "أكبر" },

    contrast: { zh: "高对比度文字", en: "High-contrast text", ru: "Высокая контрастность", fr: "Contraste élevé", ar: "تباين عالٍ" },
    contrastD:{ zh: "纯黑底白字，加粗分隔线，链接带下划线", en: "Pure black & white, heavier rules, underlined links", ru: "Чёрный фон, белый текст, подчёркнутые ссылки", fr: "Noir et blanc purs, liens soulignés", ar: "أسود وأبيض نقي، روابط مسطّرة" },
    invert:   { zh: "颜色反转", en: "Invert colours", ru: "Инверсия цветов", fr: "Inverser les couleurs", ar: "عكس الألوان" },
    invertD:  { zh: "深色变浅色，畏光与部分低视力适用", en: "Dark becomes light; helps light sensitivity", ru: "Тёмное становится светлым; при светобоязни", fr: "Le sombre devient clair ; utile en cas de photophobie", ar: "الداكن يصبح فاتحاً؛ يفيد حساسية الضوء" },
    cb:       { zh: "色彩视觉增强", en: "Colour-vision enhancement", ru: "Усиление цветоразличения", fr: "Amélioration des couleurs", ar: "تعزيز الإدراك اللوني" },
    cbD:      { zh: "色弱 / 色盲：用图形与纹样区分，不只靠颜色", en: "For colour weakness: shapes and patterns, not colour alone", ru: "При дальтонизме: формы и узоры, не только цвет", fr: "Daltonisme : formes et motifs, pas seulement la couleur", ar: "لعمى الألوان: أشكال وزخارف لا اللون وحده" },
    off:      { zh: "关", en: "Off", ru: "Выкл", fr: "Non", ar: "إيقاف" },
    rg:       { zh: "红绿", en: "R-G", ru: "К-З", fr: "R-V", ar: "أحمر-أخضر" },
    by:       { zh: "蓝黄", en: "B-Y", ru: "С-Ж", fr: "B-J", ar: "أزرق-أصفر" },

    motion:   { zh: "减少动效", en: "Reduce motion", ru: "Уменьшить анимацию", fr: "Réduire les animations", ar: "تقليل الحركة" },
    motionD:  { zh: "停用星空闪烁、淡入与视差滚动", en: "Stops starfield twinkle, fades and parallax", ru: "Отключает мерцание, появление и параллакс", fr: "Désactive scintillement, fondus et parallaxe", ar: "إيقاف الوميض والتلاشي والتمرير البارالاكس" },

    tts:      { zh: "TalkBack 屏幕朗读", en: "TalkBack screen reader", ru: "TalkBack: чтение с экрана", fr: "TalkBack : lecture d'écran", ar: "TalkBack: قارئ الشاشة" },
    ttsD:     { zh: "文字转语音：开启后朗读整页，点标题或段落即读", en: "Text-to-speech: reads the page; tap any block to hear it", ru: "Синтез речи: читает страницу; коснитесь блока", fr: "Synthèse vocale : lit la page ; touchez un bloc pour l'écouter", ar: "تحويل النص إلى كلام: يقرأ الصفحة؛ انقر أي فقرة" },
    ttsOn:    { zh: "正在朗读，再次点击可停止", en: "Reading now — tap again to stop", ru: "Идёт чтение — нажмите, чтобы остановить", fr: "Lecture en cours — appuyez pour arrêter", ar: "جارٍ القراءة — انقر مجدداً للإيقاف" },
    select:   { zh: "随选朗读", en: "Select to speak", ru: "Выборочное чтение", fr: "Lecture à la sélection", ar: "قراءة النص المحدد" },
    selectD:  { zh: "选中任意文字后浮出朗读按钮", en: "Select any text, then tap the button", ru: "Выделите текст — появится кнопка", fr: "Sélectionnez du texte, puis appuyez sur le bouton", ar: "حدّد نصاً ثم اضغط الزر" },
    imgdesc:  { zh: "图片描述", en: "Image descriptions", ru: "Описания изображений", fr: "Descriptions d'images", ar: "وصف الصور" },
    imgdescD: { zh: "在每张图片下方输出文字说明", en: "Writes a text description under every image", ru: "Показывает текстовое описание под каждым изображением", fr: "Ajoute une description textuelle sous chaque image", ar: "يضيف وصفاً نصياً أسفل كل صورة" },
    stt:      { zh: "语音识别文字", en: "Speech to text", ru: "Речь в текст", fr: "Reconnaissance vocale", ar: "تحويل الكلام إلى نص" },
    sttD:     { zh: "用麦克风说话，实时转成字幕", en: "Speak into the mic; live transcript in the caption bar", ru: "Говорите в микрофон — текст в строке субтитров", fr: "Parlez dans le micro ; transcription en direct", ar: "تحدث في الميكروفون؛ نص فوري في شريط الترجمة" },
    captions: { zh: "字幕", en: "Captions", ru: "Субтитры", fr: "Sous-titres", ar: "ترجمة ونصوص" },
    captionsD:{ zh: "屏幕底部显示语音与音乐状态", en: "Shows voice and music status at the bottom", ru: "Показывает речь и музыку внизу экрана", fr: "Affiche la voix et la musique en bas de l'écran", ar: "يعرض الصوت والموسيقى أسفل الشاشة" },

    channel:  { zh: "左右音频声道", en: "Left / right audio channel", ru: "Левый / правый канал", fr: "Canaux audio G / D", ar: "القناة اليسرى / اليمنى" },
    channelD: { zh: "单侧听力：把声音并入一侧，或合成单声道", en: "Single-sided hearing: route sound to one ear, or mono", ru: "При одностороннем слухе: звук в одно ухо или моно", fr: "Audition unilatérale : son d'un côté, ou mono", ar: "لضعف السمع في أذن: صوت بجانب واحد أو أحادي" },
    stereo:   { zh: "立体声", en: "Stereo", ru: "Стерео", fr: "Stéréo", ar: "ستيريو" },
    left:     { zh: "仅左", en: "Left", ru: "Лево", fr: "Gauche", ar: "اليسار" },
    right:    { zh: "仅右", en: "Right", ru: "Право", fr: "Droite", ar: "اليمين" },
    mono:     { zh: "单声道", en: "Mono", ru: "Моно", fr: "Mono", ar: "أحادي" },

    read:     { zh: "朗读", en: "Read", ru: "Читать", fr: "Lire", ar: "اقرأ" },
    reset:    { zh: "重置全部辅助设置", en: "Reset all accessibility settings", ru: "Сбросить все настройки", fr: "Réinitialiser tous les réglages", ar: "إعادة تعيين كل الإعدادات" },
    tip:      { zh: "键盘可用：Tab 移动、Enter 开关、Esc 关闭。设置自动保存。", en: "Keyboard: Tab to move, Enter to toggle, Esc to close. Saved automatically.", ru: "Клавиатура: Tab — переход, Enter — вкл/выкл, Esc — закрыть. Сохраняется автоматически.", fr: "Clavier : Tab pour naviguer, Entrée pour basculer, Échap pour fermer. Enregistré automatiquement.", ar: "لوحة المفاتيح: Tab للتنقل، Enter للتبديل، Esc للإغلاق. يُحفظ تلقائياً." },
    unsupported: { zh: "当前浏览器不支持此功能", en: "Not supported in this browser", ru: "Не поддерживается в этом браузере", fr: "Non pris en charge par ce navigateur", ar: "غير مدعوم في هذا المتصفح" },
    saved:    { zh: "辅助设置已保存", en: "Accessibility settings saved", ru: "Настройки сохранены", fr: "Réglages enregistrés", ar: "تم حفظ الإعدادات" },
    resetDone:{ zh: "已恢复默认设置", en: "Reset to defaults", ru: "Возвращены настройки по умолчанию", fr: "Réglages par défaut restaurés", ar: "تمت استعادة الإعدادات الافتراضية" },
    skip:     { zh: "跳到主要内容", en: "Skip to main content", ru: "К основному содержанию", fr: "Aller au contenu principal", ar: "الانتقال إلى المحتوى الرئيسي" },
    musicOn:  { zh: "正在播放主题曲《星尘》", en: "Now playing “Stardust”", ru: "Играет «Stardust»", fr: "Lecture de « Stardust »", ar: "يُشغّل الآن «غبار النجوم»" },
    musicOff: { zh: "音乐已暂停", en: "Music paused", ru: "Музыка на паузе", fr: "Musique en pause", ar: "الموسيقى متوقفة" },
    listening:{ zh: "正在聆听…", en: "Listening…", ru: "Слушаю…", fr: "J'écoute…", ar: "أستمع الآن…" },
    micDenied:{ zh: "未获得麦克风权限", en: "Microphone permission denied", ru: "Нет доступа к микрофону", fr: "Accès au micro refusé", ar: "لم يُمنح إذن الميكروفون" }
  };

  function lang() { return (window.LANG && window.LANG.current) || "zh"; }
  function T(k) { const d = STR[k]; if (!d) return k; return d[lang()] || d.en; }

  /* ---------------------------------------------------------
     状态
     --------------------------------------------------------- */
  let S = Object.assign({}, DEFAULTS);
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) S = Object.assign(S, JSON.parse(raw) || {});
  } catch (e) {}

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {}
  }

  const activeCount = () => [
    S.large > 0, S.contrast, S.invert, S.cb !== "off", S.motion,
    S.tts, S.select, S.imgdesc, S.stt, S.captions, S.channel !== "stereo"
  ].filter(Boolean).length;

  /* ---------------------------------------------------------
     应用状态
     --------------------------------------------------------- */
  const ZOOM = ["1", "1.22", "1.45"];

  function apply() {
    const z = parseFloat(ZOOM[S.large] || "1");
    html.style.setProperty("--a11y-zoom", String(z));
    html.style.setProperty("--a11y-zoom-inv", String(+(1 / z).toFixed(4)));

    html.classList.toggle("a11y-large", S.large > 0);
    html.classList.toggle("a11y-contrast", !!S.contrast);
    html.classList.toggle("a11y-invert", !!S.invert);
    html.classList.toggle("a11y-motion", !!S.motion);
    html.classList.toggle("a11y-cb", S.cb !== "off");
    html.classList.toggle("a11y-captions", !!S.captions);
    html.classList.remove("a11y-cbfilter-deuter", "a11y-cbfilter-protan", "a11y-cbfilter-tritan");
    if (S.cb === "rg") html.classList.add("a11y-cbfilter-deuter");
    if (S.cb === "by") html.classList.add("a11y-cbfilter-tritan");

    if (window.Music && typeof Music.setChannel === "function") Music.setChannel(S.channel);

    applyImgDesc();
    syncFab();
    syncPanel();
  }

  /* ---------------------------------------------------------
     DOM 骨架
     --------------------------------------------------------- */
  let fab = null, panel = null, caption = null, selectBtn = null, built = false;

  const ICON_A11Y = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
    '<circle cx="12" cy="4.4" r="2.1" fill="currentColor"/>' +
    '<path d="M4.2 7.6c2.4.9 5 1.4 7.8 1.4s5.4-.5 7.8-1.4" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>' +
    '<path d="M12 9v5.2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>' +
    '<path d="M8.3 20.4 12 14.2l3.7 6.2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function build() {
    if (built) return;
    built = true;

    fab = document.createElement("button");
    fab.type = "button";
    fab.className = "a11y-fab";
    fab.setAttribute("aria-haspopup", "dialog");
    fab.setAttribute("aria-expanded", "false");
    fab.innerHTML = ICON_A11Y + '<span class="lbl"></span><span class="n"></span><span class="dot"></span>';
    fab.addEventListener("click", togglePanel);

    panel = document.createElement("div");
    panel.className = "a11y-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-label", T("title"));

    caption = document.createElement("div");
    caption.className = "a11y-caption";
    caption.setAttribute("role", "status");
    caption.setAttribute("aria-live", "polite");

    selectBtn = document.createElement("button");
    selectBtn.type = "button";
    selectBtn.className = "a11y-select-btn";
    selectBtn.textContent = T("read");
    selectBtn.addEventListener("mousedown", (e) => e.preventDefault());
    selectBtn.addEventListener("click", () => {
      const txt = (window.getSelection() || "").toString().trim();
      if (txt) { stopSpeak(); speak(txt); }
      hideSelectBtn();
    });

    document.body.appendChild(fab);
    document.body.appendChild(panel);
    document.body.appendChild(caption);
    document.body.appendChild(selectBtn);

    injectFilters();
    injectSkipLink();
    renderPanel();
    bindGlobal();
  }

  /* ---------------------------------------------------------
     面板渲染
     --------------------------------------------------------- */
  function rowSwitch(key, label, desc) {
    return '<button type="button" class="a11y-item" role="switch" data-k="' + key + '" aria-checked="' +
      (S[key] ? "true" : "false") + '"><span class="t"><b>' + label + '</b><i data-desc="' + key + '">' +
      desc + '</i></span><span class="sw"></span></button>';
  }

  function rowSeg(key, label, desc, opts) {
    const btns = opts.map(o => '<button type="button" data-seg="' + key + '" data-v="' + o.v + '"' +
      (String(S[key]) === String(o.v) ? ' class="on" aria-pressed="true"' : ' aria-pressed="false"') +
      '>' + o.l + '</button>').join("");
    return '<div class="a11y-item"><span class="t"><b>' + label + '</b><i>' + desc + '</i></span>' +
      '<span class="seg" role="group" aria-label="' + label + '">' + btns + '</span></div>';
  }

  function renderPanel() {
    if (!panel) return;
    panel.innerHTML =
      '<div class="a11y-head"><div><b>' + T("title") + '</b><span>' + T("sub") + '</span></div>' +
      '<button type="button" class="a11y-close" data-act="close" aria-label="' + T("close") + '">×</button></div>' +

      '<div class="a11y-sub">' + T("secVision") + '</div>' +
      rowSeg("large", T("large"), T("largeD"), [
        { v: 0, l: T("std") }, { v: 1, l: T("lg") }, { v: 2, l: T("xl") }
      ]) +
      rowSwitch("contrast", T("contrast"), T("contrastD")) +
      rowSwitch("invert", T("invert"), T("invertD")) +
      rowSeg("cb", T("cb"), T("cbD"), [
        { v: "off", l: T("off") }, { v: "rg", l: T("rg") }, { v: "by", l: T("by") }
      ]) +

      '<div class="a11y-sub">' + T("secVoice") + '</div>' +
      rowSwitch("tts", T("tts"), T("ttsD")) +
      rowSwitch("select", T("select"), T("selectD")) +
      rowSwitch("imgdesc", T("imgdesc"), T("imgdescD")) +
      rowSwitch("stt", T("stt"), T("sttD")) +
      rowSwitch("captions", T("captions"), T("captionsD")) +

      '<div class="a11y-sub">' + T("secAudio") + '</div>' +
      rowSeg("channel", T("channel"), T("channelD"), [
        { v: "stereo", l: T("stereo") }, { v: "left", l: T("left") },
        { v: "right", l: T("right") }, { v: "mono", l: T("mono") }
      ]) +

      '<div class="a11y-sub">' + T("secMotion") + '</div>' +
      rowSwitch("motion", T("motion"), T("motionD")) +

      '<div class="a11y-tip">' + T("tip") + '</div>' +
      '<button type="button" class="a11y-reset" data-act="reset">' + T("reset") + '</button>';

    panel.setAttribute("aria-label", T("title"));
    fab.querySelector(".lbl").textContent = T("title");
    if (selectBtn) selectBtn.textContent = T("read");
    syncPanel();
    syncFab();
  }

  function syncPanel() {
    if (!panel) return;
    panel.querySelectorAll('[role="switch"][data-k]').forEach((el) => {
      const k = el.dataset.k;
      const on = !!S[k];
      el.setAttribute("aria-checked", on ? "true" : "false");
      const d = el.querySelector("[data-desc]");
      if (d && k === "tts") {
        d.textContent = on ? T("ttsOn") : T("ttsD");
        d.style.color = on ? "#7dd9a6" : "";
      }
    });
    panel.querySelectorAll("[data-seg]").forEach((btn) => {
      const on = String(S[btn.dataset.seg]) === String(btn.dataset.v);
      btn.classList.toggle("on", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function syncFab() {
    if (!fab) return;
    const n = activeCount();
    fab.classList.toggle("has-on", n > 0);
    const badge = fab.querySelector(".n");
    if (badge) badge.textContent = n ? String(n) : "";
    fab.setAttribute("aria-label", T("title") + (n ? " · " + n : ""));
  }

  /* ---------------------------------------------------------
     面板交互
     --------------------------------------------------------- */
  function togglePanel() { setPanel(!panel.classList.contains("open")); }

  function setPanel(open) {
    panel.classList.toggle("open", open);
    fab.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      const first = panel.querySelector(".a11y-close");
      if (first) setTimeout(() => first.focus(), 60);
    }
  }

  function flash(msg) {
    if (typeof toast === "function") toast(msg, "#12111C", "#FFFFFF");
    else announce(msg);
  }

  function bindGlobal() {
    panel.addEventListener("click", (e) => {
      const seg = e.target.closest("[data-seg]");
      if (seg) {
        const k = seg.dataset.seg;
        const raw = seg.dataset.v;
        S[k] = k === "large" ? Number(raw) : String(raw);
        save();
        apply();
        if (k === "channel") showCaption(T("channel") + " · " + T(S.channel));
        return;
      }
      const act = e.target.closest("[data-act]");
      if (act) {
        if (act.dataset.act === "close") setPanel(false);
        if (act.dataset.act === "reset") resetAll();
        return;
      }
      const sw = e.target.closest('[role="switch"][data-k]');
      if (sw) {
        const k = sw.dataset.k;
        setFeature(k, !S[k]);
        return;
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.classList.contains("open")) {
        setPanel(false);
        fab.focus();
      }
    });

    window.addEventListener("langchange", () => { renderPanel(); });
    window.addEventListener("beforeunload", () => { stopSpeak(); try { rec && rec.onend && (rec.onend = null); rec && rec.stop && rec.stop(); } catch (e) {} });

    // 音乐状态进字幕
    if (window.Music && typeof Music.onChange === "function") {
      Music.onChange((on) => {
        if (S.captions) showCaption(on ? "♪ " + T("musicOn") : T("musicOff"), on ? "music" : "music");
        if (S.tts && on === false) { /* 不打断朗读 */ }
      });
    }
  }

  function setFeature(k, on) {
    S[k] = on;
    save();
    apply();

    if (k === "tts") {
      if (on) { startSpeakPage(); } else { stopSpeak(); }
    }
    if (k === "stt") {
      if (on) { if (!S.captions) { S.captions = true; save(); apply(); } startRec(); }
      else stopRec();
    }
    if (k === "imgdesc" && on) flash(T("saved"));
  }

  function resetAll() {
    stopSpeak();
    stopRec();
    S = Object.assign({}, DEFAULTS);
    save();
    apply();
    renderPanel();
    flash(T("resetDone"));
  }

  /* ---------------------------------------------------------
     图片描述
     --------------------------------------------------------- */
  function applyImgDesc() {
    if (!S.imgdesc) {
      document.querySelectorAll(".alt-cap[data-auto]").forEach((n) => n.remove());
      document.querySelectorAll("img[data-altcap]").forEach((i) => i.removeAttribute("data-altcap"));
      return;
    }
    document.querySelectorAll("img").forEach((img) => {
      if (img.dataset.altcap) return;
      if (img.closest(".a11y-panel") || img.closest(".a11y-fab")) return;
      const txt = (img.getAttribute("alt") || "").trim();
      if (!txt) return;
      const cap = document.createElement("span");
      cap.className = "alt-cap";
      cap.dataset.auto = "1";
      cap.textContent = txt;
      img.dataset.altcap = "1";
      img.insertAdjacentElement("afterend", cap);
    });
  }

  /* ---------------------------------------------------------
     朗读（TalkBack / 文字转语音 / 随选朗读）
     --------------------------------------------------------- */
  let currentEl = null;

  function speak(text, el) {
    if (!("speechSynthesis" in window) || !text) return false;
    const u = new SpeechSynthesisUtterance(text.slice(0, 600));
    u.lang = VOICE[lang()] || "en-US";
    u.rate = S.large ? 0.94 : 1;
    u.pitch = 1;
    if (el) {
      u.onstart = () => { clearHl(); currentEl = el; el.classList.add("a11y-reading"); };
      u.onend = () => { if (currentEl === el) { el.classList.remove("a11y-reading"); currentEl = null; } };
    }
    u.onerror = () => {};
    speechSynthesis.speak(u);
    if (S.captions || S.tts) showCaption(text.slice(0, 110));
    return true;
  }

  function clearHl() {
    if (currentEl) { currentEl.classList.remove("a11y-reading"); currentEl = null; }
  }

  function readabilityBlocks() {
    const root = document.querySelector("main") || document.body;
    const sel = "h1,h2,h3,h4,p,li,blockquote,figcaption";
    return Array.from(root.querySelectorAll(sel)).filter((el) => {
      if (el.closest(".a11y-panel") || el.closest(".a11y-fab")) return false;
      if (el.offsetParent === null) return false;
      const t = (el.innerText || "").trim();
      if (t.length < 2) return false;
      if (el.querySelector(sel)) return false; // 只取最内层，避免整段重复
      return true;
    }).slice(0, 90);
  }

  function startSpeakPage() {
    if (!("speechSynthesis" in window)) { flash(T("unsupported")); return; }
    stopSpeak();
    const blocks = readabilityBlocks();
    if (!blocks.length) return;
    blocks.forEach((el) => speak((el.innerText || "").trim(), el));
  }

  function stopSpeak() {
    if ("speechSynthesis" in window) { try { speechSynthesis.cancel(); } catch (e) {} }
    clearHl();
    hideCaption();
  }

  /* 点击即读（TalkBack 语义） */
  document.addEventListener("click", (e) => {
    if (!S.tts) return;
    if (e.target.closest(".a11y-panel") || e.target.closest(".a11y-fab")) return;
    const el = e.target.closest("h1,h2,h3,h4,p,li,blockquote,figcaption,td,th");
    if (!el) return;
    const t = (el.innerText || "").trim();
    if (t.length < 2) return;
    stopSpeak();
    speak(t, el);
  }, true);

  /* 随选朗读 */
  document.addEventListener("mouseup", () => {
    if (!S.select) return;
    setTimeout(() => {
      const sel = window.getSelection();
      const txt = sel ? String(sel).trim() : "";
      if (!txt || txt.length < 2) { hideSelectBtn(); return; }
      const r = sel.getRangeAt(0).getBoundingClientRect();
      if (!r || (!r.width && !r.height)) { hideSelectBtn(); return; }
      selectBtn.style.left = Math.min(window.innerWidth - 90, Math.max(10, r.left + r.width / 2 - 30)) + "px";
      selectBtn.style.top = Math.max(10, r.top - 44) + "px";
      selectBtn.classList.add("on");
    }, 10);
  });

  function hideSelectBtn() { if (selectBtn) selectBtn.classList.remove("on"); }

  /* ---------------------------------------------------------
     字幕 / 语音状态条
     --------------------------------------------------------- */
  let capTimer = null;

  function showCaption(text, kind) {
    if (!caption) return;
    if (!S.captions && kind !== "mic") return;
    const mic = kind === "mic" || kind === "mic-live";
    caption.innerHTML = (mic ? '<span class="mic rec">●</span>' : "") + "<span>" + escapeHtml(text) + "</span>";
    caption.classList.add("on");
  }

  function hideCaption() {
    if (!caption) return;
    clearTimeout(capTimer);
    if (S.stt) return; // 语音识别时字幕条保留
    caption.classList.remove("on");
    caption.innerHTML = "";
  }

  function announce(text) { showCaption(text); }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  /* ---------------------------------------------------------
     语音识别文字
     --------------------------------------------------------- */
  let rec = null;

  function startRec() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { flash(T("unsupported")); S.stt = false; save(); apply(); return; }
    stopRec();
    try {
      rec = new SR();
      rec.lang = VOICE[lang()] || "en-US";
      rec.continuous = true;
      rec.interimResults = true;
      rec.onresult = (ev) => {
        let txt = "";
        for (let i = ev.resultIndex; i < ev.results.length; i++) txt += ev.results[i][0].transcript;
        if (txt.trim()) showCaption(txt.trim(), "mic");
      };
      rec.onerror = (ev) => {
        if (ev.error === "not-allowed" || ev.error === "service-not-allowed") {
          flash(T("micDenied"));
          S.stt = false; save(); apply();
        }
      };
      rec.onend = () => { if (S.stt) { try { rec.start(); } catch (e) {} } };
      rec.start();
      showCaption(T("listening"), "mic");
    } catch (e) { flash(T("unsupported")); }
  }

  function stopRec() {
    if (rec) { try { rec.onend = null; rec.stop(); } catch (e) {} rec = null; }
    hideCaption();
  }

  /* ---------------------------------------------------------
     色觉滤镜（Machado 2009 近似矩阵）
     --------------------------------------------------------- */
  function injectFilters() {
    if (document.getElementById("a11y-cb-svg")) return;
    const box = document.createElement("div");
    box.id = "a11y-cb-svg";
    box.setAttribute("aria-hidden", "true");
    box.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
    box.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">' +
      '<filter id="a11y-cb-deuter"><feColorMatrix type="matrix" values="' +
      "0.367 0.861 -0.228 0 0  0.280 0.673 0.047 0 0  -0.012 0.043 0.969 0 0  0 0 0 1 0" + '"/></filter>' +
      '<filter id="a11y-cb-protan"><feColorMatrix type="matrix" values="' +
      "0.152 1.053 -0.205 0 0  0.115 0.786 0.099 0 0  -0.004 -0.048 1.052 0 0  0 0 0 1 0" + '"/></filter>' +
      '<filter id="a11y-cb-tritan"><feColorMatrix type="matrix" values="' +
      "1.256 -0.077 -0.179 0 0  -0.078 0.931 0.148 0 0  0.005 0.691 0.304 0 0  0 0 0 1 0" + '"/></filter>' +
      "</svg>";
    document.body.appendChild(box);
  }

  /* ---------------------------------------------------------
     跳过导航（键盘 / 读屏用户）
     --------------------------------------------------------- */
  function injectSkipLink() {
    if (document.querySelector(".skip-link")) return;
    let main = document.querySelector("main");
    if (!main) main = document.querySelector("section") || document.body.firstElementChild;
    if (!main) return;
    if (!main.id) main.id = "main";
    main.setAttribute("tabindex", "-1");
    const a = document.createElement("a");
    a.className = "skip-link";
    a.href = "#" + main.id;
    a.textContent = T("skip");
    document.body.insertBefore(a, document.body.firstChild);
    a.addEventListener("click", () => setTimeout(() => main.focus(), 30));
  }

  /* ---------------------------------------------------------
     启动
     --------------------------------------------------------- */
  function init() {
    build();
    // 动态渲染出来的图片也要补描述
    if (typeof window.renderPage === "function" && !window.renderPage.__a11yWrapped) {
      const orig = window.renderPage;
      const wrapped = function () {
        const r = orig.apply(this, arguments);
        if (S.imgdesc) applyImgDesc();
        return r;
      };
      wrapped.__a11yWrapped = true;
      window.renderPage = wrapped;
    }
    apply();
    applyUrlParams();
  }

  /* 可用链接直接带上辅助设置，例如
     starway.html?a11y=open,large
     peace.html?a11y=contrast,right                */
  function applyUrlParams() {
    let q = "";
    try { q = new URLSearchParams(location.search).get("a11y") || ""; } catch (e) {}
    if (!q) return;
    const map = {
      std: ["large", 0], large: ["large", 1], xl: ["large", 2],
      contrast: ["contrast", true], invert: ["invert", true],
      cbrg: ["cb", "rg"], cbby: ["cb", "by"],
      motion: ["motion", true], captions: ["captions", true],
      imgdesc: ["imgdesc", true],
      left: ["channel", "left"], right: ["channel", "right"], mono: ["channel", "mono"]
    };
    let open = false;
    q.split(",").forEach((t) => {
      const k = t.trim();
      if (k === "open") { open = true; return; }
      const m = map[k];
      if (m) S[m[0]] = m[1];
    });
    save();
    apply();
    if (open) setPanel(true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // 供其他脚本调用
  window.A11Y = {
    state: () => Object.assign({}, S),
    set: (k, v) => { S[k] = v; save(); apply(); },
    open: () => { build(); setPanel(true); }
  };
})();
