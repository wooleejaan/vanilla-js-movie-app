import { Component } from './core/kernel'
import TheHeader from './components/TheHeader'
import TheFooter from './components/TheFooter'

export default class App extends Component {
  render(){
    const theHeader = new TheHeader().el
    const theFooter = new TheFooter().el
    const routerView = document.createElement('router-view')

    // this.el.classList.add('app')
    // kernel 컴포넌트 클래스에서 속성에 접근 제어자 public을 붙여줬으므로 더 이상 에러 발생x
    this.el.append(
      theHeader,
      routerView,
      theFooter
    )
  }
}