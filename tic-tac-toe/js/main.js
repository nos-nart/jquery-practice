$(function() {
    // ◯ ❌
    const ELEMENT = {
        $gameBoard: $('.game-board'),
        $input: $('input[name="width"]'),
        $start: $('#start'),
        $message: $('.message span'),
        $btnStart: $('.start-game')
    }
    const MSSG = {
        X_TURN: '❌ turn',
        O_TURN: '◯ turn',
        WIN: 'win!'
    }

    let x_turn = true;
    let move, arrMovement, isWin;

    function changeMessage(mssg) {
        ELEMENT.$message.text(mssg)
    }

    function initial() {
        changeMessage('Wei, ni hao me?');
        // Get initial width board
        ELEMENT.$input.each( function() {
            if ($(this).prop('checked')) {
                drawGame($(this).val())
            }
        });
    }

    function startGame() {
        arrMovement = [];
        isWin = false;
        ELEMENT.$btnStart.on('click', function() {
            ELEMENT.$input.each( function() {
                $(this).attr('disabled', true);
            })
        })
    }

    function runGame() {
        initial();
        changeWidth();
        startGame();
        playGame();
    }

    function changeWidth() {
        // Event change width board
        ELEMENT.$input.change(function () {
            ELEMENT.$input.prop('checked', false);
            $(this).prop('checked', true);
            width = $(this).val();
            drawGame($(this).val());
            changeMessage(MSSG.X_TURN);
        })
    }

    function playGame() {
        $(document).on('click', '.cell', function() {
            $('.cell').css('background', '#ffffff');
            x_turn = !x_turn;
            let $self = $(this);
            $self.css('background', '#8e24aa');
            $self.prop('disabled', true);
            if (x_turn) {
                $self.html(`<span>◯</span>`);
                changeMessage(MSSG.X_TURN);
            } else {
                $self.html(`<span>❌</span>`);
                changeMessage(MSSG.O_TURN);
            }
            move = {
                player: x_turn ? 'o' : 'x',
                x: $self.data('coordinate').split(',')[0],
                y: $self.data('coordinate').split(',')[1],
            }
            arrMovement.push(move);
            isWin = checkWin(arrMovement, move.x, move.y);
            if (isWin) {
                changeMessage(`${move.player} ${MSSG.WIN}`)
            }
        })
    }

    function drawGame(width) {
        ELEMENT.$gameBoard.empty();
        ELEMENT.$gameBoard.css( "grid-template-columns", `repeat(${width}, 1fr)` );
        for (let i = 0; i < width; i++) {
            for(let j = 0; j < width; j++)
            ELEMENT.$gameBoard.append(
                $(`<button class="cell grid" data-coordinate="${[i + 1, j + 1]}"></button>`)
            )
        }
    }

    function checkWin(moves, x, y) {
        let x_vertical = moves.filter(move => move.x === x && move.player === 'x');
        if (x_vertical.length > 4) {
            isWin = true;
        }
        return isWin;
    }

    runGame()
});