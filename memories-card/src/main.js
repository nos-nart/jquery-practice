import './styles/_global.scss';
import './styles/style.scss';
import jquery from 'jquery';
import storage from 'local-storage-fallback';
import _ from 'underscore';
import anime from 'animejs/lib/anime.es.js';
window.$ = window.jquery = jquery

$(function () {
    const $ELEMENT = {
        gameBoard: $('.game-board'),
        card: $('.card')
    }
    const datas = [
        {id: 1, url: './anivia.png'},
        {id: 2, url: './ashe.png'},
        {id: 3, url: './braum.png'},
        {id: 4, url: './darius.png'},
        {id: 5, url: './draven.png'},
        {id: 6, url: './ezreal.png'},
        {id: 7, url: './fiora.png'},
        {id: 8, url: './garen.png'},
        {id: 9, url: './hecarim.png'},
        {id: 10, url: './heimerdinger.png'},
        {id: 11, url: './jinx.png'},
        {id: 12, url: './kalista.png'},
        {id: 13, url: './karma.png'},
        {id: 14, url: './katarina.png'},
        {id: 15, url: './lucian.png'},
        {id: 16, url: './lux.png'},
        {id: 17, url: './mighty-poro.png'},
        {id: 18, url: './poro.png'},
        {id: 19, url: './shen.png'},
        {id: 20, url: './teemo.png'},
        {id: 21, url: './thresh.png'},
        {id: 22, url: './zed.png'},
        {id: 23, url: './trymdamere.png'},
        {id: 24, url: './vladimir.png'},
        {id: 25, url: './yasuo.png'}
    ]

    function initial() {
        let temp = _.shuffle(datas, 'id').slice(0, 15);
        drawBoard(_.shuffle([...temp, ...temp]));
    }

    function drawCard(img, id) {
        let $ele = '<div class="card" data-index="' + id + '">'+
            '<div class="card-inner">'+
                '<div class="front">'+
                    '<img src="./back.jpg"/>' +
                '</div>' +
                '<div class="back">' +
                    '<img src="'+ img + '" alt="front"/>'+
            '</div></div></div>';
        return $ele;
    }

    function drawBoard(cards) {
        let $html = '';
        $.each(cards, function(_, card) {
            $html += drawCard(card.url, card.id);
        })
        $ELEMENT.gameBoard.append($html);
    }

    // let playing = false;
    function flipCard() {
        $(document).on('click', '.card', function() {
            console.log($(this))
            $(this).find('.card-inner').css('transform', 'rotateY(180deg)')
            // if (playing) return;
            // playing = true;
            // anime({
            //     targets: $('.card-inner'),
            //     scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
            //     rotateY: {value: '+=180', delay: 200},
            //     easing: 'easeInOutSine',
            //     duration: 200,
            //     // complete: function(){
            //     //     playing = false;
            //     // }
            // })
        })
    }

    function checkWin() {

    }

    function runGame() {
        initial();
        flipCard();
    }

    runGame();
})
