import { Component } from "../core/kernel"
import aboutStore from '../store/about'

export default class TheFooter extends Component {
  constructor(){
    super({
      tagName: 'footer'
    })
  }
  render(){
    const { github, repository } = aboutStore.state 

    this.el.innerHTML = /* html */`
      <div>
        <!-- 나의 gitHub Repository 계정 주소 -->
        <a 
          href="${repository}"
        >
          GitHub Repository
        </a>
      </div>
      <div>
        <!-- 나의 gitHub 계정 주소 -->
        <a 
          href="${github}"
        >
          ${new Date().getFullYear()}
          woolee  
        </a>
      </div>
    `
  }
}