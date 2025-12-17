// JS comments must be in English only

document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     Navbar burger (supports both layouts)
     - index.html uses: #burger + #navLinks
     - project pages may use: #burger-toggle + #navbar-links
  ========================== */
  const burger =
    document.getElementById("burger") ||
    document.getElementById("burger-toggle");

  const navLinks =
    document.getElementById("navLinks") ||
    document.getElementById("navbar-links");

  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================
     Modal preview (images)
     Works for:
     - .cert (certificates)
     - .js-preview (project previews)
     - any element with [data-preview="true"]
  ========================== */
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalPrev = document.getElementById("modalPrev");
  const modalNext = document.getElementById("modalNext");

  let activeGroup = [];
  let activeIndex = -1;

  const setModalNavVisibility = () => {
    const showNav = activeGroup.length > 1;
    if (modalPrev) modalPrev.style.display = showNav ? "" : "none";
    if (modalNext) modalNext.style.display = showNav ? "" : "none";
  };

  const openModalAt = (index) => {
    if (!modal || !modalImg) return;
    if (!activeGroup.length) return;

    activeIndex = Math.max(0, Math.min(index, activeGroup.length - 1));
    const el = activeGroup[activeIndex];

    const img = el.dataset.img || "";
    const title = el.dataset.title || "";
    const desc = el.dataset.desc || "";

    modalImg.src = img;
    modalImg.alt = title || "Preview";

    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;

    // Hide bottom info bar if empty
    const body = modal.querySelector(".modal__body");
    const hasInfo = Boolean((title && title.trim()) || (desc && desc.trim()));
    if (body) body.classList.toggle("is-hidden", !hasInfo);

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    setModalNavVisibility();
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    activeGroup = [];
    activeIndex = -1;
  };

  const nextModal = () => {
    if (activeGroup.length <= 1) return;
    openModalAt((activeIndex + 1) % activeGroup.length);
  };

  const prevModal = () => {
    if (activeGroup.length <= 1) return;
    openModalAt((activeIndex - 1 + activeGroup.length) % activeGroup.length);
  };

  // Close handlers
  document.querySelectorAll("[data-close]").forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (e) => {
    if (!modal || !modal.classList.contains("is-open")) return;

    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") nextModal();
    if (e.key === "ArrowLeft") prevModal();
  });

  if (modalNext) modalNext.addEventListener("click", nextModal);
  if (modalPrev) modalPrev.addEventListener("click", prevModal);

  // Optional: click image to open in a new tab
  if (modalImg) {
    modalImg.style.cursor = "zoom-in";
    modalImg.addEventListener("click", () => {
      if (!modalImg.src) return;
      window.open(modalImg.src, "_blank", "noopener,noreferrer");
    });
  }

  /* =========================
     Bind modal to previews
  ========================== */


  // Project preview buttons (.js-preview)
  const previewButtons = Array.from(document.querySelectorAll(".js-preview"));
  previewButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const groupName = btn.dataset.group || "__single__";
      activeGroup = previewButtons.filter(
        (x) => (x.dataset.group || "__single__") === groupName
      );
      openModalAt(activeGroup.indexOf(btn));
    });
  });

  // Generic preview elements (optional)
  const genericPreviews = Array.from(document.querySelectorAll('[data-preview="true"]'));
  genericPreviews.forEach((el) => {
    el.addEventListener("click", () => {
      const groupName = el.dataset.group || "__single__";
      activeGroup = genericPreviews.filter(
        (x) => (x.dataset.group || "__single__") === groupName
      );
      openModalAt(activeGroup.indexOf(el));
    });
  });

  /* =========================
     Filters (index only)
  ========================== */
  const filters = document.querySelectorAll(".filter");
  const projects = document.querySelectorAll(".project");

  const applyFilter = (tag) => {
    projects.forEach((p) => {
      const tags = (p.dataset.tags || "").split(" ");
      const show = tag === "all" ? true : tags.includes(tag);
      p.style.display = show ? "" : "none";
    });
  };

  if (filters.length && projects.length) {
    filters.forEach((btn) => {
      btn.addEventListener("click", () => {
        filters.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        applyFilter(btn.dataset.filter);
      });
    });
  }
});

