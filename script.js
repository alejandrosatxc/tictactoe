var boardEl = $('#board')
var game = 'over'
var player;

$('#start-btn').on("click", startGame)

function startGame() {

    //Clear game board
    boardEl.children('ul').children().each(function () {
        //Remove all remaining click handlers
        $(this).off("click")
        //Remove all X's and O's
        $(this).text('')
    })

    //Decide which player goes first randomly, like a coin flip, with a small countdown
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


    //Add click event handlers to all blocks, the function that runs carries out game logic
    boardEl.children('ul').children().each(function () {
        $(this).on("click", function () {
            //If player is 1, print X, else print O
            player ? $(this).text('X') : $(this).text('O')
            //Toggle player turn, if player = 1, set player = 0 and vise versa
            player ? player = 0 : player = 1
            $('#status').text(`Player ${player + 1}'s turn!`)
            //Remove event listner so this square cannot be clicked again
            $(this).off("click")
        })
    })

}