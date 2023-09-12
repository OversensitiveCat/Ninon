import { gsap } from 'gsap'

import { lenis } from '../../global-views/lenis'

let keys

const lightbox = () => {
  // DOM
  const body = document.querySelector('body')
  const items = gsap.utils.toArray('.vid-item')
  const vids = gsap.utils.toArray('.vid-lightbox')
  const lightbox = document.querySelector('.lightbox')
  const closeButton = document.querySelector('.close-lightbox')
  const lineOne = document.querySelector('.close1')
  const lineTwo = document.querySelector('.close2')

  let current
  let currentSrc

  // Function

  function display(i) {
    current = vids[i].querySelector('iframe')

    gsap.set(vids[i], { display: 'block', opacity: 0 })
    gsap.to(vids[i], { opacity: 1 })
  }

  // Timeline
  let tl = gsap.timeline({ paused: true })
  tl.set(lightbox, { display: 'flex' })
    .from(lightbox, { opacity: 0 })
    .to('.nav-bar-mobile-container', { autoAlpha: 0 }, '<')
    .from(closeButton, { opacity: 0 }, '<')
    .to(lineOne, { rotate: 45 })
    .to(lineTwo, { rotate: -45 }, '<')

  const openLightbox = (item) => {
    if (tl.isActive()) return

    body.style.overflow = 'hidden'
    lenis.stop()
    tl.play()
    tl.then(() => display(items.indexOf(item)))
  }

  const closeLightbox = () => {
    if (tl.isActive()) return

    currentSrc = current.src

    tl.reverse().then(() => {
      current.src = ''
      current.src = currentSrc
      gsap.set(vids, { display: 'none' })
      body.style.overflow = 'scroll'
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
