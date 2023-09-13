import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

import { touchDevice } from '../utilities/utilities'

gsap.registerPlugin(ScrollTrigger)

const wordsFadeIn = () => {
  let mm = gsap.matchMedia()
  mm.add(
    {
      isDesktop: '(min-width: 992px)',
      isMobile: '(max-width: 991px)',
    },
    (context) => {
      // eslint-disable-next-line no-unused-vars
      let { isDesktop, isMobile } = context.conditions
      const paras = gsap.utils.toArray('[data-anim="words"]')
      if (isDesktop) {
        const words = new SplitType(paras, {
          types: 'words',
          tagName: 'span',
        })
        words.words.forEach((word) => {
          let tl = gsap.timeline({ paused: true })
          tl.from(word, {
            opacity: 0,
            rotateX: 30,
            yPercent: 20,
            duration: 1,
          })
          ScrollTrigger.create({
            trigger: word,
            start: 'top 80%',
            onEnter: () => tl.play(),
          })
          ScrollTrigger.create({
            trigger: word,
            start: '-20% bottom',
            onLeaveBack: () => tl.pause(0),
          })
        })
      } else if (isMobile) {
        paras.forEach((para) => {
          let tl = gsap.timeline({ paused: true })
          tl.from(para, {
            opacity: 0,
            yPercent: 10,
            duration: 0.8,
          })
          ScrollTrigger.create({
            trigger: para,
            start: 'top 85%',
            onEnter: () => tl.play(),
          })
          ScrollTrigger.create({
            trigger: para,
            start: '-10% bottom',
            onLeaveBack: () => tl.pause(0),
          })
        })
      }
    }
  )
}

const linksOut = () => {
  if (touchDevice()) return
  let links = gsap.utils.toArray('[data-hover="link-arrow"]')
  links.forEach((link) => {
    let arrow = link.querySelector('img')
    let tl = gsap.timeline({ paused: true })
    tl.to(arrow, {
      yPercent: -25,
      xPercent: 25,
      scale: 1.2,
      duration: 0.2,
      ease: 'none',
    })
    link.addEventListener('mouseenter', () => tl.play())
    link.addEventListener('mouseleave', () => tl.reverse())
  })
}

const headingsFadeIn = () => {
  let titles = new SplitType('[data-anim="heading"]', {
    types: 'chars',
    tagName: 'span',
  })
  titles.elements.forEach((title) => {
    let letters = title.querySelectorAll('.char')
    let tl = gsap.timeline({ paused: true })
    tl.from(letters, {
      autoAlpha: 0,
      scale: 0.2,
      yPercent: -40,
      duration: 0.2,
      stagger: { amount: 0.5 },
    })
    ScrollTrigger.create({
      trigger: title,
      start: 'top bottom',
      onLeaveBack: () => tl.pause(0),
    })
    ScrollTrigger.create({
      trigger: title,
      start: 'top 80%',
      onEnter: () => tl.play(),
    })
  })
}

const divsFadeIn = () => {
  let mm = gsap.matchMedia()
  mm.add(
    {
      isDesktop: '(min-width: 992px)',
      isMobile: '(max-width: 991px)',
    },
    (context) => {
      // eslint-disable-next-line no-unused-vars
      let { isDesktop, isMobile } = context.conditions

      const divsOne = gsap.utils.toArray('[data-anim="1"]')
      divsOne.forEach((div) => {
        let tl = gsap.timeline({ paused: true })
        tl.fromTo(
          div,
          {
            opacity: 0,
            yPercent: isDesktop ? 60 : 30,
            duration: isDesktop ? 1 : 0.8,
          },
          { opacity: 1, yPercent: 0 }
        )
        ScrollTrigger.create({
          trigger: div,
          start: isDesktop ? '-50% bottom' : '-25% bottom',
          onLeaveBack: () => tl.pause(0),
        })
        ScrollTrigger.create({
          trigger: div,
          start: isDesktop ? 'top 85%' : 'top 90%',
          onEnter: () => tl.play(),
        })
      })

      const divsTwo = gsap.utils.toArray('[data-anim="2"]')
      divsTwo.forEach((div) => {
        let tl = gsap.timeline({ paused: true })
        tl.fromTo(
          div,
          {
            opacity: 0,
            yPercent: isDesktop ? 15 : 10,
            duration: isDesktop ? 1 : 0.8,
          },
          { opacity: 1, yPercent: 0 }
        )
        ScrollTrigger.create({
          trigger: div,
          start: '-20% bottom',
          onLeaveBack: () => tl.pause(0),
        })
        ScrollTrigger.create({
          trigger: div,
          start: 'top 85%',
          onEnter: () => tl.play(),
        })
      })
    }
  )
}

export { wordsFadeIn, headingsFadeIn, divsFadeIn, linksOut }
