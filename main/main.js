const GameBoard = () => {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows * columns; i++) {
        board.push([]); // Push an empty array for each cell
    }

    return board;
}

const informAboutBoard = () => {
    console.log("Choose the numbers between 0-8");
};

const GamePlayers = () => {
    const players = [
        {
            name: prompt("Player One what is your name"),
            marker: "X"
        },
        {
            name: prompt("Player Two what is your name"),
            marker: "O"
        }
    ];

    return players;
};

const GameControll = () => {
    const board = GameBoard();
    const players = GamePlayers();
    let activePlayerIndex = 0; // Index of the active player in the players array

    const switchPlayer = () => {
        activePlayerIndex = activePlayerIndex === 0 ? 1 : 0; // Switch active player index
    };

    const playRound = () => {
        informAboutBoard();
        const playerPosition = parseInt(prompt(`${players[activePlayerIndex].name}, choose your position`));

        if (!isNaN(playerPosition)) {
            board[playerPosition].push(players[activePlayerIndex].marker);
            console.log(board);

            // Check for a winner after each round
            if (checkWinner(players[activePlayerIndex].marker)) {
                console.log(`${players[activePlayerIndex].name} is the winner!`);
                console.log(board);
                return true; // End the game
            }
            if (fullBoard()) {
                console.log("It's a draw!");
                console.log(board);
                return true; // End the game
            }

            switchPlayer(); // Switch to the next player
        } else {
            console.log("Invalid input. Please enter a number between 0-8.");
        }
        return false; // Game continues
    };

    const fullBoard = () => {
        return board.every(cell => cell.length > 0); // Check if all cells are filled
    };

    const checkWinner = (marker) => {
        // Winning combinations
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
            [0, 4, 8], [2, 4, 6] // Diagonal
        ];

        // Check each winning combination
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a].includes(marker) && board[b].includes(marker) && board[c].includes(marker)) {
                return true; // If a winning combination is found, return true
            }
        }
        return false; // If no winning combination is found, return false
    };

    // Return active player's name
    const getActivePlayerName = () => {
        return players[activePlayerIndex].name;
    };

    return { playRound, getActivePlayerName, board };
};

const ScreenController = () => {
    const game = GameControll();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        // Clear the board
        boardDiv.innerHTML = "";

        // Get the newest version of the board and player turn
        const board = game.board;
        const activePlayer = game.getActivePlayerName();

        // Display player's turn
        playerTurnDiv.textContent = `${activePlayer}'s turn...`;

        // Render the game board
        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                // Create a button for each cell
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.textContent = cell; // Assuming cell is already a string ('X' or 'O')

                // Attach a click event handler to each cell button
                cellButton.addEventListener("click", () => {
                    // Call playRound function with the clicked column index
                    game.playRound(rowIndex, columnIndex);
                    // Update the screen after the round
                    updateScreen();
                });

                // Append the cell button to the board container
                boardDiv.appendChild(cellButton);
            });
            // Add a line break after each row
            const br = document.createElement("br");
            boardDiv.appendChild(br);
        });
    };

    // Initial screen update
    updateScreen();
};


ScreenController();

