import { gsap } from 'gsap'
import SplitType from 'split-type'

const galerieEnter = () => {
  let down, up
  let mm = gsap.matchMedia()
  mm.add(
    {
      isDesktop: `(min-width: 992px)`,
      isNotDesktop: `(max-width: 991px)`,
    },
    (context) => {
      let { isDesktop, isNotDesktop } = context.conditions
      if (isDesktop) {
        down = 30
        up = 10
      } else if (isNotDesktop) {
        down = 20
        up = 0
      }
    }
  )
  let letters = new SplitType('.heading1-galerie', {
    types: 'chars',
    tagName: 'span',
  })
  let lettersNav = new SplitType('.nav-heading', {
    types: 'chars',
    tagName: 'span',
  })
  const photosItem = gsap.utils.toArray('.portraits .photos-item')

  let tl = gsap.timeline({ paused: true })
  tl.from(
    letters.chars,
    {
      autoAlpha: 0,
      scale: 0.2,
      yPercent: -20,
      duration: 0.2,
      stagger: { amount: 0.5 },
    },
    '+=0.8'
  )
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
    .from(
      '.portraits .heading2-galerie',
      {
        opacity: 0,
        yPercent: -20,
      },
      '-=1.2'
    )
    .from(photosItem[0], { opacity: 0, yPercent: 20 }, '-=1')
    .from(photosItem[2], { opacity: 0, yPercent: 20 }, '-=0.6')
    .fromTo(
      photosItem[1],
      { opacity: 0, yPercent: down },
      { opacity: 1, yPercent: up },
      '-=0.8'
    )
    .from('.portraits .loading-line-box', { opacity: 0, yPercent: 500 }, '<')
    .from(
      '.portraits .nav-galerie',
      {
        opacity: 0,
        rotate: 360,
        yPercent: -60,
        xPercent: -50,
        duration: 0.7,
      },
      '-=0.4'
    )

  // BASIC ENTER
  let enter = gsap.timeline({ onComplete: () => tl.play() })
  enter
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

export default galerieEnter
