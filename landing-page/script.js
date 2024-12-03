let menuToggle = document.getElementById("menu-responsive");
let navLinks = document.getElementById("nav-bar");
let mainContent = document.querySelector("main"); // Seleciona o conteúdo principal

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("nav-active");
    mainContent.classList.toggle("menu-active");
});