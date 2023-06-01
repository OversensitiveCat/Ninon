import { gsap } from 'gsap'
import SplitType from 'split-type'

const projectOnce = () => {
  let letters = new SplitType('.heading1', {
    types: 'chars',
    tagName: 'span',
  })
  let lettersNav = new SplitType('.nav-heading', {
    types: 'chars',
    tagName: 'span',
  })
  let tl = gsap.timeline({ paused: true })
  tl.to('.hide', { autoAlpha: 0, duration: 0.4 })
    .from(letters.chars, {
      autoAlpha: 0,
      scale: 0.2,
      yPercent: -20,
      duration: 0.2,
      stagger: { amount: 0.8 },
    })
    .from(
      '.project-number-hero',
      {
        autoAlpha: 0,
        yPercent: -100,
        duration: 0.8,
      },
      '-=0.6'
    )
    .from(
      '.nav-item',
      {
        autoAlpha: 0,
        yPercent: 100,
        duration: 0.4,
        stagger: { amount: 1 },
      },
      '-=0.4'
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
  window.addEventListener('load', () => tl.play())
}

export default projectOnce
