export function navbar() {
  console.log("stickyNavbar loaded");
  document.addEventListener("scroll", function() {
  const navbar = document.querySelector(".sticky-top");
  const scrollThreshold = 150;
  const buffer = 30; 
  if (window.scrollY > scrollThreshold + buffer) {
      navbar.classList.add("scrolled");
  } else if (window.scrollY < scrollThreshold - buffer) {
      navbar.classList.remove("scrolled");
  }
});
}

// Kód na automatické zatvorenie Offcanvasu po kliknutí na nav-link
document.querySelectorAll('#offcanvasNavbar .nav-link').forEach(link => {
  link.addEventListener('click', () => {
      // Získa inštanciu Offcanvasu pomocou ID
      const offcanvasElement = document.getElementById('offcanvasNavbar');
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
      
      // Ak Offcanvas existuje a je otvorený, zatvorí ho
      if (offcanvas) {
          offcanvas.hide();
      }
  });
});

navbar();

