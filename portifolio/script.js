AOS.init() // Inicia efeitos de transição

const menuBurguer = document.querySelector('#menu-burguer');
const listaOriginal = document.querySelector('#lista'); // Guarda a lista original

const abrirMenu = () => {
    const links = document.querySelectorAll('#lista li');
    const abrirMenuEl = document.getElementById('abrir-menu');

    abrirMenuEl.innerHTML = ''; // Limpa o conteúdo anterior

    if (abrirMenuEl.style.display === 'none' || abrirMenuEl.style.display === '') {
        abrirMenuEl.style.display = 'block'; // Exibe o menu
        links.forEach(link => {
            abrirMenuEl.appendChild(link.cloneNode(true)); // Clona os links em vez de movê-los
        });
    } else {
        abrirMenuEl.style.display = 'none'; // Esconde o menu
        // Os links originais permanecem no #lista, então não precisa restaurar
    }
}

menuBurguer.addEventListener('click', abrirMenu);



const typingEffect = document.getElementById('typingEffect');
const icons = document.getElementById('icons');
const textToTyping = "Hi, I'm Gilson, Front-end Developer.";
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

function typeWritter2(){
    setTimeout(() => {
        icons.style.display = 'flex'; // Exibe os ícones
        buttons.classList.add('show-buttons');

    }, 100);
};

// Iniciar o efeito de digitação ao carregar a página
window.onload = () => {
    typeWritter();
};



