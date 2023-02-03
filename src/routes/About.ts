import { Component } from "../core/kernel"
import aboutStore from '../store/about'

export default class About extends Component {
  render(){

    const { photo, name, email, blog, github } = aboutStore.state

    this.el.classList.add('container', 'about')
    this.el.innerHTML = /* html */`
      <!-- 스타일로 이미지를 넣으면 요소 내부에 글자 안 넣어도 이미지 보여주니까. -->
      <div 
        class="photo"
        style="background-image: url(${photo})"
      >
      </div>

      <p class="name">${name}</p>

      <p><a href="https://mail.google.com/mail/?view=cm&fs=1&to=${email}" target="_blank">${email}</a></p>
      <p><a href="${github}" target="_blank">GitHub</a></p>
      <p><a href="${blog}" target="_blank">Blog</a></p>
    `
  }
}