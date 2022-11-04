var boardEl = $('#board')
var player;

$('#start-btn').on("click", startGame)

//clearBoard() will clear and reset the game board
function clearBoard() {
    var rows = boardEl.children('ul')
    rows.off("click")
    rows.children().text('')
    rows.children().css("cursor", "default")
}

//coinflip() randomly sets 'player' to 0 or 1 after a one second countdown
function coinflip() {

    $('#status').text("Deciding who starts")
    var countDown = 10
    var coinFlipTimer = setInterval(function () {
        countDown--;
        $('#status').append('.') //for a Great Value 'loading effect'
        //When the countdown ends...
        if (countDown === -1) {
            //Randomly set player to 0 or 1
            player = Math.floor(Math.random() * 2)
            //Update players on who goes first
            player ? $('#status').text("Player 2 goes 1st!") : $('#status').text("Player 1 goes 1st!")
            //Stop running this function
            clearInterval(coinFlipTimer)
        }
    }, 100)
}

//startGame() runs when the start button $('#start-btn') is clicked
function startGame() {

    //Clear game board
    clearBoard()

    //Decide which player goes first randomly, like a coin flip, with a small countdown
    coinflip()

    //Add event handler (using delegation), to register clicks on the board and make a move. 
    boardEl.children('ul').on('click', makeMove)

    //Change the cursor CSS for each square to 'pointer'
    boardEl.children('ul').children().css("cursor", "pointer")

}

function makeMove(e) {
    //This function utilizes e.target (event delegation) to specify which box on the game board was clicked
    //If square is empty (otherwise do nothing)
    if ($(e.target).text() === '') {
        //If player is 1, print X, else print O
        player ? $(e.target).text('X') : $(e.target).text('O')
        //Toggle player turn, if player = 1, set player = 0 and vise versa
        player ? player = 0 : player = 1
        //Remove event listner so this square cannot be clicked again
        $('#status').text(`Player ${player + 1}'s turn!`)
        //Change cursor for this square to 'not-allowed'
        $(e.target).css("cursor", "not-allowed")

        //Check if game is over via a win condition or a tie
        var rows = []
        var cols = []
        boardEl.children('ul').each(function () {
            rows.push($(this).children().text())
        })

        cols.push($('ul li:nth-child(1)').text())
        cols.push($('ul li:nth-child(2)').text())
        cols.push($('ul li:nth-child(3)').text())

        //Check rows and cols for a win
        for(var i in rows) {
            if(rows[i] === "OOO") {
                endGame(0)
            } else if(rows[i] === "XXX") {
                endGame(1)
            }
        }

        for(var i in cols) {
            if(cols[i] === "OOO") {
                endGame(0)
            } else if(cols[i] === "XXX") {
                endGame(1)
            }
        }
        //TODO: Check for a diagonal win

        //TODO: Check for a tie

        console.log("rows: ", rows)
        console.log("cols: ", cols)
    }
}

function endGame(winner) {
    //Announce winner
    winner ? $('#status').text('Player 1 wins!') : $('#status').text('Player 2 wins!')

    //Prevent further moves
    boardEl.children('ul').off("click")

    //Remove cursor styling
    boardEl.children('ul').children().css("cursor", "default")
}