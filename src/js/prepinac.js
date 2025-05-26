$(document).ready(function() {
    $('.right').on('click', function(event) {
        // Your code here
        console.log('Bottom class element clicked:', this);
        // Prevent default action if needed
        // event.preventDefault();
        // Add your custom logic here
        // For example, you can toggle a class or perform an action
        $('.bazeny').addClass('active');
        $('.cistky').removeClass('active');
        $('.services h2').text('Ponúkame');
    });
    $('.left').on('click', function(event) {
        // Your code here
        console.log('Top class element clicked:', this);
        // Prevent default action if needed
        // event.preventDefault();
        // Add your custom logic here
        // For example, you can toggle a class or perform an action
        $('.cistky').addClass('active');
        $('.bazeny').removeClass('active');
        $('.services h2').text('Pri práci používame');
    });
});

const left = document.querySelector(".left");
const right = document.querySelector(".right");
const container = document.querySelector(".containerHero");

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

