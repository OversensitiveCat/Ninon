import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, Observer)

let percent,
  position,
  arrowLeftOff,
  arrowLeftOn,
  arrowRightOff,
  arrowRightOn,
  stopLeft,
  stopRight,
  active

function init() {
  const events = gsap.utils.toArray('.events .photos-item-event')
  let mm = gsap.matchMedia()
  percent = 0
  arrowLeftOff = -100
  arrowLeftOn = 0
  arrowRightOff = (-events.length + 2) * 100
  arrowRightOn = (-events.length + 1) * 100
  stopLeft = 0
  stopRight = (-events.length + 1) * 100
  active = 0

  mm.add('(min-width: 992px)', () => {
    gsap.set('#arrow-right2', {
      attr: { stroke: '#b40000' },
    })
    gsap.set('#arrow-right3', {
      attr: { stroke: '#f7f4f4' },
    })
    gsap.set('#arrow-left2, #arrow-left3', {
      attr: { stroke: '#201f1f' },
    })
  })
}

function getActivePosition() {
  const photos = gsap.utils.toArray('.overview')
  const wrapper = document.querySelector('.overview-wrapper')
  let distance = 0
  for (let i = 0; i < active; i++) {
    distance += photos[i].clientWidth
  }
  let half = photos[active].clientWidth / 2
  let x = wrapper.clientWidth / 2
  position = -(distance + half - x)
}

function transform() {
  const photos = gsap.utils.toArray('.overview')
  gsap.to('.events .photos-wrapper', {
    xPercent: percent,
    duration: 0.8,
    ease: 'power1.inOut',
  })
  gsap.to('.overview-wrapper', {
    x: position,
    duration: 0.8,
    ease: 'power1.inOut',
  })
  photos.forEach((photo) => {
    if (photos.indexOf(photo) === active) {
      gsap.to(photo, { filter: 'none', duration: 0.8 })
    } else {
      gsap.to(photo, { filter: 'grayscale(100%)', duration: 0.8 })
    }
  })
}

function settingsTwo() {
  init()
  getActivePosition()
  transform()
}

function goLeftTwo() {
  if (percent == arrowLeftOff) {
    gsap.to('#arrow-left2, #arrow-left3', {
      attr: { stroke: '#201f1f' },
      duration: 0.25,
    })
  }
  if (percent == arrowRightOn) {
    gsap.to('#arrow-right2', {
      attr: { stroke: '#b40000' },
      duration: 0.25,
    })
    gsap.to('#arrow-right3', {
      attr: { stroke: '#f7f4f4' },
      duration: 0.25,
    })
  }
  if (percent == stopLeft) {
    return
  } else {
    percent += 100
    active -= 1
    getActivePosition()
    transform()
  }
}

function goRightTwo() {
  if (percent == arrowRightOff) {
    gsap.to('#arrow-right2, #arrow-right3', {
      attr: { stroke: '#201f1f' },
      duration: 0.25,
    })
  }
  if (percent == arrowLeftOn) {
    gsap.to('#arrow-left2', { attr: { stroke: '#b40000' }, duration: 0.25 })
    gsap.to('#arrow-left3', { attr: { stroke: '#f7f4f4' }, duration: 0.25 })
  }
  if (percent == stopRight) {
    return
  } else {
    percent -= 100
    active += 1
    getActivePosition()
    transform()
  }
}

export { goLeftTwo, goRightTwo, settingsTwo }
