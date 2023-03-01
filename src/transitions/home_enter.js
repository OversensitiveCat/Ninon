import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

import lenis from '../views/global/lenis'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const homeEnter = () => {
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

  const shape0 =
    'M469.539032,263.986786q -234.7695 0 -469.539 0L0,263.557617c66.11113,0.429169,351.088104,0.429169,469.539032,0.208344V263.986786z'
  const shape3 =
    'M 469.539 263.9868 q -290.539 -269.9868 -469.539 0 L 0 0 c 226.1111 0 182.8873 -0.4145 469.539 0 V 263.9868 z z'
  const shape4 =
    'M 469.539 0 q -234.7695 0 -469.539 0 L 0 0 c 66.1111 0.4292 351.0881 0.4292 469.539 0.2083 V 0 z'

  let enter = gsap.timeline({ onComplete: () => tl.play() })
  enter
    .to('#path', {
      attr: { d: shape3 },
      ease: 'Power2.easeIn',
      duration: 0.3,
    })
    .to('#path', {
      attr: { d: shape4 },
      ease: 'Power2.easeOut',
      duration: 0.3,
    })
    .to('#path', {
      attr: { d: shape0 },
      duration: 0,
    })
    .to('.path-container', { zIndex: -5 })
    .to(window, { scrollTo: height, duration: 1, ease: 'power1.inOut' })
}

export default homeEnter
