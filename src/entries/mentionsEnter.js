import { gsap } from 'gsap'
import SplitType from 'split-type'

import { isDesktop } from '../utilities/utilities'

const mentionsEnter = () => {
  let letters = new SplitType('h1', {
    types: 'chars',
    tagName: 'span',
  })

  let tl = gsap.timeline({ paused: true })

  if (isDesktop()) {
    let lettersNav = new SplitType('.nav-bar-logo', {
      types: 'chars',
      tagName: 'span',
    })
    tl.from('.nav-item', {
      autoAlpha: 0,
      yPercent: 100,
      duration: 0.4,
      stagger: { amount: 1 },
    })
      .from(
        lettersNav.chars,
        {
          autoAlpha: 0,
          scale: 0.2,
          yPercent: -20,
          duration: 0.2,
          stagger: { amount: 0.5 },
        },
        '<'
      )
      .from(
        letters.chars,
        {
          autoAlpha: 0,
          scale: 0.2,
          yPercent: -20,
          duration: 0.2,
          stagger: { amount: 0.8 },
        },
        0.4
      )
      .from('.section-credits > *', { opacity: 0, y: 10 }, 1.4)
      .from('.section-mentions > *', { opacity: 0, y: 10 }, 1.4)
  } else {
    tl.from(letters.chars, {
      autoAlpha: 0,
      scale: 0.2,
      yPercent: -20,
      duration: 0.2,
      stagger: { amount: 0.8 },
    }).from('.section-credits > *', { opacity: 0, y: 10 }, 0.4)
  }

  gsap.set('[data-anim="hero"', { opacity: 1 })
  gsap.set('[data-anim="header"', { opacity: 1 })
  gsap.set('[data-anim="first-section"', { opacity: 1 })
  tl.play()
}

export default mentionsEnter
