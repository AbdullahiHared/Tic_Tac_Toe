const GameBoard = () => {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows * columns; i++) {
        board.push([]); // Push an empty array for each cell
    }

    return board;
}


const informAboutBoard = () => {console.log("Choose the numbers between 0-8")};

const GamePlayers = () => {
    const players = [
        {
            name : prompt("Player One what is your name"),
            marker : "X"
        },
        {
            name : prompt("Player Two what is your name"),
            marker : "O"
        }
    ];

    const getPlayers = () => players;

    return getPlayers();
}

const GameControll = () => {
    const board = GameBoard();
    const playRound = (players) => {
        informAboutBoard();
        const playerOnePosition = parseInt(prompt("Player One, choose your position"));
        const playerTwoPosition = parseInt(prompt("Player Two, choose your position"));

        if(!isNaN(playerOnePosition) && !isNaN(playerTwoPosition)) {
            board[playerOnePosition].push(players[0].marker);
            console.log(board);
            board[playerTwoPosition].push(players[1].marker);
            console.log(board);

            // Check for a winner after each round
            if (checkWinner(players[0].marker)) {
                console.log(`${players[0].name} is the winner!`);
                console.log(board)
                return true; // End the game
            }
            if (checkWinner(players[1].marker)) {
                console.log(`${players[1].name} is the winner!`);
                console.log(board)
                return true; // End the game
            }
            if (fullBoard()) {
                console.log("It's a draw!");
                console.log(board)
                return true; // End the game
            }
        } else {
            console.log("Invalid input. Please enter numbers between 0-8.");
        }
        return false; // Game continues
    }

    const fullBoard = () => {
        for (let i = 0; i < board.length; i++) {
            if(board[i].length === 0) {
                return false;
            }
        }
        return true;
    }

    const checkWinner = (marker) => {
        // Define winning combinations
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
    }

    const players = GamePlayers();
    let gameOver = false;
    while (!gameOver) {
        gameOver = playRound(players);
    }

}

GameControll();


const ScreenController = () => {

}