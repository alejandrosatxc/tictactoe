var boardEl = $('#board')

$('#start-btn').on("click", () => {
    var status = $('<h2 id=status>').text("Deciding who starts...")    
    $('#hud').append(status)
    var countDown = 10
    var coinFlipTimer = setInterval(function() {
        countDown--;
        if(countDown === -1) {
            var first = Math.floor(Math.random() * 2)
            if(first === 0) {
                $('#status').text("Player 1 goes 1st!")
            } else if(first === 1)  {
                $('#status').text("Player 2 goes 1st!")
            }
            clearInterval(coinFlipTimer)
        }
    }, 100)
})