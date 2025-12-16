//const TicTacToe = (function (){
    const gameboard = {
        board: [],
        create() {
            for (let i = 0; i < 3; i++) {
                this.board[i] = [];
                for (let j = 0; j < 3; j++)
                    this.board[i].push("");   
        }},
        updateBoard() {
            return gameboard.board; 
        },
        placeMarker(row, column, player) {
            if (this.board[row][column] === "") {
                this.board[row][column] = player.marker;
                this.updateBoard();
            }
        }}

    function createPlayer (name, marker) {
        return {name, marker}
    }

    const players = [{
        name: "player1",
        marker: "X"},
        {name: "player2",
        marker: "O"}]

    const game = {
        activePlayer: players[0],
        hasEnded: false,
        checkWin(){
            const winningCombos = [ 0b111000000, 0b000111000, 0b000000111, 0b100100100, 0b010010010, 0b001001001, 0b100010001, 0b001010100]
            const gameboardInBinary = parseInt(gameboard.board
                .flat()
                .map((index) => index === this.activePlayer.marker ? '1': '0')
                .join(''), 2)
            if (winningCombos.find((int) => (gameboardInBinary & int) === int)) {
                this.hasEnded = true;
                console.log(`This ${this.activePlayer} has won the game!`);
                return true;
            }
            return false
        },
        playerTurn(row, column) {
            gameboard.placeMarker(row,column,this.activePlayer);
            if (this.activePlayer === players[0]){
                return this.activePlayer = players[1];
            }
            else {
                return this.activePlayer = players[0];
            }
        }
    }
    

    
    
