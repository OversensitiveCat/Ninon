import { gsap } from 'gsap'

import backToTop from './backToTop'
import footerFadeIn from './footerFadeIn'
const footer = () => {
  footerFadeIn()

  let mm = gsap.matchMedia()
  mm.add('(max-width: 991px)', () => backToTop())
}

export default footer
