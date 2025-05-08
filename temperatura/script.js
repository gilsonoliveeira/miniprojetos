const inputValue = document.getElementById('iname');
const button = document.getElementById('button-search');
const climaContainer = document.getElementById('clima');
const loading = document.querySelector('.loading');
const lista = document.getElementById('sugestoes');
const outrosDados = document.querySelector('.outrosDados');
const buttonIniciar = document.querySelector('.button-iniciar');
const telaInicial = document.querySelector('.tela-inicial');
const app = document.querySelector('.app');
const imgBack = document.querySelector('.image-back');
const menuBurguer = document.querySelector('.burguer-menu')
const contact = document.querySelector('.contact')

const date = new Date();
const hora = date.getHours();

// Mapeamento de condições climáticas para animações Lottie
const weatherAnimations = {
  Clear: './assets/sun.json',
  Rain: './assets/rain.json',
  Clouds: './assets/clouds.json',
  Snow: './assets/snow.json',
  Thunderstorm: './assets/thunderstorm.json',
  Drizzle: './assets/Drizzle.json',
  Mist: './assets/clouds.json',
  Fog: './assets/clouds.json',
  Haze: './assets/clouds.json',
  Smoke: './assets/clouds.json',
  Moon: './assets/moon.json',
};

// Alterna da tela inicial para o app
buttonIniciar.addEventListener('click', () => {
  telaInicial.style.display = 'none';
  app.style.display = 'block';
  imgBack.style.display = 'flex';
  buscarClima(cidade = 'São Paulo');
  menuBurguer.style.display = 'none';
  contact.style.display = 'none'
});

// Sugestão de cidades com base no que está sendo digitado
inputValue.addEventListener('input', () => {
  const termo = inputValue.value.trim();
  if (termo.length < 2) {
    lista.innerHTML = '';
    return;
  }

  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${termo}&limit=5&appid=051d67b469bbcd3920c807d2d12ca307`)
    .then(res => res.json())
    .then(dados => {
      lista.innerHTML = '';
      dados.forEach(cidade => {
        const item = document.createElement('li');
        item.textContent = `${cidade.name}, ${cidade.country}`;
        item.addEventListener('click', () => {
          inputValue.value = cidade.name;
          lista.innerHTML = '';
        });
        lista.appendChild(item);
      });
    })
    .catch(err => {
      console.error('Erro ao buscar cidades:', err);
    });
});

// Ação ao clicar no botão "Buscar"
button.addEventListener('click', () => {
  
  const valorDigitado = inputValue.value;
  if (valorDigitado === '') {
    alert('Preencha o campo com a cidade desejada.');
  } else {
    buscarClima(valorDigitado);
  }
});

// Função para buscar clima atual da cidade
function buscarClima(cidade) {
  const apiKey = '051d67b469bbcd3920c807d2d12ca307';
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=1&appid=${apiKey}`;

  // Esconde o conteúdo anterior
  climaContainer.innerHTML = '';
  outrosDados.innerHTML = '';
  imgBack.innerHTML = '';
  imgBack.style.display = 'none';

  // Mostra loading
  loading.innerHTML = `
    <lottie-player 
        src="./assets/loading.json"
        background="transparent" 
        speed="1" 
        style="width: 200px; height: 200px" 
        loop 
        autoplay>
    </lottie-player>
  `;

  // Primeiro: pega a latitude, longitude e estado
  fetch(geoUrl)
    .then(res => {
      if (!res.ok) throw new Error('Erro na geolocalização');
      return res.json();
    })
    .then(local => {
      if (!local.length) throw new Error('Cidade não encontrada');
      const { lat, lon, state, name, country } = local[0];

      // Agora busca o clima com base na latitude e longitude
      const climaUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;

      return fetch(climaUrl).then(res => {
        if (!res.ok) throw new Error('Erro ao buscar clima');
        return res.json().then(dados => ({ dados, state, name, country }));
      });
    })
    .then(({ dados, state, name, country }) => {
      setTimeout(() => {
        const condition = dados.weather[0]?.main || 'Clear';
        let animationUrl = weatherAnimations[condition] || './assets/clouds.json';

        if (hora >= 18 || hora < 6) {
            animationUrl ='./assets/moon.json';
          }


        imgBack.style.display = 'flex';
        imgBack.innerHTML = `
          <lottie-player 
            src="${animationUrl}" 
            background="transparent" 
            speed="1" 
            style="width: 180px; height: 180px;" 
            loop 
            autoplay>
          </lottie-player>
        `;

        climaContainer.innerHTML = `<p>${dados.main.temp.toFixed(0)}°C</p>`;
        loading.innerHTML = `${name} - ${state}, <br> ${country}`;
        outrosDados.innerHTML = `
          <p>☁️ Clima: <br>${dados.weather[0].description}</p>
          <p>💧 Umidade: <br>${dados.main.humidity}%</p>
          <p>💨 Vento: <br>${dados.wind.speed} km/h</p>
        `;
      }, 1500);
    })
    .catch(erro => {
      console.error('Erro ao buscar clima:', erro);
      loading.innerText = 'Cidade não encontrada!';
      imgBack.style.display = 'flex';
      imgBack.innerHTML = `<img src="https://openweathermap.org/img/wn/01d@2x.png" alt="Fallback" style="width: 180px; height: 180px;">`;
    });
}