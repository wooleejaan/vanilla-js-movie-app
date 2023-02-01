import { Component } from "../core/kernel"

export default class MovieItem extends Component {
  constructor(props){ // 부모 컴포넌트로부터 영화 정보를 props로 받아 준다.
    super({
      props,
      tagName: 'a', // 목록을 클릭하면 상세페이지로 이동해야 하므로 
    })
  }
  render(){
    const { movie } = this.props // props로 영화 정보를 구조분해할당으로 꺼내서 쓴다.  

    this.el.setAttribute('href', `#/movie?id=${movie.imdbID}`)
    this.el.classList.add('movie')
    this.el.style.backgroundImage = `url(${movie.Poster})`
    this.el.innerHTML = /* html */`
      <div class="info">
        <div class="year">
          ${movie.Year}
        </div>
        <div class="title">
          ${movie.Title}
        </div>
      </div>
    `
  }
}