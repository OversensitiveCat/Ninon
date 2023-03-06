import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import { keysGalerie } from '../../views/slider-galerie'
import { keysHome } from '../../views/slider-home'

gsap.registerPlugin(ScrollToPlugin)

const leaveTransition = (data, done) => {
  if (data.current.namespace == 'home') {
    console.log('removing home events')
    window.removeEventListener('keydown', keysHome)
  }
  if (data.current.namespace == 'galerie') {
    console.log('removing galerie events')
    window.removeEventListener('keydown', keysGalerie)
  }

  let tl = gsap.timeline({
    onComplete: () => {
      done()
      gsap.to(window, { scrollTo: 0, duration: 0 })
      data.current.container.remove()
    },
  })
  tl.set('.transition', { zIndex: 20 }).fromTo(
    '.transition',
    { yPercent: 100 },
    {
      yPercent: 0,
      ease: 'Power1.inOut',
      duration: 1,
    }
  )
  return tl
}

export default leaveTransition
