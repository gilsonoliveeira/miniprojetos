const menuBurguer = document.querySelector('#menu-burguer');

const abrirMenu = () => {
    const links = document.querySelectorAll('#lista li');
    const abrirMenu = document.getElementById('abrir-menu');

    abrirMenu.innerHTML = ''; 


    if (abrirMenu.style.display === 'none' || abrirMenu.style.display === '') {
        abrirMenu.style.display = 'block'; // Exibe o menu
    } else {
        abrirMenu.style.display = 'none'; // Esconde o menu
    }


    links.forEach(link => {
        abrirMenu.appendChild(link); // Move cada link para dentro da div 'abrir-menu'
    });

    abrirMenu();

    
}

menuBurguer.addEventListener('click',abrirMenu);