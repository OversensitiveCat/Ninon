import { gsap } from 'gsap'
import SplitType from 'split-type'

import toogleNav from '../views/nav_mobile/toogleNav'

const projectEnter = (container) => {
  gsap.set('#hero-section > *', { autoAlpha: 1 })
  let letters = new SplitType('.heading1-project', {
    types: 'chars',
    tagName: 'span',
  })
  let lettersNav = new SplitType('.nav-heading', {
    types: 'chars',
    tagName: 'span',
  })
  let tl = gsap.timeline({
    onComplete: () => {
      let hamburger = document.querySelector('.hamburger')
      hamburger.addEventListener('click', toogleNav())
      console.log('add click ham enter')
    },
  })
  tl.from(
    letters.chars,
    {
      autoAlpha: 0,
      scale: 0.2,
      yPercent: -20,
      duration: 0.2,
      stagger: { amount: 0.8 },
    },
    '+=1.4'
  )
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
}

export default projectEnter
