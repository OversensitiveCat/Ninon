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

  let tl = gsap.timeline({ paused: true })
  let mm = gsap.matchMedia()
  mm.add(
    {
      isDesktop: `(min-width: 992px)`,
      isMobile: `(max-width: 991px)`,
    },
    (context) => {
      // eslint-disable-next-line no-unused-vars
      let { isDesktop, isMobile } = context.conditions

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
        .fromTo(
          '.image-about',
          {
            opacity: 0,
            yPercent: isDesktop ? 30 : 10,
            duration: isDesktop ? 2 : 0.8,
          },
          { opacity: 1, yPercent: 0 },
          '-=0.3'
        )
        .fromTo(
          '.bio-highlight-para.fr',
          {
            opacity: 0,
            yPercent: isDesktop ? 20 : 10,
            duration: isDesktop ? 1.5 : 0.8,
          },
          { opacity: 1, yPercent: 0 },
          '-=0.2'
        )
        .fromTo(
          '.bio-para.fr, .bio-line',
          {
            opacity: 0,
            yPercent: isDesktop ? 25 : 10,
            duration: isDesktop ? 1.5 : 0.8,
          },
          { opacity: 1, yPercent: 0, stagger: { amount: 0.35 } },
          '-=0.2'
        )
        .fromTo(
          '.change-language',
          {
            opacity: 0,
            yPercent: isDesktop ? 60 : 30,
            duration: isDesktop ? 1 : 0.8,
          },
          { opacity: 1, yPercent: 0 },
          '-=0.35'
        )
        .fromTo(
          '.button-dates, .button-ecouter',
          {
            opacity: 0,
            yPercent: isDesktop ? 60 : 30,
            duration: isDesktop ? 1 : 0.8,
          },
          { opacity: 1, yPercent: 0, stagger: { amount: 0.35 } },
          '-=0.4'
        )
    }
  )

  ScrollTrigger.create({
    trigger: '.nav-bar-sticky',
    start: 'top 60%',
    onEnter: () => tl.play(),
  })

  let once = gsap.timeline({
    paused: true,
    onComplete: () => scroll(),
  })
  once
    .to('.hide', { autoAlpha: 0, duration: 0.4 })
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
  window.addEventListener('load', () => once.play())
}

export default homeOnce
