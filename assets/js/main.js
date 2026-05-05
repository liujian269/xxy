/**
 * 初始化移动端导航菜单。
 */
function initMobileNav() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * 根据当前页面文件名高亮导航项。
 */
function initActiveNav() {
  const fileName = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("[data-nav] a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) {
      return;
    }

    const target = href.split("#")[0] || "index.html";
    if (target === fileName) {
      link.classList.add("active");
    }
  });
}

/**
 * 初始化滚动入场动画。
 */
function initRevealOnScroll() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((element) => observer.observe(element));
}

/**
 * 初始化回到顶部按钮。
 */
function initBackTop() {
  const button = document.querySelector("[data-back-top]");
  if (!button) {
    return;
  }

  window.addEventListener("scroll", () => {
    button.classList.toggle("visible", window.scrollY > 520);
  });

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * 初始化 EmailJS 留言表单。
 */
function initFeedbackForm() {
  const form = document.querySelector("[data-feedback-form]");
  const status = document.querySelector("[data-form-status]");
  const config = window.EMAILJS_CONFIG;

  if (!form || !status) {
    return;
  }

  if (!window.emailjs || !config || !config.publicKey || !config.serviceId || !config.templateId) {
    status.textContent = "请先在 assets/js/email.config.js 中配置 EmailJS 参数后再提交留言。";
    return;
  }

  emailjs.init({ publicKey: config.publicKey });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      from_name: String(formData.get("name") || "").trim(),
      from_email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      to_email: config.toEmail || "",
      page_url: window.location.href
    };

    if (!payload.from_name || !payload.from_email || !payload.message) {
      status.textContent = "请填写姓名、邮箱和留言内容。";
      return;
    }

    status.textContent = "正在发送，请稍候...";

    try {
      await emailjs.send(config.serviceId, config.templateId, payload);
      form.reset();
      status.textContent = "留言已发送，感谢您的反馈。";
    } catch (error) {
      console.error("EmailJS send failed:", error);
      status.textContent = "发送失败，请稍后重试，或检查 EmailJS 服务配置。";
    }
  });
}

/**
 * 初始化站点前端能力。
 */
function initSite() {
  initMobileNav();
  initActiveNav();
  initRevealOnScroll();
  initBackTop();
  initFeedbackForm();
}

document.addEventListener("DOMContentLoaded", initSite);
