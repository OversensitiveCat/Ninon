import barba from '@barba/core'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import tlNav from './tlNav'

gsap.registerPlugin(ScrollToPlugin)

const navEventsHome = () => {
  const items = gsap.utils.toArray('.nav-item-mobile')

  items[0].addEventListener('click', () => {
    gsap.to(window, { duration: 0, scrollTo: '.section-about' })
    tlNav.reverse()
    document.querySelector('.body').style.overflow = 'scroll'
  })
  items[1].addEventListener('click', () => {
    gsap.to(window, { duration: 0, scrollTo: '.section-projets-mob' })
    tlNav.reverse()
    document.querySelector('.body').style.overflow = 'scroll'
  })
  // items[2].addEventListener('click', () => {
  //   barba.go('./calendrier')
  // gsap.delayedCall(0.7, () => {
  //   tlNav.progress(0)
  //   tlNav.pause()
  // })
  // document.querySelector('.body').style.overflow = 'scroll'
  // })
  items[3].addEventListener('click', () => {
    gsap.to(window, { duration: 0, scrollTo: '.section-ecouter' })
    tlNav.reverse()
    document.querySelector('.body').style.overflow = 'scroll'
  })
  items[4].addEventListener('click', () => {
    barba.go('./archives')
    gsap.delayedCall(2, () => {
      tlNav.progress(0)
      tlNav.pause()
    })
    document.querySelector('.body').style.overflow = 'scroll'
  })
  // items[5].addEventListener('click', () => {
  //   gsap.to(window, { duration: 0, scrollTo: { y: 'max' } })
  //   tlNav.reverse()
  //   document.querySelector('.body').style.overflow = 'scroll'
  // })
}

export default navEventsHome
