import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const animations = () => {
  function myAnimations() {
    // SPLIT HEADINGS
    let titles = new SplitType('.content-wrapper [split-letters]', {
      types: 'chars',
      tagName: 'span',
    })
    titles.elements.forEach((title) => {
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
      words.words.forEach((word) => {
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

      // FOOTER
      let tl = gsap.timeline({ paused: true })
      tl.from('.nav-item-footer', {
        autoAlpha: 0,
        yPercent: 40,
        duration: 0.4,
        stagger: { amount: 1 },
      })
        .from(
          '.line-footer',
          {
            yPercent: 30,
            autoAlpha: 0,
            duration: 1,
          },
          '<'
        )
        .from(
          '.contact-item-footer, .change-language',
          {
            autoAlpha: 0,
            yPercent: 40,
            duration: 0.4,
            stagger: { amount: 0.8 },
          },
          '-=1'
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

      let footerLinksOut = gsap.utils.toArray('.contact-item-footer')
      footerLinksOut.forEach((item) => {
        let arrow = item.querySelector('.link-arrow')
        let tl = gsap.timeline({ paused: true })
        tl.to(arrow, { yPercent: -20, xPercent: 20, scale: 1.1, duration: 0.2 })
        item.addEventListener('mouseenter', () => tl.play())
        item.addEventListener('mouseleave', () => tl.reverse())
      })
      let footerLinksNav = gsap.utils.toArray('.nav-item-footer')
      footerLinksNav.forEach((item) => {
        let link = item.querySelector('.nav-text-footer')
        let tl = gsap.timeline({ paused: true })
        tl.to(link, { color: '#b7b7b7', duration: 0.1 })
        item.addEventListener('mouseenter', () => tl.play())
        item.addEventListener('mouseleave', () => tl.reverse())
      })
    })
  }
  gsap.delayedCall(1, myAnimations)
}

export default animations
