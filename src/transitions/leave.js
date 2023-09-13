import { gsap } from 'gsap'

import { lenis } from '../global-views/lenis'
import { imgsLoaded } from '../utilities/loading'

const leave = (data, done) => {
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
    imgsLoaded(data.next.container, function () {
      data.current.container.remove()
      window.scrollTo(0, 0)
      done()
    })
  })
}

export default leave
