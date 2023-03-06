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
    gsap.set('#arrow-left1, #arrow-right1', {
      attr: { stroke: '#a80000' },
    })
  })
  mm.add('(max-width: 991px)', () => {
    gsap.set('#arrow-left1', { attr: { stroke: '#201f1f' } })
    gsap.set('#arrow-right1', { attr: { stroke: '#a80000' } })
  })
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

function transform() {
  const photosBox = gsap.utils.toArray('.portraits .photo-box'),
    photosItem = gsap.utils.toArray('.portraits .photos-item'),
    photo = document.querySelector('.portraits .photo')

  // ALL
  gsap.to('.portraits .photos-wrapper', {
    xPercent: percent,
    duration: 0.7,
  })

  let mm = gsap.matchMedia()
  // TABLET & DESKTOP
  mm.add('(min-width: 768px)', () => {
    gsap.to('.portraits .loading-line-galerie', {
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

function settingsOne() {
  init()
  attributeValues()
  transform()
  sizes()
}

function goLeftOne() {
  if (percent == arrowLeftOff) {
    gsap.to('#arrow-left1', {
      attr: { stroke: '#201f1f' },
      duration: 0.25,
    })
  }
  if (percent == arrowRightOn) {
    gsap.to('#arrow-right1', {
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

function goRightOne() {
  if (percent == arrowRightOff) {
    gsap.to('#arrow-right1', { attr: { stroke: '#201f1f' } })
  }
  if (percent == arrowLeftOn) {
    gsap.to('#arrow-left1', { attr: { stroke: '#a80000' } })
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

export { goLeftOne, goRightOne, settingsOne }
