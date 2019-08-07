import jquery from 'jquery'
window.$ = window.jquery = jquery

$(function() {
    console.log('%c%s', 'color: rgb(255, 1, 1); font-size: 36px', 'Dừng lại!');
    const URL_URBAN = `http://api.urbandictionary.com/v0/define?term=`
    const method = {
        POST: 'POST',
        GET: 'GET',
        PUT: 'PUT',
        DELETE: 'DELETE'
    }

    function search(url) {
        return new Promise((response, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(method.GET, url);
            xhr.send();
            xhr.onload = function() {
                if (Object.is(xhr.status, 200)) {
                    resolve(xhr.response)
                } else {
                    reject(Error(req.statusText))
                }
            }

            xhr.onerror = function() {
                reject(new Error('Something went wrong'))
            }
        })
    }

    function onUrbanSearch(event) {
        console.log('clicked')
        // search()
    }
});