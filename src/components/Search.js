import { Component } from "../core/kernel"
import movieStore, { searchMovies } from '../store/movie'

export default class Search extends Component {
  render(){
    this.el.classList.add('search')
    this.el.innerHTML = /* html */`
      <input 
        value="${movieStore.state.searchText}" 
        placeholder="Enter the movie title to search!" 
      />
      <button class="btn btn-primary">
        Search!
      </button>
    `

    const inputEl = this.el.querySelector('input')
    inputEl.addEventListener('input', () => {
      // 사용자가 입력하는 값이 searchText에 할당될 것이고 
      movieStore.state.searchText = inputEl.value 
    })
    // enter 키를 누르면 
    inputEl.addEventListener('keydown', (event) => {
      // 단순히 엔터키 누르는 것 말고도, 그 내용이 비어있지 않아야 하므로 trim()으로 공백을 제거하고도 값이 있을 때만 searchMovies 메서드 실행
      if(event.key === 'Enter' && movieStore.state.searchText.trim()){
        searchMovies(1) // 처음엔 page를 1로 해서 1~10 영화정보를 가져오도록 
      }
    })

    const btnEl = this.el.querySelector('.btn')
    btnEl.addEventListener('click', () => {
      // 마찬가지로 버튼을 클릭할 때는 input에 공백만 있는 경우는 막아준다. 
      if(movieStore.state.searchText.trim()){
        searchMovies(1)
      }
    })
  }
}