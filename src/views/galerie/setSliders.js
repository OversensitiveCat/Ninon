import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, Observer)

import { settingsOne, goLeftOne, goRightOne } from './slideOne'

function keysGalerie(e) {
  if (e.key == 'ArrowLeft') {
    goLeftOne()
  } else if (e.key == 'ArrowRight') {
    goRightOne()
  }
}

const slidesGalerie = () => {
  // ALL
  settingsOne()
  window.addEventListener('resize', () => {
    settingsOne()
  })
  // Add Events
  const arrows = gsap.utils.toArray('.arrow-galerie')
  arrows[0].addEventListener('click', goLeftOne)
  arrows[1].addEventListener('click', goRightOne)
  window.addEventListener('keydown', keysGalerie)
  let events
  ScrollTrigger.create({
    trigger: '.portraits .photos-wrapper',
    start: 'center top',
    onEnter: () => {
      events = true
      console.log(events)
      window.removeEventListener('keydown', keysGalerie)
    },
    onLeaveBack: () => {
      events = false
      console.log(events)
      window.addEventListener('keydown', keysGalerie)
    },
  })

  // Add touch event for tablet & mobile
  let mm = gsap.matchMedia()
  mm.add('(max-width: 991px)', () => {
    Observer.create({
      target: '.portraits .photos-container',
      type: 'touch',
      tolerance: 60,
      onRight: () => goLeftOne(),
      onLeft: () => goRightOne(),
    })
  })
}

export { slidesGalerie, keysGalerie }
