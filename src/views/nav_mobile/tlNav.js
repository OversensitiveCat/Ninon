import { gsap } from 'gsap'

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
    '-=0.4'
  )

export default tlNav
