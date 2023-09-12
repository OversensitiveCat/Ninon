import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let hamTrigger

const white = '#f7f4f4'
const black = '#141313'

function color(lines, color) {
  gsap.to(lines, { backgroundColor: color, duration: 0.25 })
}

const hamHome = () => {
  const lines = gsap.utils.toArray('.ham-line')

  hamTrigger = ScrollTrigger.create({
    trigger: '.section-agenda',
    start: 'top top',
    end: 'bottom top',
    onEnter: () => color(lines, black),
    onEnterBack: () => color(lines, black),
    onLeave: () => color(lines, white),
    onLeaveBack: () => color(lines, white),
  })
}

const hamHomeClear = () => {
  if (hamTrigger) {
    hamTrigger.kill()
  }
}

export { hamHome, hamHomeClear }
