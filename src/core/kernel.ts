///// Component /////
interface ComponentPayload {
  // 속성들을 안 쓸 수 있으므로 전부 ?:로 변경해준다.
  tagName?: string 
  props?: {
    // 어떤 값이 들어올지 모르므로, 인덱스 가능 타입으로 
    [key: string]: unknown
  }
  state?: {
    [key: string]: unknown
  }
}

export class Component {
  // this 키워드로 사용할 수 있는 속성들은 이렇게 class의 바디(body) 부분에서 선언을 먼저 해줘야 하므로
  // 접근 제어자도 붙여준다.
  public el 
  public props
  public state 
  constructor(payload: ComponentPayload = {}) {
    const {
      tagName = 'div', // 최상위 요소의 태그 이름
      props = {},
      state = {}
    } = payload
    this.el = document.createElement(tagName) // 컴포넌트의 최상위 요소
    this.props = props // 컴포넌트가 사용될 때 부모 컴포넌트에서 받는 데이터
    this.state = state // 컴포넌트 안에서 사용할 데이터
    this.render()
  }
  render() { // 컴포넌트를 렌더링하는 함수
    // ...
  }
}


///// Router /////
interface Route {
  path: string
  component: typeof Component // component의 타입은 클래스인데, 이 클래스는 Component를 확장한 것이므로 Component의 타입과 같다.  
}
type Routes = Route[]

// 페이지 렌더링!
function routeRender(routes: Routes) {
  // 접속할 때 해시 모드가 아니면(해시가 없으면) /#/로 리다이렉트!
  if (!location.hash) {
    history.replaceState(null, '', '/#/') // (상태, 제목, 주소)
  }
  const routerView = document.querySelector('router-view')
  const [hash, queryString = ''] = location.hash.split('?') // 물음표를 기준으로 해시 정보와 쿼리스트링을 구분

  // 1) 쿼리스트링을 객체로 변환해 히스토리의 상태에 저장!
  interface Query {
    // 인덱스 가능 문법 
    [key: string]: string 
  }
  const query = queryString
    .split('&')
    .reduce((acc, cur) => {
      const [key, value] = cur.split('=')
      acc[key] = value
      return acc
    }, {} as Query) // 쿼리 인터페이스처럼 사용되어야 한다는 의미로 타입 단언을 해준다. 
  history.replaceState(query, '') // (상태, 제목)

  // 2) 현재 라우트 정보를 찾아서 렌더링!
  const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash))
  if(routerView){ // 타입 가드 
    routerView.innerHTML = ''
    currentRoute && routerView.append(new currentRoute.component().el)
  }

  // 3) 화면 출력 후 스크롤 위치 복구!
  window.scrollTo(0, 0)
}
export function createRouter(routes: Routes) {
  // 원하는(필요한) 곳에서 호출할 수 있도록 함수 데이터를 반환!
  return function () {
    window.addEventListener('popstate', () => {
      routeRender(routes)
    })
    routeRender(routes)
  }
}


///// Store /////
interface StoreObservers {
  // key는 string, value는 콜백함수여야 하므로 인터페이스를 하나 더 만들어줘야 한다. 
  [key: string]: SubScribeCallback[]
}
interface SubScribeCallback {
  // 호출 시그니처, 
  (arg: unknown): void // 콜백함수의 경우 실행하는 개념만 있으므로, 함수에서 데이터를 반환해도 쓸 수 없으니까 void 
}

export class Store<S> {
  public state = {} as S // 상태(데이터)
  // 내부에서만 사용하므로 private
  private observers = {} as StoreObservers
  constructor(state: S) {
    for (const key in state) {
      // 각 상태에 대한 변경 감시(Setter) 설정!
      Object.defineProperty(this.state, key, {
        // Getter
        get: () => state[key],
        // Setter
        set: val => {
          state[key] = val
          if (Array.isArray(this.observers[key])) { // 호출할 콜백이 있는 경우!
            this.observers[key].forEach(observer => observer(val))
          }
        }
      })
    }
  }
  // 상태 변경 구독!
  // key는 상태의 이름이므로 string, cb는 콜백함수이므로
  subscribe(key: string, cb: SubScribeCallback) { 
    Array.isArray(this.observers[key]) // 이미 등록된 콜백이 있는지 확인!
      ? this.observers[key].push(cb) // 있으면 새로운 콜백 밀어넣기!
      : this.observers[key] = [cb] // 없으면 콜백 배열로 할당!

    // 예시)
    // observers = {
    //   구독할상태이름: [실행할콜백1, 실행할콜백2]
    //   movies: [cb, cb, cb],
    //   message: [cb]
    // }
  }
}