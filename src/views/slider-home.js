import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, Observer)

let current, percent, width, widthPercent

function init() {
  current = 1
  percent = 0
  width = 34
  widthPercent = width + '%'
}

function transform() {
  const videoItems = gsap.utils.toArray('.video-item'),
    videoImg = gsap.utils.toArray('.video-image')

  let mm = gsap.matchMedia()

  gsap.to('.videos-wrapper', { xPercent: percent, duration: 0.8 })

  // Only on Desktop
  mm.add('(min-width: 992px)', () => {
    videoItems.forEach((vid) => {
      if (videoItems.indexOf(vid) === current) {
        gsap.to(vid, { yPercent: 0, duration: 0.8 })
      } else {
        gsap.to(vid, { yPercent: -10, duration: 0.8 })
      }
    })
    videoImg.forEach((img) => {
      if (videoImg.indexOf(img) === current) {
        gsap.to(img, { filter: 'none', duration: 0.8 })
      } else {
        gsap.to(img, { filter: 'grayscale(100%)', duration: 0.8 })
      }
    })
    gsap.to('.loading-line', { width: widthPercent, duration: 0.8 })
  })
  // On resize, remove desktop transform
  mm.add('(max-width: 991px)', () => {
    videoItems.forEach((vid) => {
      gsap.set(vid, { yPercent: 0 })
    })
    videoImg.forEach((img) => {
      gsap.set(img, { filter: 'none' })
    })
  })
}

function goLeftHome() {
  let mm = gsap.matchMedia()
  // DESKTOP
  mm.add('(min-width: 992px)', () => {
    if (percent == 0) {
      gsap.to('#arrow-video-left', {
        attr: { stroke: '#201f1f' },
        duration: 0.25,
      })
    }
    if (percent == -68) {
      gsap.to('#arrow-video-right', {
        attr: { stroke: '#a80000' },
        duration: 0.25,
      })
    }
    if (percent == 34) {
      return
    } else {
      percent += 34
      current -= 1
      width -= 34
      widthPercent = width + '%'
      transform()
    }
  })

  // TABLET & MOBILE
  mm.add('(max-width: 991px)', () => {
    if (percent == -100) {
      gsap.to('#arrow-video-left', { attr: { stroke: '#201f1f' } })
    }
    if (percent == -300) {
      gsap.to('#arrow-video-right', { attr: { stroke: '#a80000' } })
    }
    if (percent == 0) {
      return
    } else {
      percent += 100
      transform()
    }
  })
}

function goRightHome() {
  let mm = gsap.matchMedia()
  // DESKTOP
  mm.add('(min-width: 992px)', () => {
    if (percent == -34) {
      gsap.to('#arrow-video-right', {
        attr: { stroke: '#201f1f' },
        duration: 0.25,
      })
    }
    if (percent == 34) {
      gsap.to('#arrow-video-left', {
        attr: { stroke: '#a80000' },
        duration: 0.25,
      })
    }
    if (percent == -68) {
      return
    } else {
      percent -= 34
      current += 1
      width += 34
      widthPercent = width + '%'
      transform()
    }
  })

  // TABLET & MOBILE
  mm.add('(max-width: 991px)', () => {
    if (percent == -200) {
      gsap.to('#arrow-video-right', { attr: { stroke: '#201f1f' } })
    }
    if (percent == 0) {
      gsap.to('#arrow-video-left', { attr: { stroke: '#a80000' } })
    }
    if (percent == -300) {
      return
    } else {
      percent -= 100
      transform()
    }
  })
}

function keysHome(e) {
  if (e.key == 'ArrowLeft') {
    goLeftHome()
  } else if (e.key == 'ArrowRight') {
    goRightHome()
  }
}

const slideHome = () => {
  init()
  transform()
  const arrows = gsap.utils.toArray('.arrow-video')
  arrows[0].addEventListener('click', goLeftHome)
  arrows[1].addEventListener('click', goRightHome)

  window.addEventListener('resize', () => {
    init()
    transform()
  })

  let mm = gsap.matchMedia()
  // DESKTOP
  mm.add('(min-width: 992px)', () => {})
  window.addEventListener('keydown', keysHome)

  // TABLET & MOBILE
  mm.add('(max-width: 991px)', () => {
    gsap.set('#arrow-video-left', { attr: { stroke: '#201f1f' } })
    Observer.create({
      target: '.videos-container',
      type: 'touch',
      tolerance: 60,
      onRight: () => goLeftHome(),
      onLeft: () => goRightHome(),
    })
  })
}

export { slideHome, keysHome }
