

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "❤️";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  heart.style.fontSize = Math.random() * 20 + 10 + "px";

  // container fixo fora do conteúdo
  document.getElementById("heart-container").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 200);

const submitButton = document.querySelector(".submit");

function countdown() {
  const countNewDate = new Date("2012-08-15T00:00:00Z");
  const now = new Date();
  const diff = now - countNewDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML =
    days +
    " dias " +
    hours +
    " horas " +
    minutes +
    " minutos " +
    seconds +
    " segundos ";
}

countdown();

setInterval(countdown, 1000);

function carregaImagem() {
  const images = [
    "images/image1.jpg",
    "images/image2.jpg",
    "images/image3.jpg",
    "images/image4.jpg",
    "images/image5.jpg",
    "images/image6.jpg"
  ];

  const imageDiv = document.querySelector(".image");

  function trocarImagem() {
    const randomIndex = Math.floor(Math.random() * images.length);
    imageDiv.innerHTML = `<img src="${images[randomIndex]}" alt="imagem" style="width: 400px; height: 500px; border-radius: 10px;">`;
  }

  trocarImagem(); // Exibe uma imediatamente
  setInterval(trocarImagem, 3000); // 
}

carregaImagem();


