import { gsap } from 'gsap'
import imagesLoaded from 'imagesloaded'

import { lenis } from '../global-views/lenis'

// BASIC ENTER
const beforeAgenda = (pageEnter) => {
  let tl = gsap.timeline({ paused: true, onComplete: () => tl.play() })
  tl.fromTo(
    '.transition',
    { yPercent: 0 },
    {
      yPercent: -100,
      ease: 'Power1.inOut',
      duration: 1,
      delay: 0.5,
    }
  ).set('.transition', { zIndex: -200, yPercent: 100 })

  imagesLoaded('.section-hero-agenda', { background: true }, function () {
    tl.play()
  })

  tl.then(() => {
    pageEnter()
    lenis.start()
  })
}

export default beforeAgenda
