// ============================
// Barra de progreso scroll
// ============================
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  const bar = document.getElementById("scroll-progress");
  if (bar) bar.style.width = progress + "%";
});

// ============================
// Botón scrollTop
// ============================
const scrollBtn = document.getElementById("scrollTopBtn");
if (scrollBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollBtn.classList.remove("hidden");
    } else {
      scrollBtn.classList.add("hidden");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ============================
// Menú móvil con overlay
// ============================
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("mobile-overlay");

if (menuBtn && mobileMenu && overlay) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    overlay.classList.toggle("hidden");

    const icon = menuBtn.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-xmark");
  });

  document.querySelectorAll("#mobile-menu a, #mobile-overlay").forEach(el => {
    el.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      overlay.classList.add("hidden");

      const icon = menuBtn.querySelector("i");
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-xmark");
    });
  });
}

// ============================
// Galería de imágenes
// ============================
const images = [
  "src/galeria/gallery-1.jpg",
  "src/galeria/gallery-2.jpg",
  "src/galeria/gallery-3.jpg",
  "src/galeria/gallery-4.jpg",
  "src/galeria/gallery-5.jpg",
  "src/galeria/gallery-6.jpg",
  "src/galeria/gallery-7.jpg",
  "src/galeria/gallery-8.jpg",
  "src/galeria/gallery-9.jpg",
  "src/galeria/gallery-10.jpg",
  "src/galeria/gallery-11.jpg",
  "src/galeria/gallery-12.jpg",
  "src/galeria/gallery-13.jpg",
  "src/galeria/gallery-14.jpg",
  "src/galeria/gallery-15.jpg",
  "src/galeria/gallery-16.jpg",
  "src/galeria/gallery-17.jpg",
  "src/galeria/gallery-18.jpg",
  "src/galeria/gallery-19.jpg",
  "src/galeria/gallery-20.jpg"
];
let currentIndex = 0;

function openModal(index) {
  currentIndex = index;
  const modal = document.getElementById("galleryModal");
  const modalImg = document.getElementById("modalImage");
  if (modal && modalImg) {
    modal.classList.remove("hidden");
    modalImg.src = images[currentIndex];
  }
}

function closeModal() {
  const modal = document.getElementById("galleryModal");
  if (modal) modal.classList.add("hidden");
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  document.getElementById("modalImage").src = images[currentIndex];
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  document.getElementById("modalImage").src = images[currentIndex];
}

// Navegación con teclado
document.addEventListener("keydown", (e) => {
  const modal = document.getElementById("galleryModal");
  if (!modal || modal.classList.contains("hidden")) return;
  if (e.key === "ArrowRight") nextImage();
  if (e.key === "ArrowLeft") prevImage();
  if (e.key === "Escape") closeModal();
});

// ============================
// Copiar texto al portapapeles
// ============================
function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("✅ Copiado al portapapeles: " + text);
  });
}

// ============================
// Modal QR
// ============================
function openQR(title, src) {
  document.getElementById("qrTitle").innerText = title;
  document.getElementById("qrImage").src = src;
  document.getElementById("qrModal").classList.remove("hidden");
}

function closeQR() {
  document.getElementById("qrModal").classList.add("hidden");
}

// ============================
// Formulario de contacto
// ============================
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const messageBox = document.getElementById("formMessage");
    let isValid = true;

    form.querySelectorAll("input[required], textarea[required]").forEach(input => {
      if (!input.value.trim()) {
        input.classList.remove("border-neutral-200", "focus:border-primary-600");
        input.classList.add("border-red-500", "focus:border-red-500", "focus:ring-red-200");
        isValid = false;
      } else {
        input.classList.remove("border-red-500", "focus:border-red-500", "focus:ring-red-200");
        input.classList.add("border-neutral-200", "focus:border-primary-600", "focus:ring-primary-200");
      }
    });

    if (!isValid) {
      messageBox.textContent = "❌ Por favor completa los campos obligatorios.";
      messageBox.className = "mt-4 text-center text-red-600 font-bold";
      messageBox.classList.remove("hidden");
      return;
    }

    setTimeout(() => {
      messageBox.textContent = "✅ ¡Gracias! Tu mensaje fue enviado correctamente.";
      messageBox.className = "mt-4 text-center text-green-600 font-bold";
      messageBox.classList.remove("hidden");
      form.reset();
    }, 800);
  });
}

// ============================
// Animaciones reveal
// ============================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in-up", "show");
      observer.unobserve(entry.target);
    }
  });
});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
