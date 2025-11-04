export function stickyNavbar() {
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