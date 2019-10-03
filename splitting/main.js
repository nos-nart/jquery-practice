import 'style.css';
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";
import jquery from 'jquery'

window.$ = window.jQuery = jquery

$(function() {
    Splitting()
    $('.char').hover(function() {
        let that = $(this)
        $(this).addClass('rubberBand animated fast')
        setTimeout(function() {
            that.removeClass('rubberBand animated fast')
        }, 1000)
    })
})
