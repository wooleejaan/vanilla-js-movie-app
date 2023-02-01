import { Component } from "../core/kernel"
import movieStore from "../store/movie"
import MovieItem from "./MovieItem"

export default class MovieList extends Component {

  constructor(){
    super()
    movieStore.subscribe('movies', () => { // 첫번째 매개변수로는 구독하려는 state, 두번째 매개변수로는 콜백함수를 넣는다. 
      // 만약 버튼을 눌러서 데이터를 가져오면서 movies 상태가 변경되면, 콜백함수를 통해 아래의 render 함수를 재실행해준다. 
      this.render()
    })
    movieStore.subscribe('loading', () => {
      this.render()
    })
    movieStore.subscribe('message', () => {
      this.render()
    })
  }

  render(){
    this.el.classList.add('movie-list')
    this.el.innerHTML = /* html */`
      ${movieStore.state.message
        ? `<div class="message">${movieStore.state.message}</div>`
        : '<div class="movies"></div>'
      }
      <div class="the-loader hide"></div>
    `

    const moviesEl = this.el.querySelector('.movies')
    // 옵셔널 체이닝 방식을 사용한다. 왜냐면 movieStore.state.message의 상태에 따라 moviesEl가 null일 수도 있기 때문에. 
    moviesEl?.append(
      // map은 새로운 배열을 반환하는데, 배열은 string이 아니므로 전개 연산자를 통해 문자열로 만들어줘야 화면에 출력된다.
      ...movieStore.state.movies.map(movie => {  
        return new MovieItem({ // MovieItem 컴포넌트에 props로 영화 정보를 내려준다. 
          // movie: movie // movieStore에 담긴 movie 정보를 map으로 반복하는데 그걸 props로 내려준다.
          // 근데 속성 이름과 데이터 이름이 같으면 생략할 수 있으므로 movie 라고만 작성해줘도 된다. 
          movie 
        }).el
      })
    )

    const loaderEl = this.el.querySelector('.the-loader')
    movieStore.state.loading 
      ? loaderEl.classList.remove('hide') 
      : loaderEl.classList.add('hide') 
  }
}