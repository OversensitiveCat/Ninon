import { gsap } from 'gsap'

import { lenis } from '../global-views/lenis'
import { vidsLoaded } from '../utilities/loading'

const leaveVids = (data, done) => {
  lenis.stop()
  let tl = gsap.timeline()
  tl.set('.transition', { zIndex: 200 }).fromTo(
    '.transition',
    { yPercent: 100 },
    {
      yPercent: 0,
      ease: 'Power1.inOut',
      duration: 1,
    }
  )

  tl.then(() => {
    vidsLoaded(function () {
      data.current.container.remove()
      let vid = data.next.container.querySelector('.section-hero video')
      vid.muted = true
      vid.play()
      window.scrollTo(0, 0)
      done()
    })
  })
}

export default leaveVids
