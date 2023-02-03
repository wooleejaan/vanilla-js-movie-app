import { Store } from "../core/kernel"
import userImage from '../public/android-chrome-512x512.png'

interface State {
  photo: string 
  name: string 
  email: string 
  blog: string
  github: string 
  repository: string 
}

export default new Store<State>({
  photo: `${userImage}`,
  name: 'WOOLEE / we are woolee',
  email: 'wooleejaan@gmail.com',
  blog: 'https://velog.io/@wejaan',
  github: 'https://github.com/wooleejaan',
  repository: 'https://github.com/wooleejaan/vanilla-js-ipad-clone'
})