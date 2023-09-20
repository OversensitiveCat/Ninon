import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

import { touchDevice } from '../utilities/utilities'
import aboutEnter from './aboutEnter'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const homeEnter = () => {
  const section = document.querySelector('[data-anim="hero"]')
  const letters = new SplitType('.home-hero-heading', {
    types: 'chars',
    absolute: true,
  })

  let tl = gsap.timeline({ paused: true })
  tl.from(letters.chars, {
    opacity: 0,
    duration: 0.2,
    stagger: { amount: 1.3 },
    scale: 0.2,
    yPercent: -20,
  })
    .from(
      '.image-accueil',
      { opacity: 0, yPercent: 70, duration: 1.2, scale: 0.9 },
      '+=0.35'
    )
    .from(
      '.accueil-subheading',
      {
        duration: 0.6,
        stagger: 0.4,
        rotateX: 50,
        opacity: 0,
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
        duration: 1.25,
        ease: 'power1.inOut',
        delay: 0.25
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
  if (!touchDevice()) {
    tl.eventCallback('onComplete', scroll)
  }

  gsap.set(section, { opacity: 1 })
  tl.play()
}

export default homeEnter
