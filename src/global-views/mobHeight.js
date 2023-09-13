import gsap from 'gsap'

import { touchDevice } from '../utilities/utilities'

const mobHeight = (section) => {
  if (touchDevice()) {
    gsap.set(section, { height: window.innerHeight })
  }
}

export default mobHeight
