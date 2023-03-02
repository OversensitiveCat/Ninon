import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger, Observer)

const galerieEnter = () => {
  let letters = new SplitType('.heading1', {
    types: 'chars',
    tagName: 'span',
  })
  let lettersNav = new SplitType('.nav-heading', {
    types: 'chars',
    tagName: 'span',
  })
  const photosItem = gsap.utils.toArray('.photos-item')

  let tl = gsap.timeline({ paused: true })
  tl.from(letters.chars, {
    autoAlpha: 0,
    scale: 0.2,
    yPercent: -20,
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
      '-=0.2'
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
    .from(photosItem[0], { opacity: 0, yPercent: 20 }, '-=0.8')
    .from(photosItem[2], { opacity: 0, yPercent: 20 }, '-=0.6')
    .fromTo(
      photosItem[1],
      { opacity: 0, yPercent: 30 },
      { opacity: 1, yPercent: 10 },
      '-=0.7'
    )
    .from('.max-width > .loading-line-box', { opacity: 0, yPercent: 60 }, '-=1')
    .from('.link-out.global', { opacity: 0, yPercent: 20 }, '-=0.8')
    .from(
      '.nav-galerie',
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

export default galerieEnter
