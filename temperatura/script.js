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

// Mapeamento de condições climáticas para animações Lottie
const weatherAnimations = {
  Clear: './assets/sun.json',
  Rain: './assets/rain.json',
  Clouds: './assets/clouds.json',
  Snow: './assets/clouds.json',
  Thunderstorm: './assets/rain.json',
  Drizzle: './assets/rain.json',
  Mist: './assets/clouds.json',
  Fog: './assets/clouds.json',
  Haze: './assets/clouds.json',
  Smoke: './assets/clouds.json',
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
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;
  loading.innerHTML = `
    <lottie-player 
        src="./assets/loading.json"
        background="transparent" 
        speed="1" 
        style="width: 200px; height: 200px" 
        loop 
        autoplay
        onerror="this.innerHTML='<p>Erro: Animação de loading não carregada. Verifique assets/loading.json.</p>'">
    </lottie-player>
`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
      return response.json();
    })
    .then(dados => {
      setTimeout(() => {
        console.log('Dados da API:', dados);
        console.log('Condição climática:', dados.weather[0]?.main);
        const condition = dados.weather[0]?.main || 'Clear';
        const animationUrl = weatherAnimations[condition] || './assets/clouds.json';
        console.log('URL da animação:', animationUrl);

        // Tenta carregar a animação Lottie
        imgBack.style.display = 'flex';
        imgBack.innerHTML = `
          <lottie-player 
            src="${animationUrl}" 
            background="transparent" 
            speed="1" 
            style="width: 180px; height: 180px;" 
            loop 
            autoplay
            onerror="this.innerHTML='<img src=https://openweathermap.org/img/wn/01d@2x.png alt=Fallback style=width:180px;height:180px;>'">
          </lottie-player>
        `;

        climaContainer.innerHTML = `<p>${dados.main.temp.toFixed(0)} °C</p>`;
        loading.innerHTML = `${cidade}`;
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