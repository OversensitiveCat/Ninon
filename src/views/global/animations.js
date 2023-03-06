import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const animations = () => {
  function myAnimations() {
    let mm = gsap.matchMedia()
    mm.add(
      {
        isDesktop: `(min-width: 992px)`,
        isTablet: `(max-width: 991px)`,
        isMobile: `(max-width: 767px)`,
      },
      (context) => {
        // eslint-disable-next-line no-unused-vars
        let { isDesktop, isTablet, isMobile } = context.conditions

        if (isDesktop) {
          // SPLIT TEXT
          let words = new SplitType('[split-words]', {
            types: 'words',
            tagName: 'span',
          })
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
              '.contact-item-footer',
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

          let footerLinksNav = gsap.utils.toArray('.nav-item-footer')
          footerLinksNav.forEach((item) => {
            let link = item.querySelector('.nav-text-footer')
            let tlFooterTwo = gsap.timeline({ paused: true })
            tlFooterTwo.to(link, { color: '#b7b7b7', duration: 0.1 })
            item.addEventListener('mouseenter', () => tlFooterTwo.play())
            item.addEventListener('mouseleave', () => tlFooterTwo.reverse())
          })

          // HOVER

          let linksArrow = gsap.utils.toArray('[link-arrow]')
          linksArrow.forEach((link) => {
            let arrow = link.querySelector('.link-arrow')
            let hover = gsap.timeline({ paused: true })
            hover.to(arrow, {
              yPercent: -25,
              xPercent: 25,
              scale: 1.2,
              duration: 0.2,
              ease: 'none',
            })
            link.addEventListener('mouseenter', () => hover.play())
            link.addEventListener('mouseleave', () => hover.reverse())
          })
        }
        // SPLIT HEADINGS
        let titles = new SplitType('.content-wrapper [split-letters]', {
          types: 'chars',
          tagName: 'span',
        })
        titles.elements.forEach((title) => {
          if (title.dataset.anim == 'rotated-title') {
            title.style.whiteSpace = 'nowrap'
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
              start: isDesktop ? '-500% bottom' : '-50% bottom',
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

        // GLOBAL ANIM
        const divs = gsap.utils.toArray('[data-anim]')
        divs.forEach((div) => {
          if (div.dataset.anim == 1) {
            let tl = gsap.timeline({ paused: true })
            tl.from(div, {
              opacity: 0,
              yPercent: isDesktop ? 60 : 30,
              duration: isDesktop ? 1 : 0.8,
            })
            ScrollTrigger.create({
              trigger: div,
              start: isDesktop ? '-50% bottom' : '-25% bottom',
              onLeaveBack: () => {
                tl.progress(0)
                tl.pause()
              },
            })
            ScrollTrigger.create({
              trigger: div,
              start: isDesktop ? 'top 80%' : 'top 85%',
              onEnter: () => tl.play(),
            })
          } else if (div.dataset.anim == 2) {
            let tl = gsap.timeline({ paused: true })
            tl.from(div, {
              opacity: 0,
              yPercent: isDesktop ? 20 : 10,
              duration: isDesktop ? 1 : 0.8,
            })
            ScrollTrigger.create({
              trigger: div,
              start: '-20% bottom',
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
        // if (isTablet && isMobile === false) {
        //   console.log('tablet is', isTablet)
        // }
        // if (isMobile) {
        //   console.log('mobile is', isMobile)
        // }
      }
    )
  }
  gsap.delayedCall(1, myAnimations)
}

export default animations
