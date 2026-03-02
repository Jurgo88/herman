const servicesSection = document.querySelector(".services");

function toggleColumnHover(column, isHovered) {
    if (isHovered) {
        column.classList.add("is-hovered");
    } else {
        column.classList.remove("is-hovered");
    }
}

function setupServiceHover() {
    if (!servicesSection) {
        return;
    }

    const columns = servicesSection.querySelectorAll(".row > [class*='col-']");
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    columns.forEach((column) => {
        if (isTouch) {
            toggleColumnHover(column, true);
            return;
        }

        column.addEventListener("mouseenter", () => toggleColumnHover(column, true));
        column.addEventListener("mouseleave", () => toggleColumnHover(column, false));
        column.addEventListener("focusin", () => toggleColumnHover(column, true));
        column.addEventListener("focusout", () => toggleColumnHover(column, false));
    });
}

document.addEventListener("DOMContentLoaded", setupServiceHover);


