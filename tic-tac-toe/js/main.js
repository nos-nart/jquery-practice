$(function() {
    console.log('%c%s', 'color: rgb(255, 1, 1); font-size: 36px', 'Dừng lại!');
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
    let move,
        arrMovement,
        isWin,
        x_max,
        x_min,
        y_max,
        y_min,
        x_horizontal,
        o_horizontal,
        x_vertical,
        o_vertical,
        x_diagonal,
        o_diagonal;

    function changeMessage(mssg) {
        ELEMENT.$message.text(mssg)
    }

    function initial() {
        changeMessage('Wei, ni hao me?');
        // Get initial width board
        ELEMENT.$input.each( function() {
            if ($(this).prop('checked')) {
                drawGame($(this).val());
            }
        });
    }

    function startGame() {
        arrMovement = [];
        isWin = false;
        ELEMENT.$btnStart.on('click', function() {
            ELEMENT.$input.each( function() {
                $(this).attr('disabled', true);
                changeMessage(MSSG.X_TURN);
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

    function drawWinPLayer(x, y) {

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
                y: $self.data('coordinate').split(',')[1]
                // sum: Number(($self.data('coordinate').split(',')[0])) + Number($self.data('coordinate').split(',')[1])
            }
            arrMovement.push(move);

            y_max = Math.max.apply(Math, arrMovement.map(function (it) { return it.y }));
            y_min = Math.min.apply(Math, arrMovement.map(function (it) { return it.y }));
            x_max = Math.max.apply(Math, arrMovement.map(function (it) { return it.x }));
            x_min = Math.min.apply(Math, arrMovement.map(function (it) { return it.x }));
            isWin = checkWin(arrMovement, move.x, move.y);

            if (isWin) {
                changeMessage(`${move.player} ${MSSG.WIN}`);
                $('.cell').prop('disabled', true)
            }
        })
    }

    function drawGame(width) {
        ELEMENT.$gameBoard.empty();
        ELEMENT.$gameBoard.css("grid-template-columns", `repeat(${width}, 1fr)`);
        for (let i = 0; i < width; i++) {
            for(let j = 0; j < width; j++)
            ELEMENT.$gameBoard.append(
                $(`<button class="cell grid" data-coordinate="${[i + 1, j + 1]}">[${i + 1}, ${j + 1}]</button>`)
            )
        }
    }

    function isConsecutiveDiagonal(arr, sum, length) {
        console.log(arr)
        let temp = arr.reduce((res, ele) => {
            return Number(ele.x) + Number(ele.y) === sum ? [...res, ele] : [...res];
        }, []);
        // console.log("TCL: isConsecutiveDiagonal -> temp", temp)
        let x_temp_max = Math.max.apply(Math, temp.map(function(t) { return t.x }));
        let x_temp_min = Math.min.apply(Math, temp.map(function(t){ return t.x }));
        return Object.is(temp.length, length) && x_temp_max - x_temp_min < 5;
    }
    function checkWin(moves, x, y) {
        x_horizontal = moves.filter(move => Object.is(move.x, x) && Object.is(move.player, 'x'));
        o_horizontal = moves.filter(move => Object.is(move.x, x) && Object.is(move.player, 'o'));
        x_vertical = moves.filter(move => Object.is(move.y, y) && Object.is(move.player, 'x'));
        o_vertical = moves.filter(move => move.y === y && move.player === 'o');
        let x_diagonal_arr = moves.filter(move => Object.is(move.player, 'x'));
        console.log("TCL: checkWin -> x_diagonal_arr", x_diagonal_arr)
        let o_diagonal_arr = moves.filter(move => Object.is(move.player, 'o'));
        console.log("TCL: checkWin -> o_diagonal_arr", o_diagonal_arr)
        // x_diagonal = isConsecutiveDiagonal(x_diagonal_arr, sum, x_diagonal_arr.length);
        // o_diagonal = isConsecutiveDiagonal(o_diagonal_arr, sum, o_diagonal_arr.length);

        if (x_horizontal.length > 4 || o_horizontal.length > 4) {
            if (x_horizontal.length > 5 || o_horizontal.length > 5) {
                isWin = true;
            }
            if (y_max - y_min < 5) {
                isWin = true;
            }
        } else if (x_vertical.length > 4 || o_vertical.length > 4) {
            if (x_vertical.length > 5 || o_vertical.length > 5) {
                isWin = true;
            }
            if (x_max - x_min < 5) {
                isWin = true;
            }
        } else {
            isWin = false;
        }
        return isWin;
    }

    runGame();
});