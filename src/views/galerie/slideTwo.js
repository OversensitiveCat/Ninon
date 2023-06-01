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
  let mm = gsap.matchMedia()
  percent = -700
  arrowLeftOff = -100
  arrowLeftOn = 0
  arrowRightOff = -1600
  arrowRightOn = -1700
  stopLeft = 0
  stopRight = -1700
  active = 7

  mm.add('(min-width: 992px)', () => {
    gsap.set('#arrow-left2, #arrow-right2', {
      attr: { stroke: '#a80000' },
    })
    gsap.set('#arrow-left3, #arrow-right3', {
      attr: { stroke: '#f7f4f4' },
    })
  })
  // mm.add('(max-width: 991px)', () => {
  //   gsap.set('#arrow-left2', { attr: { stroke: '#201f1f' } })
  //   gsap.set('#arrow-right2', { attr: { stroke: '#a80000' } })
  // }) #f7f4f4
}

function getActivePosition() {
  const photos = gsap.utils.toArray('.overview-photo')
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
  const photos = gsap.utils.toArray('.overview-photo')
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
      attr: { stroke: '#a80000' },
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
    gsap.to('#arrow-left2', { attr: { stroke: '#a80000' }, duration: 0.25 })
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
