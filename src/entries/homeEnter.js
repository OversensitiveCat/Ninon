import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { touchDevice } from '../utilities/utilities'
import aboutEnter from './aboutEnter'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const homeEnter = () => {
  const section = document.querySelector('[data-anim="hero"]')
  const letters = gsap.utils.toArray(
    '.section-hero-home .cls-1, .section-hero-home .cls-3'
  )

  let tl = gsap.timeline({ paused: true })
  tl.from(letters, {
    autoAlpha: 0,
    duration: 0.2,
    stagger: { amount: 1 },
    scale: 0.2,
    yPercent: -20,
  })
    .from(
      '.image-accueil',
      { autoAlpha: 0, yPercent: 70, duration: 1, scale: 0.9 },
      '+=0.2'
    )
    .from(
      '.accueil-subheading',
      {
        duration: 0.6,
        stagger: 0.4,
        rotateX: 50,
        autoAlpha: 0,
        yPercent: 30,
      },
      '<'
    )

  // Scroll to main if not allready there
  let hero = true
  ScrollTrigger.create({
    trigger: '.main',
    start: 'top bottom',
    onEnter: () => {
      hero = false
    },
  })
  function scroll() {
    if (hero === true) {
      gsap.to(window, {
        scrollTo: section.getBoundingClientRect().bottom,
        duration: 1,
        ease: 'power1.inOut',
      })
    }
  }

  // About Enter
  let tlAbout = aboutEnter()
  ScrollTrigger.create({
    trigger: section,
    start: 'bottom 80%',
    onEnter: () => tlAbout.play(),
  })
  ScrollTrigger.create({
    trigger: section,
    start: 'bottom bottom',
    onLeaveBack: () => tlAbout.pause(0),
  })

  // Init
  if (touchDevice()) {
    gsap.set(section, { height: window.innerHeight, opacity: 1 })
    tl.play()
  } else {
    gsap.set(section, { opacity: 1 })
    tl.play().then(scroll)
  }
}

export default homeEnter
