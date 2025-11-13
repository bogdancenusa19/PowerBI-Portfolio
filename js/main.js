// Lightbox gallery
const galleryImages = Array.from(document.querySelectorAll('.gallery .image-block img'));
let currentIndex = 0;

function openImage(img) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  currentIndex = galleryImages.indexOf(img);
  lightboxImg.src = img.src;
  lightbox.style.display = 'flex';
}

function closeImage() {
  document.getElementById('lightbox').style.display = 'none';
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  document.getElementById('lightbox-img').src = galleryImages[currentIndex].src;
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  document.getElementById('lightbox-img').src = galleryImages[currentIndex].src;
}

document.addEventListener('keydown', function (event) {
  const lightbox = document.getElementById('lightbox');
  if (lightbox.style.display === 'flex') {
    if (event.key === 'ArrowRight') {
      showNextImage();
    } else if (event.key === 'ArrowLeft') {
      showPrevImage();
    } else if (event.key === 'Escape') {
      closeImage();
    }
  }
});

// Countdown timers for upcoming projects
function updateCountdowns() {
  const countdowns = document.querySelectorAll('.countdown-timer');
  const now = new Date().getTime();

  countdowns.forEach(el => {
    const deadline = new Date(el.dataset.deadline).getTime();
    const distance = deadline - now;

    if (distance <= 0) {
      el.textContent = "Opens soon!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);

    el.textContent = `Opens in: ${days}d ${hours}h ${minutes}m`;
  });
}

setInterval(updateCountdowns, 60000);
updateCountdowns();

// Navbar scroll transparency
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.project-navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Burger toggle menu
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("burger-toggle");
  const nav = document.getElementById("navbar-links");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });

    const links = nav.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          nav.classList.remove("show");
        }
      });
    });
  }
});

const projects = {
  marketmindz: {
    map: [7,19,19,15,18,62,63,63,3,17,8,21,4,66,6,14,14,6,11,4,66,2,14,12,63,5,8,11,4,63,3,63,53,15,68,45,56,61,29,47,39,43,61,10,31,67,33,30,10,5,14,50,20,5,40,56,40,9,22,61,35,28,46,35,34,63,21,8,4,22,64,20,18,15,65,18,7,0,17,8,13,6],
    key: [77, 106, 65, 119, 77, 103, 61, 61]
  },
  krakenkoffee: {
    map: [7,19,19,15,18,62,63,63,3,17,8,21,4,66,6,14,14,6,11,4,66,2,14,12,63,3,17,8,21,4,63,5,14,11,3,4,17,18,63,53,41,44,21,26,59,15,14,67,55,7,46,52,21,52,39,23,58,39,29,39,5,9,44,61,7,48,37,3,35,59,50,8,64,20,18,15,65,3,17,8,21,4,68,11,8,13,10],
    key: [77, 106, 65, 119, 77, 103, 61, 61]
  },
  presidential: {
    map: [7,19,19,15,18,62,63,63,3,17,8,21,4,66,6,14,14,6,11,4,66,2,14,12,63,3,17,8,21,4,63,5,14,11,3,4,17,18,63,53,15,20,42,6,48,46,18,7,5,12,19,16,56,5,61,17,67,51,34,33,59,19,45,68,44,60,12,4,9,31,15,5,64,20,18,15,65,18,7,0,17,8,13,6],
    key: [77, 106, 65, 119, 77, 103, 61, 61]
  },
  hr: {
    map: [/* MAP */],
    key: [77, 106, 65, 119, 77, 103, 61, 61]
  },
  winemag: {
    map: [/* MAP */],
    key: [77, 106, 65, 119, 77, 103, 61, 61]
  }
};

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:/?=.-_";

function promptDownload(projectName) {
  const project = projects[projectName];
  if (!project) return alert("Project not found.");

  const z = prompt("You will be redirected to Google Drive.\nTo download the project, click the top-right download icon on the page.\n\nEnter access key to unlock the report:");
  if (!z) return;

  const input = btoa(z.trim());
  const pass = String.fromCharCode(...project.key);
  const link = project.map.map(i => chars[i]).join("");

  if (input === pass) {
    window.location.href = link;
  } else {
    alert("Incorrect password.");
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const navLeft = document.querySelector('.project-nav-left');
  if (navLeft) {
    navLeft.style.cursor = 'pointer';
    navLeft.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

