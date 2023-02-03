import { Component } from "../core/kernel"
import movieStore, { getMovieDetails } from "../store/movie"

export default class Movie extends Component {
  async render(){ 
    this.el.classList.add('container', 'the-movie')
    // 데이터를 받아오기 전(await 코드 이전)에 똑같은 구조의 코드를 작성한다. 
    this.el.innerHTML = /* html */`
      <div class="poster skeleton"></div>
      <div class="specs">
        <div class="title skeleton"></div>
        <div class="labels skeleton"></div>
        <div class="plot skeleton"></div>
      </div>
    `

    // 우리는 쿼리스트링을 history 객체에 저장했었으니 여기서 꺼내서 매개변수로 넣는다. 
    await getMovieDetails(history.state.id) // 비동기 함수이므로 await을 붙여야 한다. 
    // console.log(movieStore.state.movie)

    const { movie } = movieStore.state
    const bigPoster = movie.Poster.replace('SX300', 'SX700')

    this.el.innerHTML = /* html */`
      <div 
        class="poster" 
        style="background-image: url(${bigPoster})"
      >
      </div>
      <div class="specs">
        <div class="title">
          ${movie.Title}
        </div>
        <div class="labels">
          <span>${movie.Released}</span>
          <!-- 코드상에서 띄어쓰기는 1개 이상 안 됨. 줄바꿈에서 이미 띄어쓰기 1개가 적용된거라서 
          여기에서 html html entities를 사용해서 띄어쓰기를 2개 이상 적용시켜준다. -->
          &nbsp;/&nbsp; 
          <span>${movie.Runtime}</span>
          &nbsp;/&nbsp;
          <span>${movie.Country}</span>
        </div>
        <div class="plot">
          ${movie.Plot}
        </div>
        <div>
          <h3>Ratings</h3>
          ${movie.Ratings.map(rating => {
            return `<p>${rating.Source} - ${rating.Value}</p>`
          }).join('')} 
        </div>
        <div>
          <h3>Actors</h3>
          <p>${movie.Actors}</p>
        </div>
        <div>
          <h3>Director</h3>
          <p>${movie.Director}</p>
        </div>
        <div>
          <h3>Production</h3>
          <p>${movie.Production}</p>
        </div>
        <div>
          <h3>Genre</h3>
          <p>${movie.Genre}</p>
        </div>
      </div>
    `
  }
}