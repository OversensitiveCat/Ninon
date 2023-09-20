import { gsap } from 'gsap'

import { lenis } from '../../global-views/lenis'
import loadIframe from '../../global-views/loadIframe'

let keys

const lightbox = () => {
  // DOM
  const body = document.querySelector('body')
  const items = gsap.utils.toArray('.vid-item')
  const lightbox = document.querySelector('.lightbox')
  const closeButton = document.querySelector('.close-lightbox')
  const lineOne = document.querySelector('.close1')
  const lineTwo = document.querySelector('.close2')
  const vid = document.querySelector('.lightbox iframe')
  const errorMessage = document.querySelector('.lightbox .lightbox-error')

  const links = items.map((i) => {
    return i.getAttribute('vid-link')
  })

  gsap.set(vid, { opacity: 0 })

  // Promise resolutions
  function isLoaded() {
    console.log('the loading has succeeded')
  }

  function error() {
    console.log('the loading has failed')
    gsap.set('.iframe-container', { display: 'none' })
    gsap.set(errorMessage, { display: 'block' })
  }

  // Timeline
  let tl = gsap.timeline({ paused: true })
  tl.set(lightbox, { display: 'flex' })
    .from(lightbox, { opacity: 0 })
    .to('.nav-bar-mobile-container', { autoAlpha: 0 }, '<')
    .from(closeButton, { opacity: 0 }, '<')
    .to(lineOne, { rotate: 45 })
    .to(lineTwo, { rotate: -45 }, '<')
    .to(vid, { opacity: 1 })
    .to('.cursor', { opacity: 0 }, '<')

  const openLightbox = (item) => {
    if (tl.isActive()) return

    body.style.overflowY = 'hidden'
    vid.src = links[items.indexOf(item)]
    lenis.stop()
    tl.play()
    loadIframe(vid, isLoaded, error)
  }

  const closeLightbox = () => {
    if (tl.isActive()) return

    tl.reverse().then(() => {
      vid.src = ''
      body.style.overflowY = 'scroll'
      lenis.start()
    })
  }

  items.forEach((item) =>
    item.addEventListener('click', () => openLightbox(item))
  )
  closeButton.addEventListener('click', closeLightbox)
  closeButton.addEventListener('mouseenter', () => {
    gsap.to(lineOne, { rotate: -45 })
    gsap.to(lineTwo, { rotate: 45 })
  })
  closeButton.addEventListener('mouseleave', () => {
    gsap.to(lineOne, { rotate: 45 })
    gsap.to(lineTwo, { rotate: -45 })
  })

  lightbox.addEventListener('click', closeLightbox)

  keys = (e) => {
    if (e.key == 'Escape') {
      closeLightbox()
    }
  }
  window.addEventListener('keydown', keys)
}

const lightboxClear = () => {
  window.removeEventListener('keydown', keys)
}

export { lightbox, lightboxClear }
