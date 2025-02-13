let players = ["Jugador 1", "Jugador 2", "Jugador 3", "Jugador 4"];
        let currentPlayerIndex = 0;
        let usedWords = new Set();
        let scores = [0, 0, 0, 0];
        let randomLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 26));
        let timer;
        let timeLeft = 60;
        
        document.getElementById("random-letter").textContent = randomLetter;
        document.getElementById("current-player").textContent = players[currentPlayerIndex];
        
        function startTimer() {
            timeLeft = 60;
            document.getElementById("timer").textContent = timeLeft;
            timer = setInterval(() => {
                timeLeft--;
                document.getElementById("timer").textContent = timeLeft;
                if (timeLeft <= 0) {
                    nextTurn();
                }
            }, 1000);
        }
        startTimer();
        
        function submitWord() {
            let input = document.getElementById("word-input").value.trim().toUpperCase();
            if (input && input.startsWith(randomLetter) && !usedWords.has(input)) {
                usedWords.add(input);
                scores[currentPlayerIndex]++;
                let listItem = document.createElement("li");
                listItem.textContent = input;
                document.getElementById("word-list").appendChild(listItem);
                document.getElementById("word-input").value = "";
            }
        }
        
        function nextTurn() {
            clearInterval(timer);
            if (currentPlayerIndex === players.length - 1) {
                declareWinner();
            } else {
                currentPlayerIndex++;
                document.getElementById("current-player").textContent = players[currentPlayerIndex];
                startTimer();
            }
        }
        
        function declareWinner() {
            let maxScore = Math.max(...scores);
            let winnerIndex = scores.indexOf(maxScore);
            document.getElementById("winner").textContent = `¡Juego terminado! Ganador: ${players[winnerIndex]} con ${maxScore} palabras.`;
        }