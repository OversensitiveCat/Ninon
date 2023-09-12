import { gsap } from 'gsap'
import SplitType from 'split-type'

import { isDesktop } from '../utilities/utilities'

const eventsTimeline = () => {
  let tl = gsap.timeline({ paused: true })

  tl.from(
    '#events h2',
    {
      opacity: 0,
      yPercent: -20,
    },
    0.2
  )
    .from('.photos-events-wrapper', { yPercent: 10, opacity: 0 }, 0.4)
    .from('.overview-section', { yPercent: 100, opacity: 0 }, 0.6)
    .from(
      '#events .nav-galerie',
      {
        opacity: 0,
        rotate: 360,
        yPercent: -60,
        xPercent: -50,
        duration: 0.7,
      },
      0.7
    )

  return tl
}

const eventsEnter = () => {
  let tl = eventsTimeline()
  if (isDesktop()) {
    let lettersNav = new SplitType('.nav-bar-logo', {
      types: 'chars',
      tagName: 'span',
    })

    tl.from(
      '.nav-item',
      {
        autoAlpha: 0,
        yPercent: 100,
        duration: 0.4,
        stagger: { amount: 1 },
      },
      0
    ).from(
      lettersNav.chars,
      {
        autoAlpha: 0,
        scale: 0.2,
        yPercent: -20,
        duration: 0.2,
        stagger: { amount: 0.5 },
      },
      0
    )
  }

  gsap.set('[data-anim="hero"', { opacity: 1 })
  gsap.set('[data-anim="header"', { opacity: 1 })
  gsap.set('[data-anim="first-section"', { opacity: 1 })

  tl.play()
}

export { eventsEnter, eventsTimeline }
