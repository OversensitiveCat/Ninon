import { gsap } from 'gsap'
import imagesLoaded from 'imagesloaded'

import { lenis } from '../global-views/lenis'

const leaveToGalerie = (data, done) => {
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
    let imgLoad = imagesLoaded(data.next.container)
    imgLoad.on('done', function () {
      data.current.container.remove()
      window.scrollTo(0, 0)
      done()
    })
  })
}

export default leaveToGalerie
