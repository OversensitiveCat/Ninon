import { gsap } from 'gsap'
import SplitType from 'split-type'

const projectEnter = (container) => {
  let letters = new SplitType('.heading1', {
    types: 'chars',
    tagName: 'span',
  })
  let lettersNav = new SplitType('.nav-heading', {
    types: 'chars',
    tagName: 'span',
  })
  let tl = gsap.timeline({ paused: true })
  tl.from(letters.chars, {
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

  let video = container.querySelector('video')
  video.muted = true
  video.play()

  // BASIC ENTER
  let enter = gsap.timeline({ onComplete: () => tl.play() })
  enter
    .fromTo(
      '.transition',
      { yPercent: 0 },
      {
        yPercent: -100,
        ease: 'Power1.inOut',
        duration: 1,
        delay: 0.5,
      }
    )
    .set('.transition', { zIndex: -20, yPercent: 100 })
}

export default projectEnter
