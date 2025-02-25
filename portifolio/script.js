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



const typingEffect = document.getElementById('typingEffect');
const typingEffect2 = document.getElementById('typingEffect2');
const textToTyping = "Hi, I'm Gilson, Front-end Developer.";
const textToTyping2 = "Html / CSS / JavaScript";
const buttons = document.querySelector('.buttons');
let index1 = 0;
let index2 = 0;

function typeWritter() {
    // Digitar o primeiro texto
    if(index1 < textToTyping.length){
        typingEffect.innerHTML += textToTyping.charAt(index1);
        index1++;
        setTimeout(typeWritter, 50); // Continua a digitação do primeiro texto
    }
    else {
        // Quando o primeiro texto acabar, chama a função para o segundo texto
        setTimeout(typeWritter2, 300);  // Dê um pequeno delay antes de começar o segundo texto
    }
}

function typeWritter2() {
    // Digitar o segundo texto
    if(index2 < textToTyping2.length) {
        typingEffect2.innerHTML += textToTyping2.charAt(index2);
        index2++;
        setTimeout(typeWritter2, 50); // Continua a digitação do segundo texto
    }
    else{
        setTimeout(() => {
            buttons.classList.add('show-buttons')
        }, 300);

    }   
}

// Iniciar o efeito de digitação ao carregar a página
window.onload = () => {
    typeWritter();
};
