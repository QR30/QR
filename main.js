document.addEventListener("DOMContentLoaded", () => {
  // تهيئة AOS
  AOS.init({
    duration: 800,
    once: true,
  });

  // المتغيرات لعناصر التبديل
  const themeToggleBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const translateBtn = document.getElementById("translateBtn");

  // دالة تعيين الوضع (داكن أو فاتح)
  function setTheme(dark) {
    if (dark) {
      document.body.classList.add("dark-mode");
      themeIcon.textContent = "🌙";
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      themeIcon.textContent = "🌞";
      localStorage.setItem("theme", "light");
    }
  }

  // استعادة الوضع المحفوظ
  setTheme(localStorage.getItem("theme") === "dark");

  // حدث تغيير الوضع عند الضغط على الزر
  themeToggleBtn.addEventListener("click", () => {
    setTheme(!document.body.classList.contains("dark-mode"));
  });

  // الترجمات للنصوص باللغتين
  const translations = {
    ar: {
      mainTitle: "مرحبا بكم في الموقع الرسمي للقارئ:",
      nameHighlight: "عبادة محمد عدنان🌟",
      featuredVideo: "فيديو مميز من قناتي",
      aboutSectionTitle: "من أنا؟",
      aboutSectionText:
        "أنا عبادة محمد عدنان، صانع محتوى أُكرّس جهدي لصناعة ونشر محتوى يختص بقراءة القرآن الكريم وتدبّره. أهدف إلى تقديم تلاوات عذبة، وبيئة رقمية تُقرّب الناس من كتاب الله. هذا موقعي الرسمي، حيث تجد جميع روابط حساباتي على السوشل ميديا.",
      contactSectionTitle: "تواصل معي",
      contactSectionText: "لأي تواصل مهني أو تعاون، يمكنك مراسلتي على :",
      email: "البريد الإلكتروني",
      telegram: "تليجرام",
      instagram: "إنستجرام",
      aboutLink: "من أنا",
      contactLink: "تواصل معي",
      privacyLink: "سياسة الخصوصية",
      copyrightText: " عبادة. جميع الحقوق محفوظة © 2025. | سياسة الخصوصية",
      accounts_YouTube: "يوتيوب",
      accounts_Instagram: "إنستجرام",
      accounts_TikTok: "تيك توك",
      accounts_Facebook: "فيسبوك",
      accounts_Telegram: "تيليجرام",
    },
    en: {
      mainTitle: ": Welcome to the official site of the reciter",
      nameHighlight: "🌟 Obadah Mohammed Adnan",
      featuredVideo: "Featured Video from my channel",
      aboutSectionTitle: "About Me",
      aboutSectionText:
        "I am Obada Muhammed Adnan, a content creator dedicated to creating and publishing content related to reading and contemplating the Holy Quran. I aim to provide beautiful recitations and a digital environment that brings people closer to the Book of God. This is my official website, where you will find links to all my social media accounts.",
      contactSectionTitle: "Contact Me",
      contactSectionText: "For professional contact or collaboration, reach me at:",
      email: "Email",
      telegram: "Telegram",
      instagram: "Instagram",
      aboutLink: "About Me",
      contactLink: "Contact",
      privacyLink: "Privacy Policy",
      copyrightText: "Obadah. All rights reserved © 2025. | Privacy Policy",
      accounts_YouTube: "YouTube",
      accounts_Instagram: "Instagram",
      accounts_TikTok: "TikTok",
      accounts_Facebook: "Facebook",
      accounts_Telegram: "Telegram",
    },
  };

  // تحديد اللغة الحالية (تخزين في localStorage)
  let currentLang = localStorage.getItem("language") || "ar";

  // دالة تحديث النصوص حسب اللغة المختارة
  function updateTexts() {
    const t = translations[currentLang];

    const mainTitleEl = document.querySelector(".main-title");
    if (mainTitleEl) {
      mainTitleEl.childNodes[0].nodeValue = t.mainTitle + "\n";
    }

    const nameHighlightEl = document.querySelector(".name-highlight");
    if (nameHighlightEl) {
      nameHighlightEl.textContent = t.nameHighlight;
    }

    const featuredVideoTitleEl = document.querySelector(".featured-video-title");
    if (featuredVideoTitleEl) {
      featuredVideoTitleEl.textContent = t.featuredVideo;
    }

    const aboutH2 = document.querySelector("#about h2");
    if (aboutH2) aboutH2.textContent = t.aboutSectionTitle;

    const aboutP = document.querySelector("#about p");
    if (aboutP) aboutP.textContent = t.aboutSectionText;

    const contactH2 = document.querySelector("#contact h2");
    if (contactH2) contactH2.textContent = t.contactSectionTitle;

    const contactP = document.querySelector("#contact p");
    if (contactP) {
      contactP.firstChild.nodeValue = t.contactSectionText + "\n";
    }

    const aboutNav = document.querySelector('.nav-list .nav-link[href="#about"]');
    if (aboutNav) aboutNav.textContent = t.aboutLink;

    const contactNav = document.querySelector('.nav-list .nav-link[href="#contact"]');
    if (contactNav) contactNav.textContent = t.contactLink;

    const privacyNav = document.querySelector('.nav-list .nav-link[href="privacy.html"]');
    if (privacyNav) privacyNav.textContent = t.privacyLink;

    const copyrightEl = document.querySelector(".footer-copyright");
    if (copyrightEl) {
      const parts = t.copyrightText.split("|");
      const textBeforeLink = parts[0].trim();
      const privacyText = parts[1] ? parts[1].trim() : "";
      copyrightEl.innerHTML = `
        ${textBeforeLink} | <a href="privacy.html" class="privacy-link">${privacyText}</a>
      `;
    }
  }

  // تبديل اللغة عند الضغط على زر الترجمة
  translateBtn.addEventListener("click", () => {
    currentLang = currentLang === "ar" ? "en" : "ar";
    localStorage.setItem("language", currentLang);
    updateTexts();
  });

  updateTexts();

  // تهيئة تأثير الميل للبطاقات
  VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.3,
  });

  // تهيئة جزيئات الخلفية
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#4b0082" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out" },
      line_linked: { enable: true, distance: 120, color: "#4b0082", opacity: 0.3, width: 1 },
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
      modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } },
    },
    retina_detect: true,
  });
});

if (!localStorage.getItem("theme")) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark);
}
