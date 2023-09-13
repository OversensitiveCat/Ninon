import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'

import { isDesktop, resizeX, touchDevice } from '../../utilities/utilities'

gsap.registerPlugin(Observer)

let items
let imgs
let boxs
let arrowLeft
let arrowRight
let list
let arrows
let line

let current
let percent
let windowWidth
let width
let height
let max
let min
let nbr
let loading
let loadingPercent

let active = false

const d = 0.6
const red = '#b40000'
const grey = '#201f1f'

// Utilities
function findWidth(windowWidth) {
  if (windowWidth >= 992) return 33.34
  else if (windowWidth <= 991 && windowWidth >= 768) return 50
  else if (windowWidth <= 767) return 100
}

function toogleStroke(arrow, color) {
  gsap.to(arrow, {
    attr: { stroke: color },
    duration: 0.25,
  })
}

// Init
function initDom() {
  list = document.querySelector('.photos-list')
  items = gsap.utils.toArray('.photo-item')
  boxs = gsap.utils.toArray('.photo-box')
  imgs = gsap.utils.toArray('.photo')
  arrowLeft = document.querySelector('#arrow-left1')
  arrowRight = document.querySelector('#arrow-right1')
  arrows = gsap.utils.toArray('#portraits .arrow-galerie')
  line = document.querySelector('.loading-line-galerie')
}

function initData() {
  windowWidth = window.innerWidth
  current = 1
  percent = 0
  width = findWidth(windowWidth)
  nbr = items.length
  height = imgs[0].offsetWidth
  loading = Math.ceil(100 / (nbr - 1))
  loadingPercent = loading

  if (windowWidth >= 992) {
    toogleStroke(arrowLeft, red)

    min = width
    nbr -= 2
  } else if (windowWidth >= 768) {
    toogleStroke(arrowLeft, grey)

    min = 0
    nbr -= 2
  } else {
    toogleStroke(arrowLeft, grey)

    min = 0
    nbr -= 1
  }

  max = -width * nbr

  // Set arrows
  gsap.set(list, { height: 'auto' })
  gsap.set(list, { height: list.offsetHeight })
  toogleStroke(arrowRight, red)
}

function resetTransform() {
  gsap.to(items, { yPercent: 0, duration: d })
  gsap.to(boxs, { height: 'auto', duration: d })
  gsap.to(line, { width: `${loadingPercent}%`, duration: d })
}

// Slide & transform
function transform() {
  items.forEach((i) => {
    if (items.indexOf(i) === current) {
      return gsap.to(i, { yPercent: 10, duration: d })
    } else {
      return gsap.to(i, { yPercent: 0, duration: d })
    }
  })
  boxs.forEach((box) => {
    if (boxs.indexOf(box) === current) {
      return gsap.to(box, { height: 'auto', duration: d })
    } else {
      return gsap.to(box, { height: height, duration: d })
    }
  })
  gsap.to(line, { width: `${loadingPercent}%`, duration: d })
}

function translate() {
  gsap.to(list, { xPercent: percent, duration: d })
}

// Events
function goLeft() {
  if (percent === min || active) return

  if (touchDevice()) {
    active = true
    gsap.delayedCall(d, () => {
      active = false
    })
  }

  percent += width
  loadingPercent -= loading
  current -= 1
  translate()

  if (isDesktop()) transform()
  if (percent === min) toogleStroke(arrowLeft, grey)
  if (percent === max + width) toogleStroke(arrowRight, red)
}

function goRight() {
  if (percent === max || active) return

  if (touchDevice()) {
    active = true
    gsap.delayedCall(0.8, () => {
      active = false
    })
  }

  percent -= width
  loadingPercent += loading
  current += 1
  translate()

  if (isDesktop()) transform()
  if (percent === min - width) toogleStroke(arrowLeft, red)
  if (percent === max) toogleStroke(arrowRight, grey)
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
function reset() {
  initData()
  translate()

  if (isDesktop()) {
    return transform()
  } else return resetTransform()
}
let handleResize = resizeX(reset, 250)

// Init
const portraitsInit = () => {
  initDom()
  initData()

  if (isDesktop()) {
    transform()
  }

  arrows[0].addEventListener('click', goLeft)
  arrows[1].addEventListener('click', goRight)
  window.addEventListener('resize', handleResize)

  if (!touchDevice()) {
    Observer.create({
      target: '.photos-wrapper',
      type: 'touch',
      tolerance: 20,
      onRight: () => goLeft(),
      onLeft: () => goRight(),
    })
  }
}

// Add
const portraitsAdd = () => {
  window.addEventListener('keydown', keys)
}

const portraitsRemove = () => {
  window.removeEventListener('keydown', keys)
}

// Clear
const portraitsClear = () => {
  window.removeEventListener('keydown', keys)
  window.removeEventListener('resize', handleResize)
}

export { portraitsInit, portraitsAdd, portraitsRemove, portraitsClear }
