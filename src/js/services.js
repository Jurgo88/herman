console.log("services.js loaded");

document.onload = function () {
    console.log("Page loaded");
    // Získanie všetkých elementov s triedou "card"
    const cards = document.querySelectorAll(".card");

    // Pre každý element s triedou "card" pridať event listener
    cards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
            this.classList.add("hovered");
            console.log("Card hovered:", this);
        });
        card.addEventListener("mouseleave", function () {
            this.classList.remove("hovered");
            console.log("Card unhovered:", this);
        });
    });
};
// Pridanie hover efektu na všetky karty
$(".card").hover(
    function () {
        $(this).addClass("hovered");
        $(this).parent().find(".service-info").addClass("hovered");
        console.log("Card hovered:", this);
    },
    function () {
        $(this).removeClass("hovered");
        $(this).parent().find(".service-info").removeClass("hovered");
        console.log("Card unhovered:", this);
    }
);
// Pridanie hover efektu na obsah a obrázok karty
$(".card").hover(
    function () {
        $(this).find(".service-info").addClass("hovered");
        $(this).find(".card__image").addClass("card__image--hovered");
    },
    function () {
        $(this).find("service-info").removeClass("hovered");
        $(this).find(".card__image").removeClass("card__image--hovered");
    }
);


