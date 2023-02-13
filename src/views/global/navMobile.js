import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navMobile = () => {
  let tl = gsap.timeline({ paused: true })
  tl.to('.nav-page-mobile', { zIndex: 3, duration: 0 })
    .from('.nav-page-mobile', { height: '0%', duration: 0.5 }, '<')
    .to('.close-line1', { duration: 1, autoAlpha: 1, rotate: 45 }, '<')
    .to('.close-line2', { duration: 1, autoAlpha: 1, rotate: -45 }, '<')
    .from(
      '.nav-item-mobile',
      {
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.2,
        yPercent: 60,
      },
      '-=0.4'
    )

  document.querySelector('.nav-open').addEventListener('click', () => {
    tl.play()
    document.querySelector('.body').style.overflowY = 'hidden'
  })
  document.querySelector('.nav-close').addEventListener('click', () => {
    tl.reverse()
    document.querySelector('.body').style.overflowY = 'scroll'
  })
}

export default navMobile
