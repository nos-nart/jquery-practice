$(function () {
    //TODO: add timing to players turn
    //
    console.log('%c%s', 'color: rgb(255, 1, 1); font-size: 36px', 'Dừng lại!');
    const $ELEMENT = {
        gamePlay: $('.game-play'),
        input: $('input[name="width"]'),
        start: $('#start'),
        message: $('.message span'),
        btnStart: $('.start-game'),
        btnReplay: $('.replay')
    }
    const MSSG = {
        X_TURN: '✖️ turn',
        O_TURN: '⚫️ turn',
        WIN: 'win!',
        START: 'Need to start ☝️'
    }

    let x_turn = true;
    let move,
        arrMovement,
        isStart = false,
        isWin = 'x',
        width

    function changeMessage(mssg) {
        $ELEMENT.message.text(mssg)
    }

    function initial() {
        changeMessage('Wei, ni hao me?');
        // Get initial game board
        $('input[name="width"]').attr('disabled', false);
        $ELEMENT.gamePlay.css("grid-template-columns", 'auto').empty().append(
            $(`<svg viewBox="64 64 896 896" class="empty-board" width="2em" height="2em" fill="currentColor" aria-hidden="true"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 208H676V232h212v136zm0 224H676V432h212v160zM412 432h200v160H412V432zm200-64H412V232h200v136zm-476 64h212v160H136V432zm0-200h212v136H136V232zm0 424h212v136H136V656zm276 0h200v136H412V656zm476 136H676V656h212v136z"></path></svg>`)
        );
    }

    function getWidth() {
        return $('input[name="width"]:checked').val();
    }

    function startGame() {
        arrMovement = [];
        isWin = false;
        $ELEMENT.btnStart.on('click', function () {
            isStart = true;
            $('input[name="width"]').attr('disabled', true);
            drawGame(getWidth());
            changeMessage(MSSG.X_TURN);
            playGame();
        });
    }

    function runGame() {
        initial();
        selectWidth();
        startGame();
        rePlay();
    }

    function selectWidth() {
        // Event change width board
        $ELEMENT.input.change(function () {
            $ELEMENT.input.prop('checked', false);
            $(this).prop('checked', true);
            width = $(this).val();
            drawGame(width);
            changeMessage(MSSG.START);
        });
    }

    function drawWinPLayer(x, y) {

    }

    function rePlay() {
        $ELEMENT.btnReplay.on('click', function () {
            drawGame(getWidth());
            !Object.is(isWin, 'x') ? changeMessage(MSSG.Y_TURN) : changeMessage(MSSG.X_TURN)
        });
    }

    function changeHTML($ele, $html) {
        $ele.html($html)
    }

    function playGame() {
        let $that = null;
        $(document).on('click', '.cell', function () {
            if ($that) $that.css('background', '#fff');
            x_turn = !x_turn;
            let $self = $(this);
            $self.css('background', '#0a9745');
            $self.prop('disabled', true);
            if (x_turn) {
                changeHTML($self, `<span>⚫️</span>`);
                changeMessage(MSSG.X_TURN);
                arrMovement.push({
                    x: $self.data('index')
                });
            } else {
                changeHTML($self, `<span>✖️</span>`);
                changeMessage(MSSG.O_TURN);
                arrMovement.push({
                    y: $self.data('index')
                });
            }
            $that = $(this);
            checkWin(arrMovement);
        });
    }

    function drawGame(width) {
        $ELEMENT.gamePlay.empty();
        $ELEMENT.gamePlay.css("grid-template-columns", `repeat(${width}, 1fr)`);
        let $html = '';
        for (let i = 0; i < width * width; i++) {
            $html += `<button class="cell grid" data-index="${i}">${i}</button>`
        };
        $ELEMENT.gamePlay.append($html);
    }

    function checkWin(moves) {
        let x_moves = moves.filter(m => !m.x);
        let y_moves = moves.filter(m => !m.y);
        console.log("TCL: checkWin -> y_moves", y_moves)
    }

    runGame();
});