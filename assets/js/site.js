const PCA = {
  name: "PCA VENTURES",
  whatsapp: "+2348163430766",
  displayWhatsapp: "+234 816 343 0766",
  location: "Presidential Road, Enugu State, Nigeria",
  defaultMessage: "Hello PCA VENTURES, I would like to discuss a project with you. Please send me your available services, pricing and booking details."
};

const digits = PCA.whatsapp.replace(/\D/g, "");

function whatsappUrl(message = PCA.defaultMessage) {
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    link.href = whatsappUrl();
    link.target = "_blank";
    link.rel = "noopener";
  });

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  menuToggle?.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    menuToggle.innerHTML = mainNav.classList.contains("open")
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  mainNav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      if (menuToggle) menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  const form = document.getElementById("projectForm");

  form?.addEventListener("submit", event => {
    event.preventDefault();

    const data = new FormData(form);
    const name = data.get("name");
    const phone = data.get("phone");
    const service = data.get("service");
    const message = data.get("message");

    const projectMessage =
`Hello PCA VENTURES,

I would like to discuss a project.

Name: ${name}
Phone / WhatsApp: ${phone}
Service: ${service}

Project details:
${message}

Please let me know the price, requirements and next steps.`;

    window.open(whatsappUrl(projectMessage), "_blank");
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
