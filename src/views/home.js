import barba from '@barba/core'
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin)

const home = () => {
  function homeFunction() {
    let videos = gsap.utils.toArray('video')
    videos.forEach((video) => {
      video.muted = true
      video.play()
    })

    const ecouter = document.querySelector('.button-ecouter')
    ecouter.addEventListener('click', () => {
      gsap.to(window, {
        scrollTo: '.section-ecouter',
        duration: 3.6,
        ease: 'power1.inOut',
      })
    })

    let mm = gsap.matchMedia()
    mm.add('(min-width: 992px)', () => {
      // Buttons about hover
      const buttons = gsap.utils.toArray(
        '.button-dates, .button-ecouter, .agenda-button'
      )
      buttons.forEach((button) => {
        button.addEventListener('mouseenter', () => {
          if (buttons.indexOf(button) === 0) {
            gsap.to(button, { scale: 1.05, duration: 0.25, rotate: -20 })
          } else if (buttons.indexOf(button) === 1) {
            gsap.to(button, { scale: 1.05, duration: 0.25, rotate: 20 })
          } else {
            gsap.to(button, { scale: 1.05, duration: 0.25 })
          }
        })
        button.addEventListener('mouseleave', () => {
          if (buttons.indexOf(button) === 0) {
            gsap.to(button, { scale: 1, duration: 0.25, rotate: 0 })
          } else if (buttons.indexOf(button) === 1) {
            gsap.to(button, { scale: 1, duration: 0.25, rotate: 0 })
          } else {
            gsap.to(button, { scale: 1, duration: 0.25 })
          }
        })
      })

      // SLIDE PROJETS
      const section = document.querySelector('.section-projets')

      gsap.to('.project-one', {
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '20% top',
          scrub: true,
        },
        scale: 1,
      })
      gsap.to('.project-two', {
        scrollTrigger: {
          trigger: section,
          start: '20% top',
          end: '40% top',
          scrub: true,
        },
        scale: 1,
      })
      gsap.to('.project-three', {
        scrollTrigger: {
          trigger: section,
          start: '40% top',
          end: '60% top',
          scrub: true,
        },
        scale: 1,
      })
      gsap.to('.project-four', {
        scrollTrigger: {
          trigger: section,
          start: '60% top',
          end: '80% top',
          scrub: true,
        },
        scale: 1,
      })

      // Nav circles

      let sectionHeight,
        distance,
        projetUn,
        projetDeux,
        projetTrois,
        projetQuatre
      function getPosition() {
        sectionHeight = section.clientHeight
        distance = section.getBoundingClientRect().top + window.scrollY
        projetUn = distance + (sectionHeight / 100) * 20
        projetDeux = distance + (sectionHeight / 100) * 40
        projetTrois = distance + (sectionHeight / 100) * 60
        projetQuatre = distance + (sectionHeight / 100) * 80
      }
      getPosition()

      window.addEventListener('resize', () => {
        getPosition()
      })

      function scroll(position) {
        return gsap.to(window, {
          scrollTo: position,
          duration: 1,
          ease: 'power1.inOut',
        })
      }

      const circles = gsap.utils.toArray('.circles-container > .circle')
      circles[0].addEventListener('click', () => {
        scroll(projetUn)
      })
      circles[1].addEventListener('click', () => {
        scroll(projetDeux)
      })
      circles[2].addEventListener('click', () => {
        scroll(projetTrois)
      })
      circles[3].addEventListener('click', () => {
        scroll(projetQuatre)
      })

      gsap.to(circles[0], { backgroundColor: '#a80000' })
      function transformCircle(a, b) {
        gsap.to(circles[a], {
          backgroundColor: '#141313',
          duration: 0.3,
          ease: 'none',
        })
        gsap.to(circles[b], {
          backgroundColor: '#a80000',
          duration: 0.3,
          ease: 'none',
        })
      }

      function linkOne() {
        barba.go('./solo')
      }
      function linkTwo() {
        barba.go('./royaumont')
      }
      function linkThree() {
        barba.go('./durand')
      }
      function linkFour() {
        barba.go('./musique-de-chambre')
      }
      const button = document.querySelector('.discover-button')
      button.addEventListener('click', linkOne)

      gsap.to('.headings-wrapper, .numbers-wrapper', {
        scrollTrigger: {
          trigger: '.section-projets',
          start: '24% top',
          end: '30% top',
          scrub: true,
          onEnter: () => {
            button.removeEventListener('click', linkOne)
            button.addEventListener('click', linkTwo)
            transformCircle(0, 1)
          },
          onEnterBack: () => {
            button.removeEventListener('click', linkTwo)
            button.addEventListener('click', linkOne)
            transformCircle(1, 0)
          },
        },
        yPercent: -25,
      })
      gsap.fromTo(
        '.headings-wrapper, .numbers-wrapper',
        { yPercent: -25 },
        {
          scrollTrigger: {
            trigger: '.section-projets',
            start: '44% top',
            end: '50% top',
            scrub: true,
            onEnter: () => {
              button.removeEventListener('click', linkTwo)
              button.addEventListener('click', linkThree)
              transformCircle(1, 2)
            },
            onEnterBack: () => {
              button.removeEventListener('click', linkThree)
              button.addEventListener('click', linkTwo)
              transformCircle(2, 1)
            },
          },
          yPercent: -50,
        }
      )
      gsap.fromTo(
        '.headings-wrapper, .numbers-wrapper',
        { yPercent: -50 },
        {
          scrollTrigger: {
            trigger: '.section-projets',
            start: '64% top',
            end: '70% top',
            scrub: true,
            onEnter: () => {
              button.removeEventListener('click', linkThree)
              button.addEventListener('click', linkFour)
              transformCircle(2, 3)
            },
            onEnterBack: () => {
              button.removeEventListener('click', linkFour)
              button.addEventListener('click', linkThree)
              transformCircle(3, 2)
            },
          },
          yPercent: -75,
        }
      )
      gsap.set('.headings-wrapper, .numbers-wrapper', { yPercent: 0 })
    })
    mm.add('(max-width: 991px)', () => {
      // PROJECT SNAP
      const circles = gsap.utils.toArray('.circles-container-mob .circle')
      let per = 0,
        current = 0

      gsap.to(circles[current], { backgroundColor: '#a80000' })

      const translateProject = () => {
        gsap.to('.projects-wrapper', { xPercent: per })
        gsap.to(circles[current], {
          backgroundColor: '#a80000',
          duration: 0.3,
          ease: 'none',
        })
        circles.forEach((circle) => {
          if (circles.indexOf(circle) != current) {
            gsap.to(circle, {
              backgroundColor: '#141313',
              duration: 0.3,
              ease: 'none',
            })
          } else return
        })
      }

      Observer.create({
        target: '.projects-container',
        type: 'touch',
        tolerance: 80,
        onRight: () => {
          if (per == 0) {
            return
          } else {
            per += 100
            current -= 1
            translateProject()
          }
        },
        onLeft: () => {
          if (per == -300) {
            return
          } else {
            per -= 100
            current += 1
            translateProject()
          }
        },
      })

      circles.forEach((circle) => {
        circle.addEventListener('click', () => {
          let index = circles.indexOf(circle)
          current = index
          per = index * -100
          translateProject()
        })
      })
    })
  }
  gsap.delayedCall(1, homeFunction)
}

export default home
