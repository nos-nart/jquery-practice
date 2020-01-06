import jquery from 'jquery';
import storage from 'local-storage-fallback';
window.$ = window.jquery = jquery

$(function () {
    const $ELEMENT = {
        best: $('.best'),
        score: $('.score'),
        newGame: $('.new-game'),
        cells: $('.cell')
    };

    const KEYCODE = {
        left: 37,
        up: 38,
        right: 39,
        down: 40
    };
    
    const randomValues = new Array(10).fill(2).map((ele, index) => index < 2 ? ele + 2 : ele);
    // var item = items[Math.floor(Math.random()*items.length)];

    // $.each($ELEMENT.cells, function(key, val) {
    //     $(val).removeClass(function(_, className) {
    //         console.log(className)
    //         // return (className.match(/(bg-[^0])/g)).join('');
    //     })
    // });

    $(document).on('click', '.new-game', function() {
        initialGame();
    });

    function getBestScore() {
        return storage.getItem('best') || 1;
    };
    
    function paintColor() {
        console.log('paint color')
        console.log("TCL: paintColor -> $ELEMENT.cells", $ELEMENT.cells)
        $.each($ELEMENT.cells, function(key, val) {
            let $this = $(val);
            switch($this.data('value')) {
                case 2: {
                    $this.addClass('bg-2');
                    break;
                }
                case 4: {
                    $this.addClass('bg-4');
                    break;
                }
                case 8: {
                    $this.addClass('bg-8');
                    break;
                }
                case 16: {
                    $this.addClass('bg-16');
                    break;
                }
                case 32: {
                    $this.addClass('bg-32');
                    break;
                }
                default: return '';
            }
        });
    };

    function initialGame() {
        let best = getBestScore();
        $ELEMENT.best.text(best);

        let startValue = new Array(16).fill(0).map((_, index) => index === 0 || index === 1 ? randomValues[Math.floor(Math.random()*randomValues.length)] : 0).sort(() => Math.random() - 0.5);
        $ELEMENT.cells.each(function(index, e) {
            let $this = $(e);
            startValue[index] === 0 ? $this.text('') : $this.text(startValue[index]);
            $this.attr({'data-value': startValue[index]});
        });
        paintColor();
    };

    function move() {
        $(document).keyup(function(e) {
            switch(e.keyCode) {
                case KEYCODE.down: {
                    down();
                    break;
                }
                default: return null;
            }
        })
    };

    function down() {
        $.each($ELEMENT.cells, function(key, val) {
            console.log("TCL: down -> val", val)
        })
    }

    function calculateScore() {

    };

    function checkEndGame() {

    };

    function runGame() {
        initialGame();
        move();
    };

    runGame();
});
