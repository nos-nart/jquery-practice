import jquery from 'jquery'
window.$ = window.jquery = jquery

$(function () {
  console.log('%c%s', 'color: rgb(255, 1, 1); font-size: 36px', 'Dừng lại!');
  const URL_URBAN = `http://api.urbandictionary.com/v0/define?term=`
  const method = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE'
  }

  const $ELEMENTS = {
    URBAN: $('#urban'),
    RES: $('#result')
  }

  const formatDate = date => {
    let res = new Date(date).toLocaleDateString('en-GB', {
        day : 'numeric',
        month : 'short',
        year : 'numeric',
    }).split(' ')
    res.splice(2, 0, ',')
    return res.join(' ')
  }

  const search = (url) => {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(method.GET, url);
      xhr.send();
      xhr.onload = function () {
        if (Object.is(xhr.status, 200)) {
          resolve(xhr.response)
        } else {
          reject(Error(req.statusText))
        }
      }

      xhr.onprogress = function(event) {
        if (event.lengthComputable) {
          console.log('render progress bar')
        } else {
          console.log(`Received ${event.loaded} bytes`); // no Content-Length
        }
      };

      xhr.onerror = function () {
        reject(new Error('Something went wrong'))
      }
    })
  }

  const  onUrbanSearch = (keyword) => {
    $ELEMENTS.RES.empty()
    search(`${URL_URBAN}${keyword}`)
      .then(function (response) {
        let res = JSON.parse(response).list
        console.log("TCL: onUrbanSearch -> res", res[0])
        res.map(item => {
          $ELEMENTS.RES.append(
            `<div class="shadow-md rounded-lg p-4">
                <span class="font-bold text-2xl text-pink-600">${item.word}</span>
                <p><span class="font-bold">Definition:</span> ${item.definition.replace(/[\r\n]+/g, '<br>').replace(/\[([^\]]+)\]/g, '<span class="text-blue-400 font-bold">$1</span>')}</p>
                <div><span class="font-bold">Example:</span><br>
                    <p class="italic">${item.example.replace(/[\r\n]+/g, '<br>').replace(/\[([^\]]+)\]/g, '<span class="text-blue-400 font-bold">$1</span>')}</p>
                </div>
                <p class="font-bold">by <span class="text-teal-400"> ${item.author}</span><span> ${formatDate(item.written_on)}</span></p>
                <div>
                  <span>👍 ${item.thumbs_up} </span><span>👎 ${item.thumbs_down}</span>
                </div>
              </div>`
          )
        })
      })
      .catch(function (err) {
        console.log(err);
      })
  }


  $ELEMENTS.URBAN.on('submit', function (event) {
    event.preventDefault()
    let urban_keyword = $(this).find('[data-keyword=urban]').val()
    onUrbanSearch(urban_keyword)
  })
});
