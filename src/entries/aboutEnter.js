import { gsap } from 'gsap'
import SplitType from 'split-type'

import { isDesktop } from '../utilities/utilities'

const aboutEnter = () => {
  let paras = gsap.utils.toArray('.bio-highlight-para, .bio-para')
  paras = paras.filter((p) => {
    return !p.classList.contains('en')
  })

  const highlight = new SplitType(paras[0], {
    types: 'words',
    tagName: 'span',
  })

  let tl = gsap.timeline({ paused: true })
  if (isDesktop()) {
    const lettersNav = new SplitType('.nav-bar-logo', {
      types: 'chars',
      tagName: 'span',
    })

    tl.from('.nav-item', {
      opacity: 0,
      yPercent: 100,
      duration: 0.4,
      stagger: { amount: 1 },
    })
      .from(
        lettersNav.chars,
        {
          opacity: 0,
          scale: 0.2,
          yPercent: -20,
          duration: 0.2,
          stagger: { amount: 0.5 },
        },
        0
      )
      .from('.img-about img', { scale: 0.9, duration: 1 }, 0.5)
      .to('.img-about .img-hide', { xPercent: -100, duration: 1 }, 0.5)
      .from(
        highlight.words,
        {
          opacity: 0,
          xPercent: -20,
          duration: 0.3,
          stagger: { amount: 1.2 },
        },
        0.5
      )
      .from(paras[1], { opacity: 0, yPercent: 20 }, '>-=1.2')
      .from('.bio-line', { opacity: 0, yPercent: 30 }, '<+=0.4')
      .from(paras[2], { opacity: 0, yPercent: 20 }, '<+=0.4')
  } else {
    tl.from(highlight.words, {
      opacity: 0,
      xPercent: -20,
      duration: 0.3,
      stagger: { amount: 1.2 },
    })

    gsap.to('.img-about .img-hide', {
      xPercent: -100,
      duration: 1,
      scrollTrigger: {
        trigger: '.img-about .img-hide',
        start: 'top 80%',
      },
    })
    gsap.from(paras[1], {
      opacity: 0,
      yPercent: 10,
      scrollTrigger: {
        trigger: paras[1],
        start: 'top 80%',
      },
    })
    gsap.from(paras[2], {
      opacity: 0,
      yPercent: 10,
      scrollTrigger: {
        trigger: paras[2],
        start: 'top 80%',
      },
    })
  }

  gsap.set('[data-anim="first-section"], [data-anim="header"]', { opacity: 1 })

  return tl
}

export default aboutEnter
