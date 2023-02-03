import { Component } from "../core/kernel"
import userIcon from '../public/favicon-32x32.png'

interface State {
  [key: string]: unknown
  menus: {
    name: string 
    href: string 
  }[]
}

export default class TheHeader extends Component {
  public state!: State
  constructor(){
    super({
      tagName: 'header',
      state: {
        menus: [
          {
            name: 'Search',
            href: '#/'
          },
          {
            name: 'Movie',
            href: '#/movie?id=tt4520988' // 버튼을 눌러서 접근하는 상세 페이지의 경우 샘플 영화의 상세페이지를 보여줄거야. 
          },
          {
            name: 'About',
            href: '#/about' // about 페이지는 아직 만들지 않았지만
          },
        ]
      }
    })
    window.addEventListener('popstate', () => {
      this.render()
    })
  }
  render(){
    this.el.innerHTML = /* html */`
      <a 
        class="logo" 
        href="#/"
      >
        <span>OMDbAPI</span>.COM
      </a>

      <nav>
        <ul>
          ${this.state.menus.map(menu => {
            // 상세페이지의 경우 쿼리스트링 뒤 id값은 매번 달라질 수 있으므로 분리해준다. 
            const href = menu.href.split('?')[0] // 이동할 페이지 주소 
            const hash = location.hash.split('?')[0] // 현재 페이지 주소
            const isActive = href === hash 

            return /* html */`
              <li>
                <a 
                  class="${isActive ? 'active' : ''}"
                  href="${menu.href}"
                >
                  ${menu.name}
                </a>
              </li>
            `
          }).join('')}
        </ul>
      </nav>

      <a 
        class="user" 
        href="#/about"
      >
        <img src="${userIcon}" alt="User" />
      </a>
    `
  }
}