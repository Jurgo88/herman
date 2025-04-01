console.log("Script loaded");

// Univerzálna funkcia na rozšírenie sekcie pri hoveri
function applyHoverEffect(triggerSelector, targetSelector) {
    const triggerElement = document.querySelector(triggerSelector);
    const targetElement = document.querySelector(targetSelector);

    if (triggerElement && targetElement) {
        triggerElement.addEventListener("mouseenter", () => {
            targetElement.classList.add("expanded");
            console.log(`Hover started: ${targetSelector}`);
        });

        triggerElement.addEventListener("mouseleave", () => {
            targetElement.classList.remove("expanded");
            console.log(`Hover ended: ${targetSelector}`);
        });
    }
}

// Použitie funkcie pre ľavú aj pravú stranu
applyHoverEffect(".left span", ".left");
applyHoverEffect(".right span", ".right");
