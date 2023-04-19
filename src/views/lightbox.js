import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, Observer)

import lenis from './global/lenis'

const lightbox = () => {
  // dom
  const items = gsap.utils.toArray('.video-item'),
    lightbox = document.querySelector('.lightbox'),
    closeButton = document.querySelector('.close-lightbox'),
    body = document.querySelector('body'),
    container = document.querySelector('.video-container')

  // leave lightbox
  const escape = (e) => {
    if (e.key === 'Escape') {
      tl.reverse()
    }
  }

  const leave = (e) => {
    if (e.target === lightbox) {
      tl.reverse()
    }
  }

  // click timeline
  let tl = gsap.timeline({
    paused: true,
    onComplete: () => {
      window.addEventListener('click', leave)
    },
    onReverseComplete: () => {
      window.removeEventListener('keydown', escape)
      window.removeEventListener('click', leave)
      lenis.start()
      body.style.overflow = 'scroll'
      let vid = lightbox.querySelector('#vid')
      vid.src = ''
    },
  })
  tl.set(lightbox, { zIndex: 20 })
    .to(lightbox, {
      backgroundColor: 'rgba(32, 31, 31, 0.9)',
    })
    .from(container, { opacity: 0 }, '<')

  // build
  let links = {
    debussy: 'https://www.youtube.com/embed/LZWSYHofRro',
    crumb: 'https://www.youtube.com/embed/G33dF1yLWQA',
    arte: 'https://www.youtube.com/embed/AR-Y3MANtig',
    interview: 'https://www.youtube.com/embed/WQIcld7FaxY',
  }

  function build(item) {
    let i = items.indexOf(item)
    let vid
    switch (i) {
      case 0:
        vid = links.debussy
        break
      case 1:
        vid = links.crumb
        break
      case 2:
        vid = links.arte
        break
      case 3:
        vid = links.interview
    }
    let height = (9 * container.offsetWidth) / 16
    let frame = `<iframe id="vid" width="100%" height=${height} src=${vid} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    container.innerHTML = frame
  }

  // click event
  function open(item) {
    build(item)
    window.addEventListener('keydown', escape)
    lenis.stop()
    body.style.overflow = 'hidden'
    tl.play()
  }

  return [
    items.forEach((item) => {
      item.addEventListener('click', () => open(item))
    }),
    closeButton.addEventListener('click', () => tl.reverse()),
  ]
}

export default lightbox
