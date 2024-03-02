const GameBoard = () => {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [i];
        for (let j = 0; j < columns; j++) {
            board[i][j] = ""
        }
    }

    const getBoard = () => board;
    return getBoard();
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

    return players;
}