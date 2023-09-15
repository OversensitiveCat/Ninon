import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'

import { isDesktop, resizeX, touchDevice } from '../../utilities/utilities'

gsap.registerPlugin(Observer)

let items
let imgs
let arrowLeft
let arrowRight
let list
let arrows
let line

let current
let percent
let windowWidth
let width
let max
let min
let nbr
let loading
let loadingPercent

let active = false

const d = 0.8
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
  list = document.querySelector('.vids-list')
  items = gsap.utils.toArray('.vid-item')
  imgs = gsap.utils.toArray('.vid-item img')
  arrowLeft = document.querySelector('#arrow-video-left')
  arrowRight = document.querySelector('#arrow-video-right')
  arrows = gsap.utils.toArray('.arrow-video')
  line = document.querySelector('.loading-line')
}

function initData() {
  windowWidth = window.innerWidth
  current = 1
  percent = 0
  width = findWidth(windowWidth)
  nbr = items.length

  if (windowWidth >= 992) {
    min = width
    loadingPercent = width
    toogleStroke(arrowLeft, red)
  } else {
    min = 0
    loadingPercent = 0
    toogleStroke(arrowLeft, grey)
  }

  if (windowWidth >= 768) {
    nbr -= 2
  } else {
    nbr -= 1
  }

  max = -width * nbr
  loading = width

  // Set arrows
  toogleStroke(arrowRight, red)
}

function resetTransform() {
  gsap.to(line, { width: `${loadingPercent}%`, duration: d })
  gsap.to(imgs, { filter: 'none', duration: d })
  gsap.to(items, { yPercent: 0, duration: d })
}

// Slide & transform
function transform() {
  items.forEach((i) => {
    if (items.indexOf(i) === current) {
      return gsap.to(i, { yPercent: 0, duration: d })
    } else {
      return gsap.to(i, { yPercent: -10, duration: d })
    }
  })
  imgs.forEach((img) => {
    if (imgs.indexOf(img) === current) {
      return gsap.to(img, { filter: 'none', duration: d })
    } else {
      return gsap.to(img, { filter: 'grayscale(100%)', duration: d })
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

// Add
const listen = () => {
  initDom()
  initData()

  if (isDesktop()) {
    transform()
  }

  window.addEventListener('keydown', keys)
  arrows[0].addEventListener('click', goLeft)
  arrows[1].addEventListener('click', goRight)
  window.addEventListener('resize', handleResize)

  if (touchDevice()) {
    Observer.create({
      target: '.vids-wrapper',
      type: 'touch',
      tolerance: 20,
      onRight: () => goLeft(),
      onLeft: () => goRight(),
    })
  }
}

// Remove
const listenClear = () => {
  window.removeEventListener('keydown', keys)
  window.removeEventListener('resize', handleResize)
}

export { listen, listenClear }
