$(function() {
    const ELEMENT = {
        $gameBoard: $('.game-board'),
        $input: $('input[name="width"]'),
        $start: $('#start'),
        $message: $('.message span')
    }
    const MSSG = {
        X_TURN: 'X turn',
        O_TURN: 'O turn',
        WIN: 'win!'
    }

    let x_turn = true;
    // 🇴 ❌

    function changeMessage(mssg) {
        ELEMENT.$message.text(mssg)
    }

    function initial() {
        changeMessage('Wei, ni hao me?');
        // Get initial width board
        ELEMENT.$input.each( function() {
            if ($(this).prop('checked')) {
                renderBoard($(this).val())
            }
        });


    }

    function game() {
        initial();
        changeWidth();
        playGame();
    }

    function changeWidth() {
        // Event change width board
        ELEMENT.$input.change(function () {
            ELEMENT.$input.prop('checked', false);
            $(this).prop('checked', true)
            renderBoard($(this).val());
            changeMessage(MSSG.X_TURN);
        })
    }

    function playGame() {
        $(document).on('click', '.cell', function(event) {
            console.log(event)
        })
    }

    function renderBoard(width) {
        ELEMENT.$gameBoard.empty();
        ELEMENT.$gameBoard.css( "grid-template-columns", `repeat(${width}, 1fr)` );
        for (let i = 0; i < width * width; i++) {
            ELEMENT.$gameBoard.append(
                $(`<div class="cell grid" id="${i}"><span>${i % 2 === 0 ? '🇴' : '❌'}</span></div>`)
            )
        }
    }

    function checkWin() {

    }

    game()
});