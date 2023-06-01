import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollToPlugin)

const eventsEnter = () => {
  let letters = new SplitType('.heading2-galerie', {
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
    duration: 0.2,
    stagger: { amount: 0.5 },
  })
    .from(
      '.nav-item',
      {
        autoAlpha: 0,
        yPercent: 100,
        duration: 0.4,
        stagger: { amount: 1 },
      },
      '-=0.1'
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
    .from('.photo-event-box', { opacity: 0, yPercent: 10, duration: 0.8 }, '<')
    .from('.events .heading3-galerie', { opacity: 0, yPercent: 60 }, '-=0.6')
    .from('.events .line-photo', { opacity: 0, yPercent: 60 }, '-=0.4')
    .from('.events .photo-credit', { opacity: 0, yPercent: 60 }, '-=0.2')
    .from('.overview-container', {
      transformOrigin: 'center',
      scale: 0.5,
      opacity: 0,
      duration: 1,
    })
    .from(
      '.events .nav-galerie',
      {
        opacity: 0,
        rotate: 360,
        yPercent: -60,
        xPercent: -50,
        duration: 0.7,
      },
      '<'
    )

  // BASIC ENTER
  let enter = gsap.timeline({ onComplete: () => tl.play() })
  enter
    .set(window, { scrollTo: '.events' })
    .set('.hide', { autoAlpha: 0 })
    .fromTo(
      '.transition',
      { yPercent: 0 },
      {
        yPercent: -100,
        ease: 'Power1.inOut',
        duration: 0.4,
        delay: 0.5,
      }
    )
    .set('.transition', { zIndex: -20, yPercent: 100 })
}

export default eventsEnter
