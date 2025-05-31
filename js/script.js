document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.querySelector("#mainSlider");
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll("header a, .offcanvas-body a");
  const scrollLeftBtn = document.getElementById("scrollLeft");
  const scrollRightBtn = document.getElementById("scrollRight");

  const isMobile = () => window.innerWidth < 768;

  // Scroll buttons (only on desktop)
  function scrollToSection(direction) {
    const scrollAmount = scrollContainer.clientWidth; // one full section width
    scrollContainer.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }

  scrollLeftBtn.addEventListener("click", () => scrollToSection("left"));
  scrollRightBtn.addEventListener("click", () => scrollToSection("right"));

  // Highlight nav link
  function updateActiveLink() {
    const scrollPos = isMobile()
      ? window.scrollY
      : scrollContainer.scrollLeft;

    sections.forEach((section) => {
      const sectionStart = isMobile()
        ? section.offsetTop
        : section.offsetLeft;
      const sectionEnd = sectionStart + (isMobile() ? section.offsetHeight : section.offsetWidth);

      if (scrollPos >= sectionStart - 200 && scrollPos < sectionEnd - 200) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelectorAll(`a[href="#${section.id}"]`);
        activeLink.forEach((link) => link.classList.add("active"));
      }
    });
  }

  // Run on scroll and resize
  if (isMobile()) {
    window.addEventListener("scroll", updateActiveLink);
  } else {
    scrollContainer.addEventListener("scroll", updateActiveLink);
  }

  // On link click: scroll to section
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        e.preventDefault();
        const offset = isMobile()
          ? targetSection.offsetTop
          : targetSection.offsetLeft;

        if (isMobile()) {
          window.scrollTo({
            top: offset,
            behavior: "smooth",
          });
        } else {
          scrollContainer.scrollTo({
            left: offset,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Recalculate scroll behavior on resize
  window.addEventListener("resize", () => {
    if (isMobile()) {
      window.addEventListener("scroll", updateActiveLink);
      scrollContainer.removeEventListener("scroll", updateActiveLink);
    } else {
      scrollContainer.addEventListener("scroll", updateActiveLink);
      window.removeEventListener("scroll", updateActiveLink);
    }
  });

  // Initial trigger
  updateActiveLink();



  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const targetEl = document.querySelector(targetId);
      const slider = document.getElementById("mainSlider");
  
      if (targetEl) {
        e.preventDefault();
  
        if (window.innerWidth >= 768) {
          // Desktop: scroll horizontally
          slider.scrollTo({
            left: targetEl.offsetLeft,
            behavior: "smooth"
          });
        } else {
          // Mobile: scroll vertically
          targetEl.scrollIntoView({ behavior: "smooth" });
        }
  
        // Close offcanvas on mobile
        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('mobileMenu'));
        if (offcanvas) {
          offcanvas.hide();
        }
      }
    });
  });
});
