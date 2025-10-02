document.addEventListener("DOMContentLoaded", () => {
  // --- تهيئة AOS ---
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
    });
  }

  // --- التحكم بالوضع الداكن/الفاتح ---
  const themeToggleBtn = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  function setTheme(dark) {
    if (dark) {
      document.body.classList.add("dark-mode");
      if (themeIcon) themeIcon.textContent = "🌙";
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      if (themeIcon) themeIcon.textContent = "🌞";
      localStorage.setItem("theme", "light");
    }
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme === "dark");
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      setTheme(!document.body.classList.contains("dark-mode"));
    });
  }

// --- تهيئة VanillaTilt فقط على غير الجوال ---
function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
}

if (!isMobileDevice() && typeof VanillaTilt !== "undefined") {
  const elements = document.querySelectorAll(".tilt-effect");
  if (elements.length > 0) {
    VanillaTilt.init(elements, {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
    });
  }
}


  // --- تهيئة particles.js (إن وجد) ---
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#4b0082" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        move: { enable: true, speed: 2 },
        line_linked: { enable: true, distance: 120, color: "#4b0082", opacity: 0.3, width: 1 },
      },
      interactivity: {
        events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } },
      },
      retina_detect: true,
    });
  }

  // --- جلب بيانات يوتيوب API ---
  async function fetchYouTubeData() {
    const apiKey = "AIzaSyAsVA4RrAZ4Q9iHKpQUUdK-eghf8UPJMDs"; // ملاحظة: خزّن المفتاح بشكل آمن خارج الكود مستقبلاً
    const channelId = "UCsRhd8n0ATZ3LFtPUOMWqgQ";

    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.items && data.items.length > 0) {
        const subs = parseInt(data.items[0].statistics.subscriberCount);
        const subsCounter = document.getElementById("subs");
        if (subsCounter) subsCounter.setAttribute("data-target", subs);

        const views = parseInt(data.items[0].statistics.viewCount);
        const viewsCounter = document.getElementById("views");
        if (viewsCounter) viewsCounter.setAttribute("data-target", views);
      }
    } catch (error) {
      console.error("فشل جلب بيانات يوتيوب:", error);
    }
  }

  // --- عداد أرقام متحرك ---
  function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const speed = 200;
    const increment = target / speed;

    function update() {
      const current = +counter.innerText.replace(/,/g, "");
      if (current < target) {
        counter.innerText = Math.ceil(current + increment).toLocaleString();
        requestAnimationFrame(update);
      } else {
        counter.innerText = target.toLocaleString();
      }
    }

    update();
  }

  // --- تفعيل العدادات عند ظهور قسم الإنجازات ---
  const section = document.querySelector("#achievements");
  let started = false;

  window.addEventListener("scroll", async () => {
    if (!started && section) {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight - 100) {
        await fetchYouTubeData();
        document.querySelectorAll(".counter").forEach((counter) => animateCounter(counter));
        started = true;
      }
    }
  });

  // --- تحميل بيانات JSON (اختياري) ---
  async function loadDataFromJSON() {
    try {
      const res = await fetch("data.json");
      if (res.ok) {
        const jsonData = await res.json();
        console.log("تم تحميل البيانات:", jsonData);
      }
    } catch (error) {
      console.error("فشل تحميل ملف JSON:", error);
    }
  }
  // loadDataFromJSON(); // استدعاء إذا أردت

});

document.addEventListener("DOMContentLoaded", () => {
  const translateBtn = document.getElementById("translateBtn");

  if (translateBtn) {
    translateBtn.addEventListener("click", () => {
      const currentFile = window.location.pathname;

      if (currentFile.includes("index_ar.html")) {
        window.location.href = "index.html";
      } else {
        window.location.href = "index_ar.html";
      }
    });
  }
});