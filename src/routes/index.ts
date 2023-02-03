import { createRouter } from'../core/kernel'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'

export default createRouter([
  { path: '#/', component: Home },
  { path: '#/movie', component: Movie }, // movieItem에서 a 링크로 `#/movie?id=${movie.imdbID}`로 이동하기 때문에 
  { path: '#/about', component: About },
  // { path: '.${0,}', component: NotFound } 
  { path: '.*', component: NotFound } 
  // 여기서의 path는 kernel routeRender 함수에서 정규표현식으로 처리를 할텐데, 정규표현식에 .은 임의의 모든 문자를 의미한다. 
  // {0,} 을 붙이면 모든 문자 0개 이상을 의미한다. 
  // 마지막에다가 .${0,} 을 작성하면 앞에서 순서대로 체크해서 주어진 경로를 제외한 나머지 문자들을 notfound 로 처리하는 로직이다. 
  // .${0,} 을 단순하게 .*로 축약해서 쓸 수도 있다. 
])