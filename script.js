// Variables globales
let numPlayers; 
let players = []; 
let currentPlayerIndex = 0; 
let timer; 
let timeLeft = 60;

// 🔹 Elementos del DOM
const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const resultsScreen = document.getElementById("resultsScreen");
const numPlayersInput = document.getElementById("numPlayers");
const playerTurn = document.getElementById("playerTurn");
const currentLetterDisplay = document.getElementById("currentLetter");
const wordInput = document.getElementById("wordInput");
const wordList = document.getElementById("wordList");
const timerDisplay = document.getElementById("timer");
const winnerDisplay = document.getElementById("winnerDisplay");
const otherPlayersDisplay = document.getElementById("otherPlayers");

// 🔹 Función para iniciar el juego
function startGame() {
    numPlayers = parseInt(numPlayersInput.value); // Obtener el número de jugadores

    if (numPlayers < 2 || numPlayers > 4) {
        alert("Por favor, selecciona entre 2 y 4 jugadores.");
        return;
    }

    // Inicializa los jugadores
    players = Array.from({ length: numPlayers }, (_, i) => ({
        name: `Jugador ${i + 1}`,
        words: new Set(), 
    }));

    // Ocultar pantalla de inicio y mostrar pantalla de juego
    startScreen.style.display = "none";
    gameScreen.style.display = "block";

    startTurn();
}

// 🔹 Función para generar una letra aleatoria
function getRandomLetter() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return letters[Math.floor(Math.random() * letters.length)];
}

// 🔹 Función para iniciar el turno de un jugador
function startTurn() {
    // Obtener jugador actual
    const player = players[currentPlayerIndex];

    // Generar nueva letra aleatoria
    currentLetter = getRandomLetter();
    
    // Actualizar la UI
    playerTurn.textContent = `${player.name}, es tu turno`;
    currentLetterDisplay.textContent = currentLetter;
    wordList.innerHTML = ""; // Limpiar lista de palabras anteriores
    wordInput.value = ""; // Limpiar el input
    wordInput.focus(); // Enfocar en el campo de entrada
    timeLeft = 60; // Reiniciar tiempo
    updateTimer(); // Mostrar el temporizador

    // Iniciar el temporizador
    timer = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            endTurn();
        }
    }, 1000);
}

// 🔹 Función para actualizar la UI del temporizador
function updateTimer() {
    timerDisplay.textContent = timeLeft;
}

// 🔹 Función para agregar palabras al jugador actual
function submitWord() {
    const word = wordInput.value.trim().toUpperCase(); // Obtener la palabra en mayúsculas

    // Validaciones
    if (!word) {
        return alert("Debes ingresar una palabra.");
    }
    if (!word.startsWith(currentLetter)) {
        return alert(`La palabra debe comenzar con "${currentLetter}".`);
    }
    if (players[currentPlayerIndex].words.has(word)) {
        return alert("Esa palabra ya fue ingresada.");
    }

    // Agregar palabra al conjunto del jugador
    players[currentPlayerIndex].words.add(word);

    // Agregar palabra a la UI
    const li = document.createElement("li");
    li.textContent = word;
    wordList.appendChild(li);

    // Limpiar input
    wordInput.value = "";
    wordInput.focus();
}

// 🔹 Permitir ingreso con la tecla Enter
wordInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        submitWord();
    }
});

// 🔹 Función para terminar el turno del jugador actual
function endTurn() {
    clearInterval(timer);
    // Pasar al siguiente jugador
    currentPlayerIndex++;

    if (currentPlayerIndex < players.length) {
        startTurn(); 
    } else {
        showResults(); 
    }
}

// 🔹 Función para mostrar los resultados
function showResults() {
    gameScreen.style.display = "none";
    resultsScreen.style.display = "block";

    // Ordenar jugadores por cantidad de palabras ingresadas
    players.sort((a, b) => b.words.size - a.words.size);

    // Mostrar el ganador
    const winner = players[0];
    winnerDisplay.innerHTML = `<span style="font-size: 32px; color: gold;">🏆 ${winner.name}: ${winner.words.size} palabras</span>`;
    
    // Mostrar los otros jugadores
    otherPlayersDisplay.innerHTML = players
        .slice(1) 
        .map(player => `<p><strong>${player.name}:</strong> ${player.words.size} palabras</p>
                        <p class="playerWords">${Array.from(player.words).join(", ")}</p>`)
        .join("");

    // Agregar botón para volver a jugar
    const restartButton = document.createElement("button");
    restartButton.textContent = "Volver a jugar";
    restartButton.onclick = restartGame;
    resultsScreen.appendChild(restartButton);
}

// 🔹 Función para reiniciar el juego
function restartGame() {
    currentPlayerIndex = 0;
    players = [];
    
    // Volver a la pantalla de inicio
    resultsScreen.style.display = "none";
    startScreen.style.display = "block";
}


