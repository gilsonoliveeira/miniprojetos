const inputValue = document.getElementById('iname');
const button = document.getElementById('button-search');
const resultSearch = document.getElementById('resultSearch')
const icons = document.querySelector('.icons');
const climaContainer = document.getElementById('clima');
icons.style.display = 'none';

function click() {
  const valorDigitado = inputValue.value;
  if(typeof valorDigitado === 'number' || valorDigitado === ''){
    alert('Preencha o campo com a cidade desejada.')
  }
  else{
    buscarClima(valorDigitado);

  }
}

button.addEventListener('click', click);

function buscarClima(cidade) {
  const apiKey = '051d67b469bbcd3920c807d2d12ca307';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;
  climaContainer.innerHTML = '<p>🔄 Carregando dados do clima...</p>';


  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Erro na API');
      return response.json();
    })
    .then(dados => {
      setTimeout(() => {

        const climaHTML = `
          <p>🌡️ Temperatura: <br> ${dados.main.temp}°C</p>
          <p>☁️ Clima: <br>${dados.weather[0].description}</p>
          <p>💧 Umidade: <br>${dados.main.humidity}%</p>
          <p>💨 Vento: <br>${dados.wind.speed} km/h</p>
        `;
        climaContainer.innerHTML = climaHTML;
        icons.style.display = 'grid';
      }, 1200); 
    })
    .catch(erro => {
      climaContainer.innerText = 'Cidade não encontrada!';
      console.error(erro);
    });
}

