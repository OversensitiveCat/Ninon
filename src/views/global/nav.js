import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const nav = (data) => {
  function navFunction() {
    let mm = gsap.matchMedia()
    mm.add('(min-width: 992px)', () => {
      const links = gsap.utils.toArray('.nav-item'),
        linksProjets = gsap.utils.toArray('.nav-text-projet'),
        white = '#f7f4f4',
        red = '#a80000',
        black = '#141313'

      links.forEach((link) => {
        let text = link.querySelector('.nav-text')
        let tlBlack = gsap.timeline({
          paused: true,
          duration: 0.1,
          ease: 'none',
        })
        tlBlack
          .to(text, {
            color: black,
            duration: 0.1,
            ease: 'none',
          })
          .to(link, { borderColor: black, duration: 0.1, ease: 'none' }, '<')
        let tlWhite = gsap.timeline({
          paused: true,
          duration: 0.1,
          ease: 'none',
        })
        tlWhite
          .to(text, {
            color: white,
            duration: 0.1,
            ease: 'none',
          })
          .to(link, { borderColor: white, duration: 0.1, ease: 'none' }, '<')
        function blackPlay() {
          tlBlack.play()
        }
        function blackReverse() {
          tlBlack.reverse()
        }
        function whitePlay() {
          tlWhite.play()
        }
        function whiteReverse() {
          tlWhite.reverse()
        }
        link.addEventListener('mouseenter', blackPlay)
        link.addEventListener('mouseleave', blackReverse)
        ScrollTrigger.create({
          trigger: '.section-hero',
          start: 'bottom 80px',
          onEnter: () => {
            link.removeEventListener('mouseenter', blackPlay)
            link.removeEventListener('mouseleave', blackReverse)
            link.addEventListener('mouseenter', whitePlay)
            link.addEventListener('mouseleave', whiteReverse)
          },
          onLeaveBack: () => {
            link.removeEventListener('mouseenter', whitePlay)
            link.removeEventListener('mouseleave', whiteReverse)
            link.addEventListener('mouseenter', blackPlay)
            link.addEventListener('mouseleave', blackReverse)
          },
        })
        linksProjets.forEach((link) => {
          let tlRed = gsap.timeline({
            paused: true,
          })
          tlRed.to(link, {
            color: red,
            duration: 0.1,
            ease: 'none',
          })

          let tlWhite = gsap.timeline({
            paused: true,
          })
          tlWhite.to(link, {
            color: white,
            duration: 0.1,
            ease: 'none',
          })
          function redPlay() {
            tlRed.play()
          }
          function redReverse() {
            tlRed.reverse()
          }
          function whitePlay() {
            tlWhite.play()
          }
          function whiteReverse() {
            tlWhite.reverse()
          }
          link.addEventListener('mouseenter', blackPlay)
          link.addEventListener('mouseleave', blackReverse)
          let setColor = gsap.timeline({ paused: true })
          setColor.set(link, { color: red })
          ScrollTrigger.create({
            trigger: '.section-hero',
            start: 'bottom 80px',
            onEnter: () => {
              setColor.play()
            },
            onLeaveBack: () => {
              setColor.reverse()
            },
          })
        })
      })

      if (data.next.namespace != 'home' && data.next.namespace != 'galerie') {
        let navColor = gsap.timeline({ paused: true })
        navColor.to('.nav-bar-fixed, .nav-projets', {
          backgroundColor: black,
          duration: 0.3,
          ease: 'none',
        })
        ScrollTrigger.create({
          trigger: '.section-hero',
          start: 'bottom 80px',
          onEnter: () => {
            navColor.play()
          },
          onLeaveBack: () => {
            navColor.reverse()
          },
        })
      }
    })
  }
  gsap.delayedCall(1, navFunction)
}

export default nav
