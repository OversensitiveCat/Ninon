import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'

import { resizeX, touchDevice } from '../../utilities/utilities'

gsap.registerPlugin(Observer)

// Photos
let items
let list
let arrowLeft
let arrowRight

// Overview
let overviewList
let overviewItems
let overviewArrowLeft
let overviewArrowRight

let arrows

// Data
let xPercent
let current
let max
let nbr
let distance
let half
let x

let active = false

const min = 0
const percent = 100
const d = 0.8
const red = '#b40000'
const grey = '#201f1f'
const white = '#f7f4f4'

// Utilities
function toogleStroke(arrow, color) {
  gsap.to(arrow, {
    attr: { stroke: color },
    duration: 0.25,
  })
}

function getCurrentPosition() {
  distance = 0
  for (let i = 0; i < current; i++) {
    distance += overviewItems[i].clientWidth
  }
  half = overviewItems[current].clientWidth / 2
  x = overviewList.clientWidth / 2
  return -(distance + half - x)
}

// Init
function initDom() {
  // Photos
  list = document.querySelector('.photos-events-list')
  items = gsap.utils.toArray('#events .photo-event-item')
  arrowLeft = document.querySelector('#arrow-left2')
  arrowRight = document.querySelector('#arrow-right2')

  // Overview
  overviewArrowLeft = document.querySelector('#arrow-left3')
  overviewArrowRight = document.querySelector('#arrow-right3')
  overviewList = document.querySelector('.overview-list')
  overviewItems = gsap.utils.toArray('.overview')

  // Arrows
  arrows = gsap.utils.toArray('#events .arrow-galerie, .arrow-overview')
}

function initData() {
  xPercent = 0
  current = 0
  nbr = items.length
  max = -percent * (nbr - 1)

  // Set arrows
  toogleStroke(arrowLeft, grey)
  toogleStroke(arrowRight, red)
  toogleStroke(overviewArrowLeft, grey)
  toogleStroke(overviewArrowRight, white)
}

// Slide & transform
function translate() {
  gsap.to(list, { xPercent: xPercent, duration: d, ease: 'power1.inOut' })
}

function transform() {
  gsap.to(overviewList, {
    x: getCurrentPosition,
    duration: d,
    ease: 'power1.inOut',
  })
  overviewItems.forEach((item) => {
    if (overviewItems.indexOf(item) === current) {
      gsap.to(item, { filter: 'none', duration: d })
    } else {
      gsap.to(item, { filter: 'grayscale(100%)', duration: d })
    }
  })
}

// Events
function goLeft() {
  if (xPercent === min || active) return

  if (touchDevice()) {
    active = true
    gsap.delayedCall(d, () => {
      active = false
    })
  }

  xPercent += percent
  current -= 1
  translate()
  transform()

  if (xPercent === min) {
    toogleStroke(arrowLeft, grey)
    toogleStroke(overviewArrowLeft, grey)
  }
  if (xPercent === max + percent) {
    toogleStroke(arrowRight, red)
    toogleStroke(overviewArrowRight, white)
  }
}

function goRight() {
  if (xPercent === max || active) return

  if (touchDevice()) {
    active = true
    gsap.delayedCall(0.8, () => {
      active = false
    })
  }

  xPercent -= percent
  current += 1
  translate()
  transform()

  if (xPercent === min - percent) {
    toogleStroke(arrowLeft, red)
    toogleStroke(overviewArrowLeft, white)
  }
  if (xPercent === max) {
    toogleStroke(arrowRight, grey)
    toogleStroke(overviewArrowRight, grey)
  }
}

function goToClicked(item) {
  current = overviewItems.indexOf(item)
  xPercent = current * -100

  translate()
  transform()

  if (xPercent === min) {
    toogleStroke(arrowLeft, grey)
    toogleStroke(overviewArrowLeft, grey)
  } else if (xPercent === max) {
    toogleStroke(arrowRight, grey)
    toogleStroke(overviewArrowRight, grey)
  } else {
    toogleStroke(arrowLeft, red)
    toogleStroke(arrowRight, red)
    toogleStroke(overviewArrowLeft, white)
    toogleStroke(overviewArrowRight, white)
  }
}

// Keys events
function keys(e) {
  if (e.key == 'ArrowLeft') {
    goLeft()
  } else if (e.key == 'ArrowRight') {
    goRight()
  }
}

// Resize
let handleResize = resizeX(transform, 250)

// Init
const eventsInit = () => {
  initDom()
  initData()
  transform()

  arrows[0].addEventListener('click', goLeft)
  arrows[2].addEventListener('click', goLeft)
  arrows[1].addEventListener('click', goRight)
  arrows[3].addEventListener('click', goRight)
  overviewItems.forEach((item) =>
    item.addEventListener('click', () => goToClicked(item))
  )

  window.addEventListener('resize', handleResize)

  if (!touchDevice()) {
    Observer.create({
      target: '.photos-events-wrapper',
      type: 'touch',
      tolerance: 20,
      onRight: () => goLeft(),
      onLeft: () => goRight(),
    })
  }
}

// Add
const eventsAdd = () => {
  window.addEventListener('keydown', keys)
}

const eventsRemove = () => {
  window.removeEventListener('keydown', keys)
}

// Clear
const eventsClear = () => {
  window.removeEventListener('keydown', keys)
  window.removeEventListener('resize', handleResize)
}

export { eventsInit, eventsAdd, eventsRemove, eventsClear }
