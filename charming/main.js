import 'animate.css';
import jquery from 'jquery'

window.$ = window.jQuery = jquery
const charming = require('charming')


$(function() {
    const element = document.querySelector('h1')
    charming(element, {
        setClassName: function(index, letter) {
            console.log('hi')
            return `letter`
        },
    })

    $('.letter').mouseenter(function() {
        console.log('hi again')
        let that = $(this)
        $(this).addClass('rubberBand animated')

        setTimeout(function() {
            that.removeClass('rubberBand animated')
        }, 1000)
    })

    $('button').mouseenter(function() {
        let that = $(this)
        $(this).addClass('rubberBand animated')
        setTimeout(function() {
            that.removeClass('rubberBand animated')
        }, 1000)
    })

    $('.x').mouseenter(function() {
        let that = $(this)
        $(this).addClass('rubberBand animated')
        setTimeout(function() {
            that.removeClass('rubberBand animated')
        }, 1000)
    })
})
