(function () {
    const API_KEY = '18e150157fe340d287bf999cc79f5530'
    const URL = 'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=';
    const $getNews = document.querySelector('#get-news');
    const $result = document.querySelector('.result');
    const $progressBar = document.querySelector('.progress-bar')

    const getNews = (url) => {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.send();
            xhr.onload = () => {
                console.log(xhr);
                if (Object.is(xhr.status, 200)) {
                    resolve(xhr.response)
                } else {
                    reject(Error(req.statusText))
                }
            }

            xhr.onprogress  = event => {
                if (event.lengthComputable) {
                    $progressBar.style.width = `${(event.loaded / event.total) * 100}%`
                }
            }

            xhr.onerror = () => {
                reject(Error('Something went wrong'))
            }
        })
    }

    const showNews = () => {
        getNews(`${URL}${API_KEY}`).then((response) => {
            let news = JSON.parse(response).articles;
            let html = '';
            news.map(newItem => {
                console.log(newItem)
                html += `<div class="card grid">
                            <div class="card-header grid">
                                <div>
                                    <img class="card-header__img" src="${newItem.urlToImage}" alt="img"/>
                                </div>
                                <div>
                                    <p class="text-bold"># ${newItem.title}</p>
                                    <p>Author: ${newItem.author}</p>
                                    <p>Public at: ${newItem.publishedAt}</p>
                                    <p>Press: ${newItem.source.name}</p>
                                </div>
                            </div>
                            <div class="card-content" >
                                <p>${newItem.content === null ? '<a class="redirect-link" href="${newItem.url}">Read more</a>' : newItem.content}</p>
                            </div>
                        </div>`
                $result.innerHTML = html;
            })
        })
    }

    $getNews.addEventListener('click', function() {
        showNews();
    })
})();