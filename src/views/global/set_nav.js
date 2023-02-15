import barba from '@barba/core'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const setNav = (data) => {
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
    let hamburger = document.querySelector('.hamburger')
    const items = gsap.utils.toArray('.nav-item-mobile')
    console.log('nav is set')
    hamburger.addEventListener('click', () => {
      if (tlNav.progress() == 0) {
        tlNav.play()
        document.querySelector('.body').style.overflowY = 'hidden'
      } else if (tlNav.progress() == 1) {
        tlNav.reverse()
        document.querySelector('.body').style.overflowY = 'scroll'
      }
      console.log('click')
    })
    if (data.next.namespace == 'home') {
      console.log('home')
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
      items[2].addEventListener('click', () => {
        return
      })
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
      items[5].addEventListener('click', () => {
        return
      })
    } else {
      console.log('not home')
      items[0].addEventListener('click', () => {
        barba.go('.')
        gsap.delayedCall(2, () => {
          tlNav.progress(0)
          tlNav.pause()
        })
        gsap.delayedCall(3.5, () => {
          gsap.to(window, { duration: 1, scrollTo: '.section-about' })
        })
        document.querySelector('.body').style.overflow = 'scroll'
      })
      items[1].addEventListener('click', () => {
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
      })
      items[2].addEventListener('click', () => {
        return
      })
      items[3].addEventListener('click', () => {
        barba.go('.')
        gsap.delayedCall(2, () => {
          tlNav.progress(0)
          tlNav.pause()
        })
        gsap.delayedCall(3.5, () => {
          gsap.to(window, { duration: 1.5, scrollTo: '.section-ecouter' })
        })
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
      items[5].addEventListener('click', () => {
        return
      })
    }
  }
  return gsap.delayedCall(1, set)
}

export default setNav
