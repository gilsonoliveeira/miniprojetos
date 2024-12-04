const hamburguer = document.getElementById("menu-responsive");
const nav = document.getElementById("nav-bar");
const menuOptions = document.querySelectorAll("#nav-bar a")
const navList = document.getElementById("nav-list")

hamburguer.addEventListener("click", () =>
    nav.classList.toggle("active")

);

menuOptions.forEach(option => { 
    option.addEventListener("click", () => { 
        nav.classList.remove("active");
    
    });
});