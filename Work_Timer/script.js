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

// --------------------------------

//VARIABLES ////

const listaTareas = document.querySelector('#lista-tareas') 

//EVENTOS////

eventListeners();

function eventListeners () {

    // Enviar Formulario
    document.querySelector('#formulario').addEventListener('submit',agregarTarea);

    // Borrar tareas
    listaTareas.addEventListener('click', borrarTarea);

    // Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}


//FUNCIONES ////

//añadir tarea del formulario
function agregarTarea (e) {
    e.preventDefault();

    //leer el valor de textTarea
    const tarea = document.querySelector('#tarea').value;

    visualizarTarea(tarea);

    //Añadir a Local Storage
    agregarTareaLocalStorage(tarea);

    //reset del textarea 
    formulario.reset()
}
//Ver los tareas 
function visualizarTarea (tarea){
    // Crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tarea';
    botonBorrar.innerText = 'X';
    
    //crear elemento y añadir el contenido a la lista
    const li = document.createElement('li');
    li.classList = 'lista-tarea';
    li.innerText = tarea;
    // añade el boton borrar al tarea
    li.appendChild(botonBorrar);
    // añade el tarea a la lista
    listaTareas.appendChild(li);
}

// Borra el tarea del DOM
function borrarTarea (e) {
    e.preventDefault();
    if(e.target.className === 'borrar-tarea'){
        e.target.parentElement.remove();
        borrarTareaLocalStorage(e.target.parentElement.textContent);
    }
}

// Mostrar datos de local storage en la lista
function localStorageListo(){
    let tareas;

    tareas = obtenerTareasLocalStorage();

    tareas.forEach(function(tarea){
        visualizarTarea(tarea);
    });
}



// Agrega tareas a local storage
function agregarTareaLocalStorage (tarea){
    let tareas;
    tareas = obtenerTareasLocalStorage();
    //añadir el nuevo tarea
    tareas.push(tarea);
    //convertir de string a arreglo para local storage
    localStorage.setItem('tareas', JSON.stringify(tareas) );
 }

 // comprobar que haya elementos en local storage, retorna en un arreglo
function obtenerTareasLocalStorage () {
     let tareas;
     //revisamos los valores de local storage
     if(localStorage.getItem('tareas') === null) {
        tareas = [];
     } else {
        tareas = JSON.parse(localStorage.getItem('tareas') );
     }
     return tareas;
 }

 //Eliminar tarea de local storage
function borrarTareaLocalStorage (tarea) {
    let tareas, tareaBorrar;
    // Elimina la X del tarea
    tareaBorrar = tarea.substring(0, tarea.length - 1);

    tareas = obtenerTareasLocalStorage();

    tareas.forEach(function(tarea, index){
        if(tareaBorrar === tarea){
            tareas.splice(index, 1);
        }
    }) ;
    localStorage.setItem('tareas', JSON.stringify(tareas));
 }



