import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, Observer)

import { settingsOne, goLeftOne, goRightOne } from './slideOne'
import { settingsTwo, goLeftTwo, goRightTwo } from './slideTwo'

function keysGalerieOne(e) {
  if (e.key == 'ArrowLeft') {
    goLeftOne()
  } else if (e.key == 'ArrowRight') {
    goRightOne()
  }
}
function keysGalerieTwo(e) {
  if (e.key == 'ArrowLeft') {
    goLeftTwo()
  } else if (e.key == 'ArrowRight') {
    goRightTwo()
  }
}

const slidesGalerie = () => {
  // ALL
  settingsOne()
  settingsTwo()
  window.addEventListener('resize', () => {
    settingsOne()
  })
  // Add Events
  const arrows = gsap.utils.toArray('.arrow-galerie')
  const arrowsOverview = gsap.utils.toArray('.arrow-overview')
  arrows[0].addEventListener('click', goLeftOne)
  arrows[1].addEventListener('click', goRightOne)
  arrows[2].addEventListener('click', goLeftTwo)
  arrows[3].addEventListener('click', goRightTwo)
  arrowsOverview[0].addEventListener('click', goLeftTwo)
  arrowsOverview[1].addEventListener('click', goRightTwo)
  window.addEventListener('keydown', keysGalerieOne)
  ScrollTrigger.create({
    trigger: '.portraits .photos-wrapper',
    start: 'center top',
    onEnter: () => {
      window.removeEventListener('keydown', keysGalerieOne)
      window.addEventListener('keydown', keysGalerieTwo)
    },
    onLeaveBack: () => {
      window.removeEventListener('keydown', keysGalerieTwo)
      window.addEventListener('keydown', keysGalerieOne)
    },
  })

  // Add touch event for tablet & mobile
  let mm = gsap.matchMedia()
  mm.add('(max-width: 991px)', () => {
    Observer.create({
      target: '.portraits .photos-container',
      type: 'touch',
      tolerance: 80,
      onRight: () => goLeftOne(),
      onLeft: () => goRightOne(),
    })
    Observer.create({
      target: '.events .photos-container',
      type: 'touch',
      tolerance: 80,
      onRight: () => goLeftTwo(),
      onLeft: () => goRightTwo(),
    })
  })
}

export { slidesGalerie, keysGalerieOne, keysGalerieTwo }
