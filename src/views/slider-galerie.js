import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, Observer)

let percent,
  width,
  widthPercent,
  active,
  arrowLeftOff,
  arrowLeftOn,
  arrowRightOff,
  arrowRightOn,
  stopLeft,
  stopRight,
  move

function init() {
  let mm = gsap.matchMedia()
  active = 1
  percent = 0
  width = 34
  widthPercent = width + '%'

  mm.add('(min-width: 992px)', () => {
    gsap.set('#arrow-video-left, #arrow-video-right ', {
      attr: { stroke: '#a80000' },
    })
  })
  mm.add('(max-width: 991px)', () => {
    gsap.set('#arrow-video-left', { attr: { stroke: '#201f1f' } })
    gsap.set('#arrow-video-right', { attr: { stroke: '#a80000' } })
  })
}

function transform() {
  const photosBox = gsap.utils.toArray('.photo-box'),
    photosItem = gsap.utils.toArray('.photos-item'),
    photo = document.querySelector('.photo')

  // ALL
  gsap.to('.photos-wrapper', {
    xPercent: percent,
    duration: 0.7,
  })

  let mm = gsap.matchMedia()
  // TABLET & DESKTOP
  mm.add('(min-width: 768px)', () => {
    gsap.to('.loading-line-galerie', {
      width: widthPercent,
      duration: 0.7,
    })
  })

  // DESKTOP
  mm.add('(min-width: 992px)', () => {
    photosItem.forEach((item) => {
      if (photosItem.indexOf(item) == active) {
        gsap.to(item, { yPercent: 10, duration: 0.6 })
      } else {
        gsap.to(item, { yPercent: 0, duration: 0.6 })
      }
    })
    photosBox.forEach((box) => {
      if (photosBox.indexOf(box) == active) {
        gsap.to(box, { height: 'auto', duration: 0.6 })
      } else {
        gsap.to(box, { height: photo.offsetWidth, duration: 0.6 })
      }
    })
  })
}

function attributeValues() {
  let mm = gsap.matchMedia()

  mm.add(
    {
      isDesktop: '(min-width: 992px)',
      isTablet: '(max-width: 991px)',
      isMobile: '(max-width: 767px)',
    },
    (context) => {
      let { isDesktop, isTablet, isMobile } = context.conditions

      // DESKTOP
      if (isDesktop) {
        arrowLeftOff = 0
        arrowLeftOn = 33
        arrowRightOff = -33
        arrowRightOn = -66
        stopLeft = 33
        stopRight = -66
        move = 33
      }

      // TABLET
      if (isTablet && isMobile == false) {
        arrowLeftOff = -50
        arrowLeftOn = 0
        arrowRightOff = -50
        arrowRightOn = -100
        stopLeft = 0
        stopRight = -100
        move = 50
      }

      // MOBILE
      if (isMobile) {
        arrowLeftOff = -100
        arrowLeftOn = 0
        arrowRightOff = -200
        arrowRightOn = -300
        stopLeft = 0
        stopRight = -300
        move = 100
      }
    }
  )
}

function goLeft() {
  if (percent == arrowLeftOff) {
    gsap.to('#arrow-video-left', {
      attr: { stroke: '#201f1f' },
      duration: 0.25,
    })
  }
  if (percent == arrowRightOn) {
    gsap.to('#arrow-video-right', {
      attr: { stroke: '#a80000' },
      duration: 0.25,
    })
  }
  if (percent == stopLeft) {
    return
  } else {
    percent += move
    width -= 34
    active -= 1
    widthPercent = width + '%'
    transform()
  }
}

function goRight() {
  if (percent == arrowRightOff) {
    gsap.to('#arrow-video-right', { attr: { stroke: '#201f1f' } })
  }
  if (percent == arrowLeftOn) {
    gsap.to('#arrow-video-left', { attr: { stroke: '#a80000' } })
  }
  if (percent == stopRight) {
    return
  } else {
    percent -= move
    width += 34
    active += 1
    widthPercent = width + '%'
    transform()
  }
}

function keysGalerie(e) {
  if (e.key == 'ArrowLeft') {
    goLeft()
  } else if (e.key == 'ArrowRight') {
    goRight()
  }
}

function sizes() {
  const container = document.querySelector('.photos-container'),
    photosBox = gsap.utils.toArray('.photo-box'),
    photosItem = gsap.utils.toArray('.photos-item'),
    photo = document.querySelector('.photo')

  let mm = gsap.matchMedia()
  // DESKTOP
  mm.add('(min-width: 992px)', () => {
    // box width
    photosBox.forEach((box) => {
      if (photosBox.indexOf(box) == active) {
        gsap.set(box, { height: 'auto' })
      } else {
        gsap.set(box, { height: photo.offsetWidth })
      }
    })
    // container height
    gsap.to(container, {
      height: 'auto',
      duration: 0,
      onComplete: () => {
        gsap.to(container, { height: container.offsetHeight, duration: 0 })
      },
    })
  })

  // TABLET AND MOBILE
  mm.add('(max-width: 991px)', () => {
    // box width
    photosItem.forEach((item) => {
      gsap.set(item, { yPercent: 0 })
    })
    photosBox.forEach((box) => {
      gsap.set(box, { height: 'auto' })
    })
    // container height
    gsap.set(container, { height: 'auto' })
  })
}

const slideGalerie = () => {
  // ALL
  init()
  attributeValues()
  transform()
  sizes()
  window.addEventListener('resize', () => {
    init()
    attributeValues()
    transform()
    sizes()
  })
  // Add Events
  const arrows = gsap.utils.toArray('.arrow-galerie')
  arrows[0].addEventListener('click', goLeft)
  arrows[1].addEventListener('click', goRight)
  window.addEventListener('keydown', keysGalerie)
  console.log('add galerie events')

  // Add touch event for tablet & mobile
  let mm = gsap.matchMedia()
  mm.add('(max-width: 991px)', () => {
    Observer.create({
      target: '.photos-container',
      type: 'touch',
      tolerance: 60,
      onRight: () => goLeft(),
      onLeft: () => goRight(),
    })
  })
}

export { slideGalerie, keysGalerie }
