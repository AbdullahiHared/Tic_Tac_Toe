const GameBoard = () => {
    const board = [];
    const rows = 3;
    const columns = 3;

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = "";
        }
    }

    return board;
};

const informAboutBoard = () => {
    console.log("Choose the numbers between 0-8");
};

const GamePlayers = () => {
    const players = [
        {
            name: prompt("Player One, what is your name"),
            marker: "X"
        },
        {
            name: prompt("Player Two, what is your name"),
            marker: "O"
        }
    ];

    return players;
};

const GameController = () => {
    const board = GameBoard(); // Set the board variable
    const players = GamePlayers();
    let activePlayerIndex = 0; // Index of the active player in the players array

    const switchPlayer = () => {
        activePlayerIndex = activePlayerIndex === 0 ? 1 : 0; // Switch active player index
    };

    const playRound = (row, column) => {
        informAboutBoard();

        if (!isNaN(row) && !isNaN(column)) {
            if (board[row][column] === "") {
                board[row][column] = players[activePlayerIndex].marker;
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
                console.log("Invalid move. Cell already taken.");
            }
        } else {
            console.log("Invalid input. Please enter valid row and column numbers.");
        }
        return false; // Game continues
    };

    const fullBoard = () => {
        for (let row of board) {
            if (row.includes("")) {
                return false; // There's still an empty cell
            }
        }
        return true; // All cells are filled
    };

    const checkWinner = (marker) => {
        // Winning combinations
        const winningCombinations = [
            [[0, 0], [0, 1], [0, 2]], // Horizontal
            [[1, 0], [1, 1], [1, 2]], // Horizontal
            [[2, 0], [2, 1], [2, 2]], // Horizontal
            [[0, 0], [1, 0], [2, 0]], // Vertical
            [[0, 1], [1, 1], [2, 1]], // Vertical
            [[0, 2], [1, 2], [2, 2]], // Vertical
            [[0, 0], [1, 1], [2, 2]], // Diagonal
            [[0, 2], [1, 1], [2, 0]]  // Diagonal
        ];

        // Check each winning combination
        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a[0]][a[1]] === marker &&
                board[b[0]][b[1]] === marker &&
                board[c[0]][c[1]] === marker) {
                return true; // If a winning combination is found, return true
            }
        }
        return false; // If no winning combination is found, return false
    };

    // Return active player's name
    const getActivePlayer = () => {
        const activePlayerName = players[activePlayerIndex].name;
        const activePlayerMarker = players[activePlayerIndex].marker;
        return {activePlayerName, activePlayerMarker};
    };

    return {playRound, getActivePlayer, board}; // Return the board property
};


const ScreenController = () => {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        // Clear the board
        boardDiv.innerHTML = "";

        // Get the newest version of the board and player turn
        const activePlayer = game.getActivePlayer();

        // Display player's turn
        playerTurnDiv.textContent = `${activePlayer.activePlayerName}'s turn...`;

        // Render the game board
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                // Create a button for each cell
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.textContent = game.board[i][j]; // Set the text content of the cell button to the marker in the board array

                // Attach a click event handler to each cell button
                cellButton.addEventListener("click", () => {
                    if (cellButton.textContent === '') { // Check if the cell is empty
                        cellButton.textContent = activePlayer.activePlayerMarker; // Set the marker of the active player
                        // Call playRound function with the clicked cell index
                        game.playRound(i, j);
                        // Update the screen after the round
                        updateScreen();
                    }
                });

                // Append the cell button to the board container
                boardDiv.appendChild(cellButton);
            }
            // Add a line break after each row
            const br = document.createElement("br");
            boardDiv.appendChild(br);
        }
    };

    // Initial screen update
    updateScreen();
};

// Call ScreenController to start the game
ScreenController();
