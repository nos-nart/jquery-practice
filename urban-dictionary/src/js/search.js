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
    RES: $('#result'),
    PROGRESS_BAR: $('#progress-bar')
  }
  

  console.log($ELEMENTS.PROGRESS_BAR);

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
      xhr.onload = () => {
        if (Object.is(xhr.status, 200)) {
          resolve(xhr.response)
        } else {
          reject(Error(req.statusText))
        }
      }

      xhr.onprogress = event => {
        if (event.lengthComputable) {
          $ELEMENTS.PROGRESS_BAR.css('width', (event.loaded / event.total) * 100)
        }
      }

      xhr.onerror = () => {
        reject(new Error('Something went wrong'))
      }
    })
  }

  const  onUrbanSearch = (keyword) => {
    $ELEMENTS.RES.empty()
    search(`${URL_URBAN}${keyword}`)
      .then(response => {
        let res = JSON.parse(response).list
        console.log("TCL: onUrbanSearch -> res", res)
        if (res.length !== 0) {
          res.map(item => {
            $ELEMENTS.RES.append(generateResult(item))
          })
        } else {
          $ELEMENTS.RES.append(`<p class="font-bold text-2xl">Sorry we couldn't find: <span class="text-red-500">${keyword} 🎌</span>`)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const generateResult = value => {
    var html = ''
    html += '<div class="shadow-md rounded-lg p-4">'
    html += '<p class="font-bold text-2xl text-pink-600">' + value.word + '</p>';
    html += '<p>' + '<span class="font-bold">' + 'Definition:' + '</span>' + value.definition.replace(/[\r\n]+/g, '<br>').replace(/\[([^\]]+)\]/g, '<span class="text-blue-400 font-bold">$1</span>') + '</p>'
    html += '<p>' + '<span class="font-bold">' + 'Example:' + '</span>' + value.example.replace(/[\r\n]+/g, '<br>').replace(/\[([^\]]+)\]/g, '<span class="text-blue-400 font-bold">$1</span>') + '</p>'
    html += '<p class="font-bold">' + 'by ' + '<span class="text-teal-400"> ' + value.author + '</span>' + ' <span> ' + formatDate(value.written_on) + '</span>' + '</p>'
    html += '<div>' + '<span>' + '👍 ' +  value.thumbs_up + '</span>' + '<span>' + ' 👎 ' +  value.thumbs_down + '</span>'
    html += '</div>'
    return html
  }


  $ELEMENTS.URBAN.on('submit', function (event) {
    event.preventDefault()
    let urban_keyword = $(this).find('[data-keyword=urban]').val()
    onUrbanSearch(urban_keyword)
    $(document).on('click', '.play-sound', function() {
      var hrefsound = new Audio($(this).attr('href'))
      hrefsound.play()
    })
  })
});
