import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const nav = (data) => {
  function navFunction() {
    let mm = gsap.matchMedia()
    mm.add('(min-width: 992px)', () => {
      const links = gsap.utils.toArray('.nav-item'),
        white = '#f7f4f4',
        red = '#a80000',
        black = '#141313',
        contact = document.querySelector('.nav-item-contact'),
        closeButton = document.querySelector('.close-button')

      let hero = true
      ScrollTrigger.create({
        trigger: '.section-hero',
        start: 'bottom 80px',
        onEnter: () => {
          hero = false
        },
        onLeaveBack: () => {
          hero = true
        },
      })
      // Nav items
      if (data.next.namespace == 'agenda') {
        links.forEach((link) => {
          let text = link.querySelector('.nav-text')
          let tlBlack = gsap.timeline({ paused: true })
          tlBlack
            .to(text, {
              color: black,
              duration: 0.1,
              ease: 'none',
            })
            .to(link, { borderColor: black, duration: 0.1, ease: 'none' }, '<')
          let tlWhite = gsap.timeline({ paused: true })
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
          contact.addEventListener('click', () => {
            if (hero == true) {
              link.removeEventListener('mouseenter', blackPlay)
              link.removeEventListener('mouseleave', blackReverse)
              link.addEventListener('mouseenter', whitePlay)
              link.addEventListener('mouseleave', whiteReverse)
            }
          })
          closeButton.addEventListener('click', () => {
            if (hero == true) {
              link.removeEventListener('mouseenter', whitePlay)
              link.removeEventListener('mouseleave', whiteReverse)
              link.addEventListener('mouseenter', blackPlay)
              link.addEventListener('mouseleave', blackReverse)
            }
          })
        })
        // Nav items projects
        const linksProjets = gsap.utils.toArray('.nav-text-project-red')
        linksProjets.forEach((link) => {
          gsap.set(link, { color: black })
          let whiteToRed = gsap.timeline({
            paused: true,
          })
          whiteToRed.fromTo(
            link,
            { color: white },
            {
              color: red,
              duration: 0.1,
              ease: 'none',
            }
          )
          let blackToRed = gsap.timeline({
            paused: true,
          })
          blackToRed.fromTo(
            link,
            { color: black },
            {
              color: red,
              duration: 0.1,
              ease: 'none',
            }
          )
          function redPlayOne() {
            blackToRed.play()
          }
          function redReverseOne() {
            blackToRed.reverse()
          }
          function redPlayTwo() {
            whiteToRed.play()
          }
          function redReverseTwo() {
            whiteToRed.reverse()
          }
          link.addEventListener('mouseenter', redPlayOne)
          link.addEventListener('mouseleave', redReverseOne)

          ScrollTrigger.create({
            trigger: '.section-hero',
            start: 'bottom 80px',
            onEnter: () => {
              gsap.set(link, { color: white })
              link.removeEventListener('mouseenter', redPlayOne)
              link.removeEventListener('mouseleave', redReverseOne)
              link.addEventListener('mouseenter', redPlayTwo)
              link.addEventListener('mouseleave', redReverseTwo)
            },
            onLeaveBack: () => {
              gsap.set(link, { color: black })
              link.removeEventListener('mouseenter', redPlayTwo)
              link.removeEventListener('mouseleave', redReverseTwo)
              link.addEventListener('mouseenter', redPlayOne)
              link.addEventListener('mouseleave', redReverseOne)
            },
          })
          contact.addEventListener('click', () => {
            if (hero == true) {
              gsap.set(link, { color: white })
              link.removeEventListener('mouseenter', redPlayOne)
              link.removeEventListener('mouseleave', redReverseOne)
              link.addEventListener('mouseenter', redPlayTwo)
              link.addEventListener('mouseleave', redReverseTwo)
            }
          })
          closeButton.addEventListener('click', () => {
            if (hero == true) {
              gsap.set(link, { color: black })
              link.removeEventListener('mouseenter', redPlayTwo)
              link.removeEventListener('mouseleave', redReverseTwo)
              link.addEventListener('mouseenter', redPlayOne)
              link.addEventListener('mouseleave', redReverseOne)
            }
          })
        })
      } else {
        links.forEach((link) => {
          let text = link.querySelector('.nav-text')
          let tlRed = gsap.timeline({
            paused: true,
          })
          tlRed
            .to(text, {
              color: red,
              duration: 0.1,
              ease: 'none',
            })
            .to(link, { borderColor: red, duration: 0.1, ease: 'none' }, '<')

          link.addEventListener('mouseenter', () => tlRed.play())
          link.addEventListener('mouseleave', () => tlRed.reverse())
        })
        const linksProjets = gsap.utils.toArray('.nav-text-projet')
        linksProjets.forEach((link) => {
          let tlWhite = gsap.timeline({ paused: true })
          tlWhite.to(link, {
            color: white,
            duration: 0.1,
            ease: 'none',
          })

          link.addEventListener('mouseenter', () => tlWhite.play())
          link.addEventListener('mouseleave', () => tlWhite.reverse())
        })
      }

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
