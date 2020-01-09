import './styles/_global.scss';
import './styles/style.scss';
import jquery from 'jquery';
import storage from 'local-storage-fallback';
import _ from 'underscore';
import anime from 'animejs';
window.$ = window.jquery = jquery

$(function () {
    const $ELEMENT = {
        gameBoard: $('.game-board')
    }
    const CARD_BACK = './images/back.jpg';
    const datas = [
        {url: './images/anivia.png'},
        {url: './images/ashe.png'},
        {url: './images/braum.png'},
        {url: './images/darius.png'},
        {url: './images/draven.png'},
        {url: './images/ezreal.png'},
        {url: './images/fiora.png'},
        {url: './images/garen.png'},
        {url: './images/hecarim.png'},
        {url: './images/heimerdinger.png'},
        {url: './images/jinx.png'},
        {url: './images/kalista.png'},
        {url: './images/karma.png'},
        {url: './images/katarina.png'},
        {url: './images/lucian.png'},
        {url: './images/lux.png'},
        {url: './images/mighty-poro.png'},
        {url: './images/poro.png'},
        {url: './images/shen.png'},
        {url: './images/teemo.png'},
        {url: './images/thresh.png'},
        {url: './images/zed.png'},
        {url: './images/trymdamere.png'},
        {url: './images/vladimir.png'},
        {url: './images/yasuo.png'}
    ]

    function shuffle(arr) {
        console.log("TCL: shuffle -> arr", arr)
        return _.shuffle(arr)
    }

    function initial() {
        let temp = shuffle(datas).slice(0, 16);
        let initArr = shuffle(temp.push(...temp));
        console.log("TCL: initial -> initArr", initArr)
    }

    function drawCard(img, data) {
        let $ele = $('<div class="card" data-index="' + data + '">' +
            '<div class="front"><div>'+ '<img src="' + img + '"alt="front"/></div></div>' +
            '<div class="back"><img src="' + CARD_BACK + '"/></div>'
        +'</div>')
        return $ele;
    }

    function runGame() {
        initial();
    }

    runGame();
})
