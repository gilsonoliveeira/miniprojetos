let milisegundos = 0
let timer
let isrunning = false


function formatoTimer(milisegundos) {
    const horas = Math.floor(milisegundos / 3600000)
    const minutos = Math.floor((milisegundos % 3600000) / 60000)
    const segundos = Math.floor((milisegundos % 60000) / 1000)
    const milis = Math.floor((milisegundos % 1000) / 10) 


    return `${horas.toString().padStart(2, '0')}: ${minutos.toString().padStart(2, '0')}: ${segundos.toString().padStart(2, '0')}: ${milis.toString().padStart(2,'0')}`

}



function updateDisplay() {
    document.getElementById('display').innerText = formatoTimer(milisegundos)

}


function start() {
    if (!isrunning) {
        isrunning = true
        document.getElementById('start').disabled = true

        timer = setInterval(() => {
            milisegundos += 10
            updateDisplay()
        }, 10)
    }
}

function pause() {
    isrunning = false
    clearInterval(timer)
    document.getElementById('start').disabled = false
    
}

function reset() {
    isrunning = false
    clearInterval(timer)
    milisegundos = 0
    updateDisplay()
    document.getElementById('start').disabled = false

}

document.getElementById('start').addEventListener('click', start)
document.getElementById('stop').addEventListener('click', pause)
document.getElementById('reset').addEventListener('click', reset)