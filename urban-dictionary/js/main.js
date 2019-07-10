$(function () {
    const URL = 'http://api.urbandictionary.com/v0/define?term=';
    const ELEMENTS = {
        $search: $('.search')
    }
    console.log('%c%s', 'color: rgb(255, 1, 1); font-size: 36px', 'Dừng lại!');

    function makeAsyncCall(word) {
        var d = $.Deferred();

        $.ajax({
            'url': `${URL}${word}`,
            'success': function (res) {
                d.resolve(res)
            },
            'error': function () {
                d.reject(`Sorry we couldn't find: ${word}`)
            }
        })

        return d.promise();
    }

    ELEMENTS.$search.on('click', function () {
        var word = $('input[name=word]').val();

        makeAsyncCall(word)
            .then( function (res) {
                console.table(res);
            })
            .catch( function (res) {
                console.error(res);
            })
    })
})