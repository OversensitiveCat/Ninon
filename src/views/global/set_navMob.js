import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const setNavMob = () => {
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
      console.log('nav mobile is set')
      hamburger.addEventListener('click', () => {
        if (tlNav.progress() == 0) {
          tlNav.play()
          document.querySelector('.body').style.overflowY = 'hidden'
        } else if (tlNav.progress() == 1) {
          tlNav.reverse()
          document.querySelector('.body').style.overflowY = 'scroll'
        }
      })
    })
  }
  return gsap.delayedCall(1, set)
}

export default setNavMob
