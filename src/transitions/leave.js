import { gsap } from 'gsap'

import { lenis } from '../global-views/lenis'

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
    data.current.container.remove()
    window.scrollTo(0, 0)
    done()
    let video = data.next.container.querySelector('.section-hero video')
    if (video) {
      video.muted = true
      video.play()
    }
  })
}

export default leave
