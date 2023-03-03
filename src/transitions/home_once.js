import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const homeOnce = () => {
  const letters = gsap.utils.toArray(
    '.section-hero-home .cls-1, .section-hero-home .cls-3'
  )

  let lettersNav = new SplitType('.nav-heading', {
    types: 'chars',
    tagName: 'span',
  })

  let hero = true
  ScrollTrigger.create({
    trigger: '.section-hero-home',
    start: 'bottom top',
    onEnter: () => {
      hero = false
    },
  })
  function scroll() {
    if (hero === true) {
      gsap.to(window, {
        scrollTo: '.nav-bar-sticky',
        duration: 1,
        ease: 'power1.inOut',
      })
    }
  }

  const nav = gsap.timeline({ paused: true })

  nav
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

  ScrollTrigger.create({
    trigger: '.nav-bar-sticky',
    start: 'top 60%',
    onEnter: () => nav.play(),
  })
  ScrollTrigger.create({
    trigger: '.nav-bar-sticky',
    start: 'top bottom',
    onLeaveBack: () => {
      nav.progress(0)
      nav.pause()
    },
  })

  let tl = gsap.timeline({
    paused: true,
    onComplete: () => scroll(),
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
  window.addEventListener('load', () => tl.play())
}

export default homeOnce
