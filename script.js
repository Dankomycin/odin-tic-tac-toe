//const TicTacToe = (function (){
    const gameboard = (function () {
        const board = [];

        const createBoard = () => {
            for (let i = 0; i < 3; i++) {
                board[i] = [];
                for (let j = 0; j < 3; j++)
                    board[i].push("");   
        }};

        const getBoard = () => [...board];

        const placeMarker = (row, column, marker) => {
            if (board[row][column] === "") {
                board[row][column] = marker;
            }
        }

        return {createBoard, getBoard, placeMarker};
    })();

    const players = (function() {
        const list = [];

        const getPlayerList = () => [...list];

        function Player(name, marker) {
            this.name = name;
            this.marker = marker;
        };
        function createPlayer(name, marker) {
            const newPlayer = new Player(name, marker);
            list.push(newPlayer);
        };
        return {getPlayerList, createPlayer}
    })();

    const game =(function() {
        let activePlayer = {};
        const getActivePlayer = () => activePlayer;
        let hasEnded = false;
        const checkWin = () => {
            const winningCombos = [ 0b111000000, 0b000111000, 0b000000111, 0b100100100, 0b010010010, 0b001001001, 0b100010001, 0b001010100]
            const gameboardInBinary = parseInt(gameboard.getBoard()
                .flat()
                .map((index) => index === activePlayer.marker ? '1': '0')
                .join(''), 2)
            if (winningCombos.find((int) => (gameboardInBinary & int) === int)) {
                hasEnded = true;
                console.log(`${activePlayer} has won the game!`);
                return true;
            }if (gameboard.getBoard().flat().every((i) => i !== "")){
                hasEnded = true;
                console.log("The game is tied!")
                return true;
            }
            return false;
        };
        const switchPlayer = () => {
            activePlayer = activePlayer === players.getPlayerList()[0] ? players.getPlayerList()[1] : players.getPlayerList()[0];
            console.log(`It is ${activePlayer.name}'s turn.`);
        };
        const startGame = () => {
            players.createPlayer("Player1", "X");
            players.createPlayer("Player2", "O");
            activePlayer = players.getPlayerList()[0];
            gameboard.createBoard();
            console.log(`The gameboard is set!`);
        }
        const playRound = (row, column) => {
            gameboard.placeMarker(row, column, activePlayer.marker);
            gameboard.getBoard();
            if(checkWin()) {return};
            switchPlayer();
        };
        return {playRound, getActivePlayer, startGame};
        })();

    




    
    

    
    
