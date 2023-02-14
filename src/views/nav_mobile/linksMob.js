import barba from '@barba/core'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import tlNav from './tlNav'

gsap.registerPlugin(ScrollToPlugin)

function navEvents(item) {
  const items = gsap.utils.toArray('.nav-item-mobile')

  if (items.indexOf(item) == 0) {
    barba.go('.')
    gsap.delayedCall(2, () => {
      tlNav.progress(0)
      tlNav.pause()
    })
    gsap.delayedCall(3.5, () => {
      gsap.to(window, { duration: 1, scrollTo: '.section-about' })
    })
    document.querySelector('.body').style.overflow = 'scroll'
  } else if (items.indexOf(item) == 1) {
    barba.go('.')
    gsap.delayedCall(2, () => {
      tlNav.progress(0)
      tlNav.pause()
    })
    gsap.delayedCall(3.5, () => {
      gsap.to(window, {
        duration: 1.25,
        scrollTo: '.section-projets-mob',
      })
    })
    document.querySelector('.body').style.overflow = 'scroll'
  } else if (items.indexOf(item) == 2) {
    return
  } else if (items.indexOf(item) == 3) {
    barba.go('.')
    gsap.delayedCall(2, () => {
      tlNav.progress(0)
      tlNav.pause()
    })
    gsap.delayedCall(3.5, () => {
      gsap.to(window, { duration: 1.5, scrollTo: '.section-ecouter' })
    })
    document.querySelector('.body').style.overflow = 'scroll'
  } else if (items.indexOf(item) == 4) {
    barba.go('./archives')
    gsap.delayedCall(2, () => {
      tlNav.progress(0)
      tlNav.pause()
    })
    document.querySelector('.body').style.overflow = 'scroll'
  } else if (items.indexOf(item) == 5) {
    return
  }
}

export default navEvents
