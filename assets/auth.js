/* =========================================================
   AUTH — 账号 / 实名状态（演示用，前端本地存储）
   - register.html 完成注册后写入
   - 涉及未成年人内容（minors.html）与付款/捐赠（donate.html）
     强制要求「已登录 + 已实名认证」
   ========================================================= */
(function () {
  "use strict";

  const KEY = "starway-auth";

  function get() {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || "null");
      return v && v.on ? v : null;
    } catch (e) { return null; }
  }

  function set(profile) {
    localStorage.setItem(KEY, JSON.stringify(Object.assign({ ts: Date.now() }, profile)));
    paintCta();
  }

  function logout() {
    localStorage.removeItem(KEY);
    paintCta();
  }

  /* 是否已登录且完成实名认证（管理员视为永久已认证） */
  function isAdmin() { const a = get(); return !!(a && a.admin); }
  function isVerified() { return !!get(); }
  function isMinor() { const a = get(); return !!(a && a.minor && !a.admin); }
  function name() { const a = get(); return a ? a.name : ""; }

  /* 导航 CTA：已实名后显示用户名 */
  function paintCta() {
    const a = get();
    document.querySelectorAll(".nav-cta[href='register.html']").forEach((el) => {
      if (a) {
        el.textContent = a.admin
          ? (LANG.isZh() ? "管理员模式" : "Admin mode")
          : (LANG.isZh() ? "已实名 · " : "Verified · ") + a.name;
        el.classList.add("verified");
        el.classList.toggle("admin", !!a.admin);
      }
    });
    /* 未成年模式页的实名按钮 */
    document.querySelectorAll("[data-auth-name]").forEach((el) => {
      el.textContent = a ? a.name : "";
    });
  }

  /* 打开认证门：未登录/未实名时覆盖内容，强制引导注册（管理员直接放行） */
  function gate(opts) {
    if (isAdmin()) return null;
    opts = opts || {};
    const wrap = document.createElement("div");
    wrap.className = "auth-gate" + (opts.minor ? " minor" : "");
    const zh = LANG.isZh();
    const blockedMinor = isVerified() && isMinor() && opts.blockMinor;

    wrap.innerHTML = `
      <div class="ag-card">
        <div class="ag-icon">${opts.minor ? "🛡️" : "🔐"}</div>
        <h2>${blockedMinor
          ? (zh ? "未成年账号无法进行支付" : "Payments are not available for minor accounts")
          : (zh ? "该内容需要登录并完成实名认证" : "Sign in & verify your identity to continue")}</h2>
        <p>${blockedMinor
          ? (zh ? "为保护未成年人，捐赠与支付功能不对未成年账号开放。如需捐赠，请使用监护人账号登录。"
                : "To protect minors, donations and payments are disabled for minor accounts. Please use a guardian's account.")
          : (zh ? (opts.reason || "涉及未成年人保护与资金安全，根据相关规定需要先完成实名注册并登录。")
                : (opts.reasonEn || "For the protection of minors and payment safety, real-name registration is required first."))}</p>
        <div class="ag-actions">
          ${blockedMinor ? "" : `<a class="ag-btn primary" href="register.html?return=${encodeURIComponent(location.pathname.split("/").pop() + location.search)}">${zh ? "前往实名注册 / 登录" : "Go to sign up / log in"}</a>`}
          <a class="ag-btn ghost" href="index.html">${zh ? "返回首页" : "Back to home"}</a>
        </div>
        <div class="ag-note">${zh ? "演示环境：注册流程任填即可通过" : "Demo: any input passes the sign-up flow"}</div>
      </div>`;
    document.body.appendChild(wrap);
    document.documentElement.style.overflow = "hidden";
    return wrap;
  }

  document.addEventListener("DOMContentLoaded", paintCta);

  window.AUTH = { get, set, logout, isVerified, isMinor, isAdmin, name, gate, paintCta };
})();
