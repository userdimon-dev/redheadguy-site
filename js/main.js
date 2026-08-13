/* ============================================
   Uncensored — интерактив главной страницы
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  initFAQ();
  initAppTabs();
  initOSDetection();
});

/* ---------- Мобильное меню ---------- */
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("nav--open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Закрываем меню при клике на ссылку
  nav.querySelectorAll(".nav__link").forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("nav--open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- FAQ (аккордеон) ---------- */
function initFAQ() {
  const questions = document.querySelectorAll(".faq-item__question");

  questions.forEach(function (q) {
    q.addEventListener("click", function () {
      const item = this.parentElement;
      const wasOpen = item.classList.contains("faq-item--open");

      // Закрываем все
      document.querySelectorAll(".faq-item").forEach(function (i) {
        i.classList.remove("faq-item--open");
      });

      // Открываем текущий, если он был закрыт
      if (!wasOpen) {
        item.classList.add("faq-item--open");
      }
    });
  });
}

/* ---------- Определение ОС ---------- */
function detectOS() {
  const userAgent = navigator.userAgent || navigator.platform || "";
  const platform = navigator.platform || "";

  const mac = /Mac/.test(platform) || /Mac OS X/.test(userAgent);
  const win = /Win/.test(platform) || /Windows/.test(userAgent);
  const linux = /Linux/.test(platform) && !/Android/.test(userAgent);
  const android = /Android/.test(userAgent);
  const ios = /iPhone|iPad|iPod/.test(userAgent);

  if (ios) return "iOS";
  if (android) return "Android";
  if (mac) return "macOS";
  if (win) return "Windows";
  if (linux) return "Linux";
  return "Windows"; // по умолчанию
}

/* ---------- Переключение Happ / Incy ---------- */
function initAppTabs() {
  const tabs = document.querySelectorAll(".app-tab");
  const panels = document.querySelectorAll(".download__grid");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const app = this.getAttribute("data-app");

      // Обновляем активные вкладки
      tabs.forEach(function (t) { t.classList.remove("app-tab--active"); });
      this.classList.add("app-tab--active");

      // Обновляем панели
      panels.forEach(function (panel) {
        const show = panel.getAttribute("data-app-panel") === app;
        panel.classList.toggle("download__grid--active", show);
      });

      // Пересчитываем подсветку ОС для активной панели
      highlightOSInActivePanel();
    });
  });
}

/* ---------- Подсветка нужной ОС в активной панели ---------- */
function highlightOSInActivePanel() {
  const os = detectOS();
  const activePanel = document.querySelector(".download__grid--active");

  if (!activePanel) return;

  // Убираем подсветку везде
  document.querySelectorAll(".dl-card").forEach(function (c) {
    c.classList.remove("dl-card--active");
  });

  // Подсвечиваем нужную карточку в активной панели
  activePanel.querySelectorAll(".dl-card").forEach(function (card) {
    if (card.getAttribute("data-os") === os) {
      card.classList.add("dl-card--active");
    }
  });
}

/* ---------- Определение ОС и стартовая подсветка ---------- */
function initOSDetection() {
  const os = detectOS();
  const osNameEl = document.getElementById("osName");

  if (osNameEl) {
    const osNames = {
      Windows: "Windows",
      macOS: "macOS",
      Linux: "Linux",
      Android: "Android",
      iOS: "iOS"
    };
    osNameEl.textContent = osNames[os] || "Распознаём устройство...";
  }

  highlightOSInActivePanel();
}
