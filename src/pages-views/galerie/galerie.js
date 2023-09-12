import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { eventsAdd, eventsInit, eventsRemove, eventsClear } from './events'
import {
  portraitsAdd,
  portraitsInit,
  portraitsRemove,
  portraitsClear,
} from './portraits'

gsap.registerPlugin(ScrollTrigger)

const galerie = () => {
  portraitsInit()
  eventsInit()
  portraitsAdd()

  ScrollTrigger.create({
    trigger: '#portraits .photos-wrapper',
    start: 'center top',
    onEnter: () => {
      portraitsRemove()
      eventsAdd()
    },
    onLeaveBack: () => {
      eventsRemove()
      portraitsAdd()
    },
  })
}

const galerieClear = () => {
  portraitsClear()
  eventsClear()
}

export { galerie, galerieClear }
