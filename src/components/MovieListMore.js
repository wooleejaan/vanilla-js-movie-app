import { Component } from '../core/kernel'
import movieStore, { searchMovies } from '../store/movie'

export default class MovieListMore extends Component {
  constructor(){
    super({
      tagName: 'button' // 더보기 버튼이므로
    })
    // 첫번째 인자는 감시하고자 하는 상태이름, 두번째 인자는 해당 상태값이 변경될 때마다 실행할 콜백함수 
    movieStore.subscribe('pageMax', () => {
      // movieStore.state.page
      // movieStore.state.pageMax 
      const { page, pageMax } = movieStore.state

      pageMax > page // 가져올 데이터가 남아 있다면 더보기 버튼을 보여준다. 
        ? this.el.classList.remove('hide') 
        : this.el.classList.add('hide')
    })
  }
  render(){
    this.el.classList.add('btn', 'view-more', 'hide') // 클래스 여러 개 추가 (hide 클래스를 붙여서 처음에는 안 보이도록)
    this.el.textContent = 'View more..'
    
    this.el.addEventListener('click', async () => {
      // 버튼을 누르면 hide를 추가해서 사용자가 버튼을 또 누르는 걸 방지해준다. 어차피 위에서 subscribe로 버튼 hide를 관리하기도 하기 때문에 
      this.el.classList.add('hide')
      // store에서 만들어 놓은 searchMovies 함수를 실행하면 영화 정보를 계속 받아올 수 있다.
      await searchMovies(movieStore.state.page + 1) // 페이지 번호를 증가시켜야 다음 목록들을 가져올 수 있으므로
    })
  }
}