import { Store } from "../core/kernel"

const store = new Store({
  searchText: '',
  page: 1,
  pageMax: 1,
  movies: [], // movies는 영화 정보로 계속 업데이트 된다. 
  movie: {}, // 영화 상세 페이지에 들어갈 상세 정보 관리하는 store 
  loading: false,
  message: 'Search for the movie title!'
})

// store는 상태 부분(데이터), searchMovies는 데이터를 취급하는 함수 
export default store 
export const searchMovies = async page => {
  store.state.loading = true 

  // 더보기 버튼을 누르면 page를 매개변수로 계속 증가시켜서 넘겨받는데, 그걸 store.state.page 변수도 계속 업데이트해줘야 하므로 
  store.state.page = page

  // 새로운 내용을 검색하면 기존 영화 정보가 지워져야 한다. 
  // 새로운 내용을 검색한다는 건 결국 == 다시 page가 1이 된다는 의미이다. 
  if(page === 1){
    // store.state.page = 1 // store에 있는 page 정보도 초기화해줘야 한다. (근데 "store.state.page = page"로 충분하므로 이건 지워준다.)
    store.state.movies = []
    store.state.message = '' // 처음 받아왔을 때는 메시지를 보여주면 안 되니까 빈 문자열을 넣는다.
  }

  try {
    const res = await fetch(`https://omdbapi.com?apikey=7035c60c&s=${store.state.searchText}&page=${page}`)
    // const json = await res.json()
  
    // 더보기 버튼 기능을 구현하려면 totalResults도 가져와야 한다.  
    const { Search, totalResults, Response, Error } = await res.json() // 영화 정보를 구조분해할당으로 가져온 뒤에,
  
    if(Response === 'True'){
      store.state.movies = [ // movies에 영화 정보를 넣을 건데, 
        ...store.state.movies, // 예를 들어 기존 1~n번 영화 정보(1~10, ..., n~n+10)이 있으면 
        ...Search // 새로 받아온 n+1번 영화 정보(n+1~n+11)이 들어갈 수 있게 전개연산자로 삽입한다. 
      ]
    
      // 문자로 받아오므로 숫자로 변경하고, 10개씩 가져오니까 10으로 나누고 올림 처리한다(페이지 개념이니까 예를 들어 4.2면 5개의 페이지가 있어야 하니까).  
      store.state.pageMax = Math.ceil(Number(totalResults) / 10)
    } else {
      store.state.message = Error 
    }
  } catch(error){
    // 혹시라도 fetch 함수에서 문제가 생기면 여기서 예외처리를 해줘서 js가 멈추는 일이 없도록. 
    // fetch에서 에러가 생겨서 멈추면 그 이후에 모든 js 코드들이 멈추게 되니까 에러처리를 반드시 해줘야 한다. 
    console.log('searchMovies error: ', error)
  } finally {
    // 로딩을 멈추는 건 무조건 실행해야 하므로 여기에 넣는다. 
    store.state.loading = false
  }
}

export const getMovieDetails = async id => {
  try {
    const res = await fetch(`https://omdbapi.com?apikey=7035c60c&i=${id}&plot=full`)
    store.state.movie = await res.json()
  } catch(error){
    console.log('getMovieDetails error: ', error)
  }
}