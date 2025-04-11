/**
 * Kenny Chen - Personal Website JavaScript
 * Handling interactive elements and animations
 */

// DOM Elements
const navbar = document.getElementById("navbar");
const navLinks = document.querySelector(".nav-links");
const burger = document.querySelector(".burger");
const links = document.querySelectorAll(".nav-links li");
const sections = document.querySelectorAll("section");
const cursor = document.querySelector(".cursor");
const skillBars = document.querySelectorAll(".skill-level");
const contactForm = document.getElementById("contactForm");

// Custom Cursor Effect
document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});

document.addEventListener("mouseover", (e) => {
  if (
    e.target.tagName === "A" ||
    e.target.tagName === "BUTTON" ||
    e.target.classList.contains("btn") ||
    e.target.classList.contains("project-card") ||
    e.target.classList.contains("social-icon")
  ) {
    cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
    cursor.style.opacity = "0.5";
    cursor.style.border = "2px solid var(--accent-color)";
  } else {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursor.style.opacity = "0.7";
    cursor.style.border = "2px solid var(--primary-color)";
  }
});

// Handle Burger Menu Click
burger.addEventListener("click", () => {
  // Toggle Nav
  navLinks.classList.toggle("nav-active");

  // Animate Links
  links.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.3
      }s`;
    }
  });

  // Burger Animation
  burger.classList.toggle("toggle");
});

// Close mobile menu when clicking a link
links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("nav-active");
    burger.classList.remove("toggle");
    links.forEach((link) => {
      link.style.animation = "";
    });
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY;

  if (scrollPos > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Update active link based on scroll position
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  links.forEach((link) => {
    link.querySelector("a").classList.remove("active");
    if (
      link.querySelector("a").getAttribute("href").substring(1) ===
      currentSection
    ) {
      link.querySelector("a").classList.add("active");
    }
  });
});

// Animate skill bars on scroll
const animateSkillBars = () => {
  const triggerBottom = window.innerHeight * 0.8;

  skillBars.forEach((bar) => {
    const barTop = bar.getBoundingClientRect().top;

    if (barTop < triggerBottom) {
      const width = bar.parentElement.parentElement.getAttribute("data-skill");
      bar.style.width = bar.style.width || "0%";
    }
  });
};

window.addEventListener("scroll", animateSkillBars);

// Contact Form Submission
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Form validation
    if (!name || !email || !subject || !message) {
      showFormMessage("Please fill in all fields", "error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormMessage("Please enter a valid email address", "error");
      return;
    }

    // Here you would typically send the form data to a server
    // For demo purposes, we'll just show a success message
    showFormMessage(
      "Message sent successfully! I will get back to you soon.",
      "success"
    );
    contactForm.reset();
  });
}

// Show form submission message
function showFormMessage(message, type) {
  // Check if a message already exists and remove it
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create message element
  const messageElement = document.createElement("div");
  messageElement.classList.add("form-message");
  messageElement.classList.add(
    type === "error" ? "error-message" : "success-message"
  );
  messageElement.textContent = message;

  // Insert message after form
  contactForm.parentNode.insertBefore(messageElement, contactForm.nextSibling);

  // Style the message
  messageElement.style.padding = "10px";
  messageElement.style.marginTop = "20px";
  messageElement.style.borderRadius = "5px";
  messageElement.style.textAlign = "center";

  if (type === "error") {
    messageElement.style.backgroundColor = "rgba(255, 99, 71, 0.1)";
    messageElement.style.color = "#ff6347";
  } else {
    messageElement.style.backgroundColor = "rgba(46, 204, 113, 0.1)";
    messageElement.style.color = "#2ecc71";
  }

  // Remove message after 5 seconds
  setTimeout(() => {
    messageElement.remove();
  }, 5000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Reveal animations for elements on scroll
const revealElements = document.querySelectorAll(
  ".project-card, .timeline-item, .skill-item"
);

const revealElementsOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  revealElements.forEach((element, index) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < triggerBottom) {
      setTimeout(() => {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, index * 100);
    }
  });
};

// Apply initial styles to elements that will be revealed
revealElements.forEach((element) => {
  element.style.opacity = "0";
  element.style.transform = "translateY(30px)";
  element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
});

window.addEventListener("scroll", revealElementsOnScroll);
window.addEventListener("load", () => {
  animateSkillBars();
  revealElementsOnScroll();
});

// Add year to copyright in footer
document.addEventListener("DOMContentLoaded", () => {
  const year = new Date().getFullYear();
  document.querySelector(
    ".footer-bottom p"
  ).innerHTML = `&copy; ${year} Kenny Chen. All Rights Reserved.`;
});
