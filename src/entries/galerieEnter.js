import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

import { isDesktop } from '../utilities/utilities'
import { eventsTimeline } from './eventsEnter'

gsap.registerPlugin(ScrollTrigger)

const galerieEnter = () => {
  let letters = new SplitType('h1', {
    types: 'chars',
    tagName: 'span',
  })
  const photosItem = gsap.utils.toArray('#portraits .photo-item')
  const sectionEvents = document.querySelector('#events')

  let tl = gsap.timeline({ paused: true })
  if (isDesktop()) {
    let lettersNav = new SplitType('.nav-bar-logo', {
      types: 'chars',
      tagName: 'span',
    })

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
        '#portraits h2',
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
        { opacity: 0, yPercent: 30 },
        { opacity: 1, yPercent: 10 },
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
  } else {
    tl.from(letters.chars, {
      autoAlpha: 0,
      scale: 0.2,
      yPercent: -20,
      duration: 0.2,
      stagger: { amount: 0.5 },
    })
      .from(
        '#portraits h2',
        {
          opacity: 0,
          yPercent: -20,
        },
        0.4
      )
      .from(photosItem[0], { opacity: 0, yPercent: 10 }, 0.4)
      .from(
        '.portraits .nav-galerie',
        {
          opacity: 0,
          rotate: 360,
          yPercent: -60,
          xPercent: -50,
          duration: 0.7,
        },
        0.2
      )
  }

  // Events enter
  let tlEvents = eventsTimeline()

  ScrollTrigger.create({
    trigger: sectionEvents,
    start: 'top 80%',
    onEnter: () => tlEvents.play(),
  })
  ScrollTrigger.create({
    trigger: sectionEvents,
    start: 'top bottom',
    onLeaveBack: () => tlEvents.pause(0),
  })

  // Init
  gsap.set('[data-anim="hero"', { opacity: 1 })
  gsap.set('[data-anim="header"', { opacity: 1 })
  gsap.set('[data-anim="first-section"', { opacity: 1 })

  tl.play()
}

export default galerieEnter
