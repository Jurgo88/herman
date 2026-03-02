const sections = document.querySelectorAll('section');
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const container = document.querySelector(".containerHero");

document.addEventListener("DOMContentLoaded", () => {
  const rightTrigger = document.querySelector('.right');
  const leftTrigger = document.querySelector('.left');
  const worksCistky = document.getElementById('works-cistky');
  const worksBazeny = document.getElementById('works-bazeny');
  const servicesHeading = document.querySelector('.services h2');
  const cistkyTabs = document.querySelector('.cistky');
  const bazenyTabs = document.querySelector('.bazeny');

  const showElement = (el) => {
    if (!el) return;
    el.style.display = '';
  };

  const hideElement = (el) => {
    if (!el) return;
    el.style.display = 'none';
  };

  if (rightTrigger) {
    rightTrigger.addEventListener('click', () => {
      console.log('Bottom class element clicked:', rightTrigger);
      bazenyTabs?.classList.add('active');
      cistkyTabs?.classList.remove('active');
      if (servicesHeading) servicesHeading.textContent = 'Ponúkame';
      showSections();
      showElement(worksBazeny);
      hideElement(worksCistky);
      document.getElementById('ourworks')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (leftTrigger) {
    leftTrigger.addEventListener('click', () => {
      console.log('Top class element clicked:', leftTrigger);
      cistkyTabs?.classList.add('active');
      bazenyTabs?.classList.remove('active');
      if (servicesHeading) servicesHeading.textContent = 'Pri práci používame';
      showSections();
      showElement(worksCistky);
      hideElement(worksBazeny);
      document.getElementById('ourworks')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
});

sections.forEach(section => {
  if (!section.classList.contains('hero')) {
    section.style.display = 'none';
  }
});

const cameFromInternalPage = (() => {
  try {
    if (!document.referrer) {
      return false;
    }
    const referrerUrl = new URL(document.referrer);
    return referrerUrl.origin === window.location.origin && referrerUrl.pathname !== window.location.pathname;
  } catch (error) {
    return false;
  }
})();

if (window.location.hash || cameFromInternalPage) {
  showSections();
}

//function to show selections and sitcky-top on click
function showSections() {
  sections.forEach(section => {
    section.style.display = 'block';
  });
  const navbar = document.querySelector('.sticky-top');
  if (navbar) {
    navbar.style.display = 'block';
  }
  const footer = document.querySelector('footer');
  if (footer) {
    footer.style.display = 'block';
  }
}

if (left && right && container) {
  left.addEventListener("mouseenter", () => {
    container.classList.add("hover-left");
  });

  left.addEventListener("mouseleave", () => {
    container.classList.remove("hover-left");
  });

  right.addEventListener("mouseenter", () => {
    container.classList.add("hover-right");
  });

  right.addEventListener("mouseleave", () => {
    container.classList.remove("hover-right");
  });
}

