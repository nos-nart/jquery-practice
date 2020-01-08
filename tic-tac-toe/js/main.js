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
        isWin = false,
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
            isWin = false;
            arrMovement = [];
            !Object.is(isWin, 'x') ? changeMessage(MSSG.Y_TURN) : changeMessage(MSSG.X_TURN)
        });
    }

    function changeHTML($ele, $html) {
        $ele.html($html)
    }

    function playGame() {
        let $that = null, move = null;
        $(document).on('click', '.cell', function () {
            if ($that) $that.css('background', '#fff');
            x_turn = !x_turn;
            let $self = $(this);
            $self.css('background', '#0a9745').prop('disabled', true);
            changeHTML($self, x_turn ? `<span>✖️</span>` : `<span>⚫️</span>`);
            changeMessage(!x_turn ? MSSG.X_TURN : MSSG.O_TURN);
            move = {player: x_turn ? 'x' : 'o', data: $self.data('index')}
            arrMovement.push(move);
            $that = $(this);
            checkWin(arrMovement, x_turn ? 'x' : 'o', move);
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

    function checkContinuous(arr) {
        let count = 0;
        let prev = arr[0];
        for(let i = 1; i < arr.length; i++) {
            if ((arr[i].data  - prev.data) === 1) count++;
            console.log("TCL: checkContinuous -> count", count)
            prev = arr[i];
        }
        return Object.is(count, 4);
    }

    function checkHorizontal(arr) {
        return arr.length > 4 && checkContinuous(arr.sort((prev, cur) => prev.data - cur.data).slice(0, 5));
    }

    function checkVertical(arr) {
        return arr.length > 4 && checkContinuous(arr.sort((prev, cur) => prev.data - cur.data).slice(0, 5));
    }

    function checkWin(moves, player, move) {
        let res = false;
        let currentPlayerMoves = moves.filter(m => m.player === player);

        checkHorizontal(currentPlayerMoves.filter(m => ~~(m.data / 10) === ~~(move.data / 10)));
        checkVertical(currentPlayerMoves.filter(m => (m.data % 10) === (move.data % 10)));

        return res;
    }

    runGame();
});