import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let backTrigger

const navBackground = () => {
  backTrigger = gsap.to('.nav-bar-container', {
    backgroundColor: '#141313',
    scrollTrigger: {
      trigger: '.main',
      start: '0%-=64px top',
      end: 'top top',
      scrub: true,
    },
  })
}

const navBackgroundClear = () => {
  backTrigger.kill()
}

export { navBackground, navBackgroundClear }
