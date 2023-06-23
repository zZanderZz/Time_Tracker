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
            minutes = Math.floor(timer / 60);
            seconds = timer % 60;
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

// Função para controlar o evento de clique no ícone
function toggleCollapse(event) {
    event.preventDefault(); // Impede o comportamento padrão do link
    // Obtém a div recolhível correspondente
    var collapsibleDiv = event.target.parentNode.parentNode.nextElementSibling;
    
    // Alterna a exibição da div recolhível
    if (collapsibleDiv.style.display === 'none') {
        collapsibleDiv.style.display = 'block';
        event.target.textContent = "expand_less";
    } else {
        collapsibleDiv.style.display = 'none';
        event.target.textContent = "chevron_right";
    }
}

// Obtém todos os ícones de colapso
var collapseIcons = document.getElementsByClassName('expand-icon');

// Adiciona um ouvinte de eventos de clique a cada ícone
for (var i = 0; i < collapseIcons.length; i++) {
    collapseIcons[i].addEventListener('click', toggleCollapse);
}

// Função para adicionar uma nova tarefa
function adicionarTarefa() {
    // Obtém a div "Tarefa" existente
    var tarefaExistente = document.querySelector(".Tarefas");

    // Clona a div "Tarefa"
    var novaTarefa = tarefaExistente.cloneNode(true);

    // Obtém o número da última tarefa
    var numeroUltimaTarefa = document.querySelectorAll(".Tarefas").length;

    // Atualiza o número da nova tarefa
    novaTarefa.querySelector("h4").textContent = "Tarefa " + (numeroUltimaTarefa + 1);

    // Adiciona a nova tarefa à lista de tarefas
    var listaTarefas = document.querySelector(".AddTarefa");
    listaTarefas.appendChild(novaTarefa);

    // Adiciona um ouvinte de eventos de clique ao ícone de colapso da nova tarefa
    var collapseIcon = novaTarefa.querySelector('.expand-icon');
    collapseIcon.addEventListener('click', toggleCollapse);

    // Se já houver uma tarefa existente, adiciona o ouvinte de eventos ao ícone de colapso da primeira tarefa também
    if (numeroUltimaTarefa === 0) {
        var firstTaskCollapseIcon = tarefaExistente.querySelector('.expand-icon');
        firstTaskCollapseIcon.addEventListener('click', toggleCollapse);
    }
}

function salvarTarefa(elemento) {
    // Exibir o alerta de sucesso com o SweetAlert2
    Swal.fire({
        title: 'Você quer salvar as alterações?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Salvar',
        denyButtonText: `Descartar`,
        cancelButtonText: "Cancelar",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Salvo com sucesso!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Alterações descartadas.', '', 'error')
        }
      });
    
    // Recolher a tarefa
    toggleCollapse({
      target: elemento.querySelector('.expand-icon')
    });
  }
  