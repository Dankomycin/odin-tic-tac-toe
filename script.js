
    const gameboard = (function () {
        const board = [];

        const createBoard = () => {
            for (let i = 0; i < 9; i++) {
                board.push("");   
        }};

        const getBoard = () => [...board];

        const placeMarker = (index, marker) => {
            if (board[index] === "") {
                board[index] = marker;
            }};

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

    function gameController() {
        let activePlayer = {};
        const getActivePlayer = () => activePlayer;
        const checkWin = () => {
            const winningCombos = [ 0b111000000, 0b000111000, 0b000000111, 0b100100100, 0b010010010, 0b001001001, 0b100010001, 0b001010100]
            const gameboardInBinary = parseInt(gameboard.getBoard()
                .map((index) => index === activePlayer.marker ? '1': '0')
                .join(''), 2)
            if (winningCombos.find((int) => (gameboardInBinary & int) === int)) {
                console.log(`${activePlayer.name} has won the game!`);
                return 2;
            }if (gameboard.getBoard().every((i) => i !== "")){
                console.log("The game is tied!")
                return 1;
            }else{
                return 0;
            };
        };
        const switchPlayer = () => {
            activePlayer = activePlayer === players.getPlayerList()[0] ? players.getPlayerList()[1] : players.getPlayerList()[0];
            console.log(`It is ${activePlayer.name}'s turn.`);
        };
        const startGame = () => {
            players.createPlayer("Player 1", "X");
            players.createPlayer("Player 2", "O");
            activePlayer = players.getPlayerList()[0];
            gameboard.createBoard();
            console.log(`The gameboard is set!`);
        }
        const playRound = (index) => {
            gameboard.placeMarker(index, activePlayer.marker);
            gameboard.getBoard();
            if (!checkWin() == 0){
                return;
            }switchPlayer();
        };
        return {playRound, getActivePlayer, startGame, checkWin};
        };

    const ScreenController = (function() {
        const game = gameController();

        //cache DOM
        const tileGrid = document.querySelector(".gameboard");
        const textArea = document.querySelector(".textarea");

        function updateScreen() {
            tileGrid.innerHTML = "";
            const board = gameboard.getBoard()
            const activePlayer = game.getActivePlayer();
            textArea.textContent = `It is ${activePlayer.name}'s turn`
            board.forEach((value,index) => {
                const tile = document.createElement("button");
                tile.classList.add("tile");
                tile.textContent = value;
                tile.dataset.marker = value;
                tile.addEventListener("click", function clickHandler(e) {
                    if (!e.target.dataset.marker) {
                        game.playRound(index);
                        updateScreen();
                    }})
                tileGrid.appendChild(tile);
                })
            if (!game.checkWin() == 0){
                if (game.checkWin() == 1){
                    textArea.textContent = `The game is tied!`
                    return
                }if (game.checkWin() == 2){
                    textArea.textContent = `${activePlayer.name} has won the game!`
                    return
                }
            }
            console.log(game.checkWin())
        }
        
        //Init game   
        game.startGame();
        updateScreen();
            

    })();

    




    
    

    
    
