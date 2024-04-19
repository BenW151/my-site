//* Burger Menu
document.addEventListener("DOMContentLoaded", function () {
  function toggleMenu() {
    var navigationItems = document.querySelector(".navigation-items");
    var burgerIcon = document.querySelector(".burger-menu");
    navigationItems.classList.toggle("nav-open");
    burgerIcon.classList.toggle("active");
  }

  const burgerMenu = document.querySelector(".burger-menu");
  if (burgerMenu) {
    burgerMenu.addEventListener("click", toggleMenu);
  } else {
    console.error("Burger menu element not found.");
  }

  const navItems = document.querySelectorAll(".navigation-item");
  if (navItems.length > 0) {
    navItems.forEach((item) => {
      item.addEventListener("click", toggleMenu);
    });
  } else {
    console.error("Navigation items not found.");
  }
});

//* Scrolled
window.addEventListener("scroll", function () {
  var nav = document.querySelector("nav");

  //if (window.innerWidth <= 768) {
  if (window.scrollY > 0) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
  //}
});

//* Site loaded
window.onload = function () {
  document.body.className += " loaded";
};

//* Counter
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

//*AOS
document.addEventListener("DOMContentLoaded", function () {
  var width = window.innerWidth;

  if (width <= 768) {
    AOS.init({
      offset: 200,
      duration: 1000,
    });
  } else if (width > 768 && width <= 1024) {
    AOS.init({
      offset: 200,
      duration: 1000,
    });
  } else {
    AOS.init();
  }
});

//* Scroll Load Bar
window.onscroll = function () {
  myFunction();
};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

//* Parallax
document.addEventListener("DOMContentLoaded", (event) => {
  window.addEventListener("scroll", () => {
    const footer = document.querySelector("footer");
    const scrollableDistance =
      document.documentElement.scrollHeight - window.innerHeight;
    const footerHeight = footer.clientHeight;
    const revealStartPoint = scrollableDistance - footerHeight;

    let scrolled = window.scrollY;

    if (scrolled >= revealStartPoint) {
      let offset = scrolled - revealStartPoint;
      let percentage = Math.min(offset / footerHeight, 1);
      let translateY = -12 + percentage * 12;

      footer.style.transform = `translateY(${translateY}rem)`;

      document.body.style.paddingBottom = `${12 - translateY}rem`;
    } else {
      footer.style.transform = "translateY(-12rem)";
      document.body.style.paddingBottom = "0";
    }
  });
});

//* light mode toggle
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("toggleDarkMode")
    .addEventListener("click", function () {
      document.body.classList.toggle("light-mode");
      var icon = document.getElementById("theme-icon");
      icon.classList.toggle("fa-sun");
      icon.classList.toggle("fa-moon");
    });
});

//* Text reveal
document.addEventListener('DOMContentLoaded', function() {
  const textContainers = document.querySelectorAll('.text-reveal');

  textContainers.forEach(container => {
    prepareText(container);  // Prepare each container immediately on load
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateText(entry.target);
        observer.unobserve(entry.target);  // Optional: Stop observing after animating
      }
    });
  }, {
    rootMargin: '0px',
    threshold: 0.8 // This triggers the animation when 10% of the element is visible
  });

  textContainers.forEach(container => {
    observer.observe(container);  // Start observing each text container
  });

  function prepareText(container) {
    const phrase = container.textContent.trim();
    container.textContent = ''; // Clear the container
    const words = phrase.split(/\s+/);  // Split phrase into words at one or more whitespace
    const fontSize = window.getComputedStyle(container).fontSize;
    const gapSize = parseFloat(fontSize) / 6;  // Calculate gap size based on font size

    container.style.setProperty('--gap-size', `${gapSize}px`);  // Set the gap size

    words.forEach((word) => {
      let wordContainer = document.createElement('div');
      wordContainer.classList.add('reveal-mask');
      wordContainer.style.overflow = 'hidden';  // Hide overflow to control visibility

      let wordSpan = document.createElement('span');
      wordSpan.classList.add('word');
      wordSpan.textContent = word + ' ';

      wordContainer.appendChild(wordSpan);
      container.appendChild(wordContainer);
    });
  }

  function animateText(container) {
    const wordSpans = container.querySelectorAll('.word');

    const revealDelay = container.getAttribute('reveal-delay') !== null ? parseInt(container.getAttribute('reveal-delay')) : 100;  // Default delay is 200ms, properly handle "0"

    wordSpans.forEach((span, index) => {
      setTimeout(() => {
        span.style.animation = 'reveal 0.6s forwards';  // Apply the reveal animation
      }, revealDelay * index);  // Use custom delay for stagger timing
    });
  }
});
