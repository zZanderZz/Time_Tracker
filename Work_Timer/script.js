const startButton = document.getElementById('startTimerButton');
const resetButton = document.getElementById('resetTimerButton');
const timeInput = document.getElementById('timeInput');
const display = document.getElementById('timerDisplay');
let timerInterval;
let isTimerActive = false;

// Função para iniciar o cronômetro com o tempo digitado
function startTimer(event) {
    if (event.key && event.key !== 'Enter') return; // Verifica se a tecla pressionada é "Enter"

    const time = parseFloat(timeInput.value); // Obtém o tempo digitado como um número decimal

    if (!isNaN(time) && time > 0) {
        const duration = time * 60 * 60; // Converte o tempo para segundos
        let timer = duration, minutes, seconds;
        clearInterval(timerInterval); // Limpa qualquer intervalo de timer existente

        // Função de atualização do cronômetro
        function updateTimer() {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = minutes + ":" + seconds;

            if (--timer < 0) {
                clearInterval(timerInterval); // Interrompe o cronômetro quando o tempo acabar
            }
        }

        // Inicia o cronômetro
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
        isTimerActive = true;
    }
}

// Função para zerar o cronômetro e redefinir o campo de tempo
function resetTimer() {
    clearInterval(timerInterval);
    display.textContent = '00:00';
    timeInput.value = '';
    isTimerActive = false;
}

// Adiciona ouvintes de eventos para os botões
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
timeInput.addEventListener('keyup', startTimer); // Ouve o evento de pressionar tecla no campo de tempo

