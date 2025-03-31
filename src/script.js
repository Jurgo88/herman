import gsap from "gsap";

document.querySelectorAll(".section").forEach((section) => {
    section.addEventListener("mouseenter", () => {
        gsap.to(".section", { duration: 0.5, clipPath: "none", width: "100%", height: "100%" });
        section.style.zIndex = "2";
    });
    section.addEventListener("mouseleave", () => {
        gsap.to(".section", { duration: 0.5, clipPath: "", width: "", height: "" });
    });
    section.addEventListener("click", () => {
        section.querySelector(".hidden-text").style.display = "block";
    });
});
