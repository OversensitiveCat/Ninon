import { Lenis } from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitType } from 'split-type'

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin)

const setLenis = () => {
  const lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
}

const navMobile = () => {
  let tl = gsap.timeline({ paused: true })
  tl.to('.nav-page-mobile', { zIndex: 3, duration: 0 })
    .from('.nav-page-mobile', { height: '0%', duration: 0.5 }, '<')
    .to('.close-line1', { duration: 1, autoAlpha: 1, rotate: 45 }, '<')
    .to('.close-line2', { duration: 1, autoAlpha: 1, rotate: -45 }, '<')
    .from(
      '.nav-item-mobile',
      {
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.2,
        yPercent: 60,
      },
      '-=0.4'
    )

  document.querySelector('.nav-open').addEventListener('click', () => {
    tl.play()
    document.querySelector('.body').style.overflowY = 'hidden'
  })
  document.querySelector('.nav-close').addEventListener('click', () => {
    tl.reverse()
    document.querySelector('.body').style.overflowY = 'scroll'
  })
}

const animations = () => {
  // SPLIT HEADINGS
  let titles = new SplitType('.content-wrapper [split-letters]', {
    types: 'chars',
    tagName: 'span',
  })
  // const titles = gsap.utils.toArray('.content-wrapper [split-letters]')
  titles.forEach((title) => {
    title.style.whiteSpace = 'nowrap'
    if (title.dataset.anim == 'rotated-title') {
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
        start: '-500% bottom',
        onLeaveBack: () => {
          tl.progress(0)
          tl.pause()
        },
      })
      ScrollTrigger.create({
        trigger: title,
        start: 'top 80%',
        onEnter: () => tl.play(),
      })
    } else {
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
        onLeaveBack: () => {
          tl.progress(0)
          tl.pause()
        },
      })
      ScrollTrigger.create({
        trigger: title,
        start: 'top 80%',
        onEnter: () => tl.play(),
      })
    }
  })

  let mm = gsap.matchMedia()
  mm.add('(min-width: 992px)', () => {
    // SPLIT TEXT
    let words = new SplitType('[split-words]', {
      types: 'words',
      tagName: 'span',
    })
    // const words = gsap.utils.toArray('.word')
    words.forEach((word) => {
      let tl = gsap.timeline({ paused: true })
      tl.from(word, {
        autoAlpha: 0,
        rotateX: 30,
        yPercent: 20,
        duration: 1,
      })
      ScrollTrigger.create({
        trigger: word,
        start: '-20% bottom',
        onLeaveBack: () => {
          tl.progress(0)
          tl.pause()
        },
      })
      ScrollTrigger.create({
        trigger: word,
        start: 'top 80%',
        onEnter: () => tl.play(),
      })
    })
    // GLOBAL ANIM
    const divs = gsap.utils.toArray('[data-anim]')
    divs.forEach((div) => {
      if (div.dataset.anim == 1) {
        let tl = gsap.timeline({ paused: true })
        tl.from(div, {
          opacity: 0,
          yPercent: 60,
          duration: 1,
        })
        ScrollTrigger.create({
          trigger: div,
          start: '-60% bottom',
          onLeaveBack: () => {
            tl.progress(0)
            tl.pause()
          },
        })
        ScrollTrigger.create({
          trigger: div,
          start: 'top 80%',
          onEnter: () => tl.play(),
        })
      } else if (div.dataset.anim == 2) {
        let tl = gsap.timeline({ paused: true })
        tl.from(div, {
          opacity: 0,
          yPercent: 10,
          duration: 1,
        })
        ScrollTrigger.create({
          trigger: div,
          start: '-15% bottom',
          onLeaveBack: () => {
            tl.progress(0)
            tl.pause()
          },
        })
        ScrollTrigger.create({
          trigger: div,
          start: 'top 80%',
          onEnter: () => tl.play(),
        })
      }
    })
  })
}

const footer = () => {
  let mm = gsap.matchMedia()
  mm.add('(min-width: 992px)', () => {
    let tl = gsap.timeline({ paused: true })
    tl.from('.nav-item-footer', {
      autoAlpha: 0,
      yPercent: 60,
      duration: 0.4,
      stagger: { amount: 1.2 },
    })
      .from(
        '.line-footer',
        {
          yPercent: 30,
          autoAlpha: 0,
          duration: 1.2,
        },
        0
      )
      .from(
        '.contact-item, .change-language',
        {
          autoAlpha: 0,
          yPercent: 60,
          duration: 0.8,
          stagger: { amount: 1.2 },
        },
        0
      )
    ScrollTrigger.create({
      trigger: '.content-wrapper',
      start: 'bottom bottom',
      onLeaveBack: () => {
        tl.progress(0)
        tl.pause()
      },
    })
    ScrollTrigger.create({
      trigger: '.content-wrapper',
      start: 'bottom 90%',
      onEnter: () => tl.play(),
    })
  })
}

export { animations, setLenis, navMobile, footer }
