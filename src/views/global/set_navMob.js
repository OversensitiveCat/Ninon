import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import lenis from './lenis'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const setNavMob = (data) => {
  let red = false
  let black = false
  const goBlack = () => {
    gsap.to('.ham-line1, .ham-line2', { backgroundColor: '#141313' })
  }
  const goWhite = () => {
    gsap.to('.ham-line1, .ham-line2', { backgroundColor: '#f7f4f4' })
  }
  const goRed = () => {
    gsap.to('.ham-line1, .ham-line2', { backgroundColor: '#a80000' })
  }
  if (data.next.namespace == 'agenda') {
    red = true
  }
  if (data.next.namespace == 'home') {
    ScrollTrigger.create({
      trigger: '.card-agenda',
      start: 'top top',
      end: 'bottom 40',
      onEnter: () => {
        goBlack()
        black = true
      },
      onEnterBack: () => {
        goBlack()
        black = true
      },
      onLeave: () => {
        goWhite()
        black = false
      },
      onLeaveBack: () => {
        goWhite()
        black = false
      },
    })
  }
  ScrollTrigger.create({
    trigger: '.content-wrapper',
    start: 'bottom 40',
    onEnter: () => {
      goBlack()
      black = true
    },
    onLeaveBack: () => {
      goWhite()
      black = false
    },
  })

  let tlNav = gsap.timeline({ paused: true })
  tlNav
    .to('.nav-mobile-container', {
      width: '100%',
      height: '100%',
      duration: 0,
    })
    .to('.nav-mobile-container', {
      backgroundColor: '#141313',
      duration: 0.4,
    })
    .to('.ham-line1', { duration: 0.8, top: 39, rotate: 405 }, '<')
    .to('.ham-line2', { duration: 0.8, top: 39, rotate: -405 }, '<')
    .fromTo(
      '.nav-item-mobile',
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.2,
        yPercent: 60,
      },
      '<'
    )

  function set() {
    let mm = gsap.matchMedia()
    mm.add('(max-width: 991px)', () => {
      let hamburger = document.querySelector('.hamburger')
      const navItems = gsap.utils.toArray('.nav-item-mobile')
      hamburger.addEventListener('click', () => {
        if (tlNav.progress() == 0) {
          tlNav.play()
          lenis.stop()
          if (black === true) {
            goWhite()
          }
          if (red === true) {
            goRed()
          }
        } else if (tlNav.progress() == 1) {
          tlNav.reverse()
          lenis.start()
          if (black === true) {
            gsap.delayedCall(1, () => goBlack())
          }
          if (red === true) {
            gsap.delayedCall(1, () => goWhite())
          }
        }
      })
      navItems.forEach((item) => {
        if (navItems.indexOf(item) != 5) {
          item.addEventListener('click', () =>
            gsap.delayedCall(1.5, () => lenis.start())
          )
        }
      })
    })
  }
  return gsap.delayedCall(1, set)
}

export default setNavMob
