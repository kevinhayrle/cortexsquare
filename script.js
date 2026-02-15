document.documentElement.style.scrollBehavior = "smooth";

const menuBtn = document.querySelector(".menuBtn");
const drawer = document.querySelector(".drawer");
const overlay = document.querySelector(".drawerOverlay");
const closeBtn = document.querySelector(".closeBtn");

menuBtn.addEventListener("click", () => {
  drawer.classList.add("open");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
});

function closeMenu() {
  drawer.classList.remove("open");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

overlay.addEventListener("click", closeMenu);
closeBtn.addEventListener("click", closeMenu);

const revealEls = document.querySelectorAll("[data-reveal]");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-in");
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navLinks a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (scrollY >= top) current = sec.id;
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

const filterBtns = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {

    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    cards.forEach(card => {
      const category = card.dataset.category;

      if (filter === "all" || category === filter) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });

  });
});

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numberOfParticles = 80;

const mouse = {
  x: null,
  y: null,
  radius: 120
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = 2;
    this.speedX = (Math.random() - 0.5) * 1;
    this.speedY = (Math.random() - 0.5) * 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      this.x -= dx / 20;
      this.y -= dy / 20;
    }
  }

  draw() {
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }
  requestAnimationFrame(animate);
}

init();
animate();

const projects = document.querySelectorAll(".parallaxProject");
const progressBar = document.getElementById("scrollProgress");
const parallaxObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const rect = entry.target.getBoundingClientRect();
      const mid = window.innerHeight / 2;
      const distance = (rect.top + rect.height/2 - mid) / mid;

      const scale = 1 - Math.abs(distance) * 0.05;
      entry.target.style.transform = `scale(${scale})`;
    }
  });
}, { threshold: [0, 0.5, 1] });

projects.forEach(p => parallaxObserver.observe(p));
const videoObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const video = entry.target.querySelector("video");
    if (!video) return;

    if (entry.isIntersecting) {
      video.play().catch(()=>{});
    } else {
      video.pause();
    }
  });
}, { threshold: 0.5 });

projects.forEach(p => videoObserver.observe(p));
window.addEventListener("scroll", () => {
  if (!progressBar) return;

  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const percent = (window.scrollY / maxScroll) * 100;
  progressBar.style.width = percent + "%";
});

