import barba from '@barba/core'
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger, Observer, ScrollToPlugin)

const home = () => {
  function homeFunction() {
    let videos = gsap.utils.toArray('video')
    videos.forEach((video) => {
      video.muted = true
      video.play()
    })
    let mm = gsap.matchMedia()
    mm.add('(min-width: 992px)', () => {
      // ECLATER
      let letters = new SplitType('.eclater', {
        types: 'chars',
        tagName: 'span',
      })
      // const letters = gsap.utils.toArray('.eclater .char')
      letters.chars.forEach((letter) => {
        let index = letters.chars.indexOf(letter)
        if (index % 2 == 0) {
          gsap.to(letter, {
            scrollTrigger: {
              trigger: '.eclater',
              scrub: true,
              start: 'top 70%',
              end: 'top 20%',
            },
            yPercent: -8,
            rotate: -5,
          })
        } else {
          gsap.to(letter, {
            scrollTrigger: {
              trigger: '.eclater',
              scrub: true,
              start: 'top 70%',
              end: 'top 20%',
            },
            yPercent: 8,
            rotate: 5,
          })
        }
      })
      // SLIDE PROJETS
      gsap.to('.project-one', {
        scrollTrigger: {
          trigger: '.section-projets',
          start: 'top top',
          end: '20% top',
          scrub: true,
        },
        scale: 1,
      })
      gsap.to('.project-two', {
        scrollTrigger: {
          trigger: '.section-projets',
          start: '20% top',
          end: '40% top',
          scrub: true,
        },
        scale: 1,
      })
      gsap.to('.project-three', {
        scrollTrigger: {
          trigger: '.section-projets',
          start: '40% top',
          end: '60% top',
          scrub: true,
        },
        scale: 1,
      })
      gsap.to('.project-four', {
        scrollTrigger: {
          trigger: '.section-projets',
          start: '60% top',
          end: '80% top',
          scrub: true,
        },
        scale: 1,
      })

      const circles = gsap.utils.toArray('.circles-container > .circle')
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
        barba.go('./programme-2023')
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

      // SLIDE VIDEOS
      const arrows = gsap.utils.toArray('.arrow-video')
      const videoItems = gsap.utils.toArray('.video-item')
      const videoImg = gsap.utils.toArray('.video-image')

      let current = 1
      let percent = 0
      let width = 33
      let widthPercent = width + '%'

      const transform = () => {
        videoItems.forEach((vid) => {
          if (videoItems.indexOf(vid) === current) {
            gsap.to(vid, { yPercent: 0, duration: 0.8 })
          } else {
            gsap.to(vid, { yPercent: -10, duration: 0.8 })
          }
        })
        videoImg.forEach((img) => {
          if (videoImg.indexOf(img) === current) {
            gsap.to(img, { filter: 'none', duration: 0.8 })
          } else {
            gsap.to(img, { filter: 'grayscale(100%)', duration: 0.8 })
          }
        })
        gsap.to('.videos-wrapper', { xPercent: percent, duration: 0.8 })
        gsap.to('.loading-line', { width: widthPercent, duration: 0.8 })
      }

      transform()

      function goLeft() {
        if (percent == 0) {
          gsap.to('#arrow-video-left', { attr: { stroke: '#201f1f' } })
        }
        if (percent == -66) {
          gsap.to('#arrow-video-right', { attr: { stroke: '#a80000' } })
        }
        if (percent == 33) {
          return
        } else {
          percent += 33
          current -= 1
          width -= 33
          widthPercent = width + '%'
          transform()
        }
      }

      function goRight() {
        if (percent == -33) {
          gsap.to('#arrow-video-right', { attr: { stroke: '#201f1f' } })
        }
        if (percent == 33) {
          gsap.to('#arrow-video-left', { attr: { stroke: '#a80000' } })
        }
        if (percent == -66) {
          return
        } else {
          percent -= 33
          current += 1
          width += 33
          widthPercent = width + '%'
          transform()
        }
      }
      arrows[0].addEventListener('click', () => goLeft())
      arrows[1].addEventListener('click', () => goRight())
      window.addEventListener('keydown', (e) => {
        if (e.key == 'ArrowLeft') {
          goLeft()
        } else if (e.key == 'ArrowRight') {
          goRight()
        }
      })
    })
    mm.add('(max-width: 991px)', () => {
      // HAMBURGER COLOR
      const goBlack = () => {
        gsap.to('.ham-line1, .ham-line2', { backgroundColor: '#141313' })
      }
      const goWhite = () => {
        gsap.to('.ham-line1, .ham-line2', { backgroundColor: '#f7f4f4' })
      }

      ScrollTrigger.create({
        trigger: '.card-agenda',
        start: 'top top',
        end: 'bottom 40',
        onEnter: () => goBlack(),
        onEnterBack: () => goBlack(),
        onLeave: () => goWhite(),
        onLeaveBack: () => goWhite(),
      })
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
        tolerance: 60,
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

      // VIDEOS SNAP MOBILE
      const wrapper = document.querySelector('.videos-wrapper')
      const arrows = gsap.utils.toArray('.arrow-video')
      let percent = 0
      const translate = () => {
        gsap.to(wrapper, { xPercent: percent })
      }
      gsap.set('#arrow-video-left', { attr: { stroke: '#201f1f' } })
      function goLeft() {
        if (percent == -100) {
          gsap.to('#arrow-video-left', { attr: { stroke: '#201f1f' } })
        }
        if (percent == -300) {
          gsap.to('#arrow-video-right', { attr: { stroke: '#a80000' } })
        }
        if (percent == 0) {
          return
        } else {
          percent += 100
          translate()
        }
      }
      function goRight() {
        if (percent == -200) {
          gsap.to('#arrow-video-right', { attr: { stroke: '#201f1f' } })
        }
        if (percent == 0) {
          gsap.to('#arrow-video-left', { attr: { stroke: '#a80000' } })
        }
        if (percent == -300) {
          return
        } else {
          percent -= 100
          translate()
        }
      }

      Observer.create({
        target: '.videos-container',
        type: 'touch',
        tolerance: 60,
        onRight: () => goLeft(),
        onLeft: () => goRight(),
      })
      arrows[0].addEventListener('click', () => goLeft())
      arrows[1].addEventListener('click', () => goRight())
    })
  }
  gsap.delayedCall(1, homeFunction)
}

export default home
