const inputValue = document.getElementById('iname');
const button = document.getElementById('button-search');
const climaContainer = document.getElementById('clima');
const loading = document.querySelector('.loading');
const lista = document.getElementById('sugestoes');
const outrosDados = document.querySelector('.outrosDados');
const buttonIniciar = document.querySelector('.button-iniciar');
const telaInicial = document.querySelector('.tela-inicial');
const app = document.querySelector('.app');
const imgBack = document.querySelector('.image-back')

// Alterna da tela inicial para o app
buttonIniciar.addEventListener('click', () => {
  telaInicial.style.display = 'none';
  app.style.display = 'block';
  imgBack.style.display = 'none';
  buscarClima(cidade = 'São Paulo');

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
     <dotlottie-player 
    src="https://lottie.host/d3e7ce05-cae4-4a8f-a91d-b111979297bd/49ryBrVMb9.lottie"
    background="transparent" speed="1" style="width: 100px; height: 100px" loop autoplay>
  </dotlottie-player>
  `

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Erro na API');
      return response.json();
    })
    .then(dados => {
      setTimeout(() => {
        imgBack.style.display = 'flex';
        climaContainer.innerHTML = `<p>${dados.main.temp} °C</p>`;
        loading.innerHTML = `${cidade}`;
        outrosDados.innerHTML = `
          <p>☁️ Clima: <br>${dados.weather[0].description}</p>
          <p>💧 Umidade: <br>${dados.main.humidity}%</p>
          <p>💨 Vento: <br>${dados.wind.speed} km/h</p>
        `;
      }, 1500);
    })
    .catch(erro => {
      loading.innerText = 'Cidade não encontrada!';
      console.error(erro);
    });
}
