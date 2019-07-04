$(function() {
    const ELEMENT = {
        $gameBoard: $('.game-board'),
        $input: $('input'),
        $start: $('#start'),
        $message: $('.message')
    }
    const MSSG = {
        X_TURN: 'X turn',
        Y_TURN: 'Y turn',
        WIN: 'win!'
    }


    function changeMessage(mssg) {

    }

    function initial() {
        getGrid();
        playGame();
    }

    function getGrid() {
        ELEMENT.$input.change(function () {
            ELEMENT.$input.attr('disabled', true)
            renderBoard($(this).val());
        })
    }

    function playGame() {

    }

    function renderBoard(width) {
        ELEMENT.$gameBoard.css( "grid-template-columns", `repeat(${width}, 1fr)` );
        for (let i = 0; i < width * width; i++) {
            ELEMENT.$gameBoard.append(
                $(`<div class="cell" id="${i}"></div>`)
            )
        }
    }

    function checkWin() {

    }

    function showMessage() {

    }

    initial()
});