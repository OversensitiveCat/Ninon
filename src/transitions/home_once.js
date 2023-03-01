import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

import lenis from '../views/global/lenis'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const homeOnce = () => {
  const letters = gsap.utils.toArray(
    '.section-hero-home .cls-1, .section-hero-home .cls-3'
  )
  let lettersNav = new SplitType('.nav-heading', {
    types: 'chars',
    tagName: 'span',
  })
  let height = window.innerHeight
  lenis.stop()

  let tl = gsap.timeline({
    paused: true,
    onComplete: () => {
      lenis.start()
    },
  })
  tl.to('.hide', { autoAlpha: 0, duration: 0.4 })
    .from(letters, {
      autoAlpha: 0,
      duration: 0.2,
      stagger: { amount: 1.2 },
      scale: 0.2,
      yPercent: -20,
    })
    .from(
      '.image-accueil',
      { autoAlpha: 0, yPercent: 70, duration: 1.6, scale: 0.9 },
      '+=0.2'
    )
    .from(
      '.accueil-subheading',
      {
        duration: 1,
        stagger: 0.4,
        rotateX: 50,
        autoAlpha: 0,
        yPercent: 30,
      },
      '-=1'
    )
    .to(
      window,
      { scrollTo: height, duration: 0.8, ease: 'power1.inOut' },
      '-=0.2'
    )
    .from('.nav-item', {
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
    .from('.image-about', { opacity: 0, yPercent: 30, duration: 0.8 }, '-=0.6')

  window.addEventListener('load', () => tl.play())
}

export default homeOnce
