//* Burger Menu
function toggleMenu() {
  var navigationItems = document.querySelector(".navigation-items");
  var burgerIcon = document.querySelector(".burger-menu");
  navigationItems.classList.toggle("nav-open");
  burgerIcon.classList.toggle("active");
}

//* Dropdown
document.addEventListener("DOMContentLoaded", function () {
  setupDropdownBehavior();
  window.addEventListener("resize", debounce(setupDropdownBehavior, 250));
});

function toggleDropdown(dropdownBtnId, dropdownContentId) {
  const dropdownContent = document.getElementById(dropdownContentId);
  const dropdownButton = document.getElementById(dropdownBtnId);

  // Toggle the visibility of the dropdown content
  dropdownContent.classList.toggle("show");

  // Toggle the 'active' class on the dropdown button
  dropdownButton.classList.toggle("active"); // This line ensures the 'active' class is correctly toggled

  // Close all other dropdowns except the current one
  const allDropdownContents = document.querySelectorAll(".dropdown-content");
  allDropdownContents.forEach((content) => {
    if (content.id !== dropdownContentId) {
      content.classList.remove("show");
    }
  });

  const allDropdownButtons = document.querySelectorAll(".dropbtn");
  allDropdownButtons.forEach((button) => {
    if (button.id !== dropdownBtnId) {
      button.classList.remove("active");
    }
  });
}

function setupDropdownBehavior() {
  const isMobileView = window.matchMedia("(max-width: 768px)").matches;
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const btn = dropdown.querySelector(".dropbtn");
    const dropdownContentId = btn.getAttribute("data-dropdown");

    // Clean up previous event listeners
    btn.removeEventListener("click", handleDropdownClick);
    btn.removeEventListener("mouseenter", handleDropdownMouseEnter);
    dropdown.removeEventListener("mouseleave", handleDropdownMouseLeave);

    if (isMobileView) {
      btn.addEventListener("click", handleDropdownClick);
    } else {
      btn.addEventListener("mouseenter", handleDropdownMouseEnter);
      dropdown.addEventListener("mouseleave", handleDropdownMouseLeave);
    }
  });

  // Only for mobile: Close all dropdowns when clicking outside
  if (isMobileView) {
    document.addEventListener("click", closeAllDropdowns, true);
  } else {
    document.removeEventListener("click", closeAllDropdowns, true);
  }
}

function handleDropdownClick(event) {
  const btn = event.target;
  const dropdownContentId = btn.getAttribute("data-dropdown");
  toggleDropdown(btn.id, dropdownContentId);
  event.stopPropagation(); // Prevent triggering closeAllDropdowns
}

function handleDropdownMouseEnter(event) {
  const btn = event.target;
  const dropdownContentId = btn.getAttribute("data-dropdown");
  toggleDropdown(btn.id, dropdownContentId);
}

function handleDropdownMouseLeave(event) {
  const dropdownContent =
    event.currentTarget.querySelector(".dropdown-content");
  dropdownContent.classList.remove("show");
}

function closeAllDropdowns(event) {
  if (!event.target.matches(".dropbtn")) {
    const dropdowns = document.querySelectorAll(".dropdown-content");
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove("show");
    });
    const dropbtns = document.querySelectorAll(".dropbtn");
    dropbtns.forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }
}

// Debounce function to limit resize event handling
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

//* Sticky Nav Bar On Scroll
window.addEventListener("scroll", function () {
  var nav = document.querySelector("nav");

  if (window.innerWidth <= 768) {
    if (window.scrollY > 0) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
});

// Confirm site loaded
window.onload = function () {
  document.body.className += " loaded";
};

// Counter
document.addEventListener("DOMContentLoaded", (event) => {
  const counters = document.querySelectorAll(".counter");
  const animationDuration = 1500; // 5 seconds for the animation
  const updateInterval = 10; // Update every 50 milliseconds

  const startCount = (element) => {
    const target = +element.getAttribute("data-num");
    const isPercentage = element.hasAttribute("data-is-percentage");
    const steps = animationDuration / updateInterval;
    const increment = target / steps;
    let count = 0;

    const updateCount = () => {
      if (count < target) {
        count += increment;
        if (isPercentage) {
          element.innerText = `${Math.ceil(count)}%`;
        } else {
          element.innerText = Math.ceil(count);
        }

        if (count < target) {
          setTimeout(updateCount, updateInterval);
        } else {
          element.innerText = isPercentage ? `${target}%` : target;
        }
      }
    };

    updateCount();
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});

//*Slides
var slideIndex = 1;

document.addEventListener("DOMContentLoaded", function () {
  showSlides(slideIndex);
});

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Remove all classes first
  for (i = 0; i < slides.length; i++) {
    slides[i].className = slides[i].className
      .replace(" active", "")
      .replace(" next-slide", "")
      .replace(" previous-slide", "");
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Set the current slide
  slides[slideIndex - 1].className += " active";
  dots[slideIndex - 1].className += " active";

  // Set the next slide
  var nextSlideIndex = slideIndex % slides.length; // If slideIndex is the last slide, nextSlideIndex will be 0 (first slide)
  slides[nextSlideIndex].className += " next-slide";

  // Set the previous slide
  var previousSlideIndex = (slideIndex - 2 + slides.length) % slides.length; // Corrects for underflow (if slideIndex is 1, it becomes the last slide)
  slides[previousSlideIndex].className += " previous-slide";
}
