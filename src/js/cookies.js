document.addEventListener("DOMContentLoaded", () => {
    const cookiesPopup = document.getElementById("cookiesPopup");
    const acceptCookiesButton = document.getElementById("acceptCookies");

    // Check if cookies have already been accepted
    if (!localStorage.getItem("cookiesAccepted")) {
        cookiesPopup.style.display = "flex";
    }

    // Handle the "Accept" button click
    acceptCookiesButton.addEventListener("click", () => {
        localStorage.setItem("cookiesAccepted", "true");
        cookiesPopup.style.display = "none";
    });
});
