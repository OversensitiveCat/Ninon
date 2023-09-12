import { gsap } from 'gsap'
import SplitType from 'split-type'

import { isDesktop, touchDevice } from '../utilities/utilities'

const agendaEnter = () => {
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
    tl.from(
      '.nav-item',
      {
        autoAlpha: 0,
        yPercent: 100,
        duration: 0.4,
        stagger: { amount: 1 },
      },
      '<'
    )
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
        '<+=0.4'
      )
  } else {
    tl.from(letters.chars, {
      autoAlpha: 0,
      scale: 0.2,
      yPercent: -20,
      duration: 0.2,
      stagger: { amount: 0.8 },
    })

    gsap.to('.ham-line', { backgroundColor: '#b40000' })
  }

  if (touchDevice()) {
    gsap.set('.section-hero-agenda', { height: window.innerHeight })
  }

  gsap.set('[data-anim="hero"', { opacity: 1 })
  gsap.set('[data-anim="header"', { opacity: 1 })
  tl.play()
}

export default agendaEnter
