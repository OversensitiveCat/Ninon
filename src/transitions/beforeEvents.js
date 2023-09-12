import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

import { lenis } from '../global-views/lenis'

const beforeEvents = (pageEnter) => {
  let tl = gsap.timeline({ onComplete: () => tl.play() })
  tl.set(window, { scrollTo: '.events' })
    .fromTo(
      '.transition',
      { yPercent: 0 },
      {
        yPercent: -100,
        ease: 'Power1.inOut',
        duration: 0.5,
      }
    )
    .set('.transition', { zIndex: -200, yPercent: 100 })

  tl.then(() => {
    pageEnter()
    lenis.start()
  })
}

export default beforeEvents
