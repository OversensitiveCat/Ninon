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

    const langButtons = gsap.utils.toArray('.lang-text')
    const text = gsap.utils.toArray('.bio-highlight-para, .bio-para')

    function removeFr(para) {
      return para.classList.contains('en')
    }
    function removeEn(para) {
      if (para.classList.contains('en')) {
        return false
      } else return true
    }
    const en = text.filter(removeFr)
    const fr = text.filter(removeEn)
    let tl = gsap.timeline()

    gsap.set(en, { autoAlpha: 0 })
    langButtons[0].addEventListener('click', () => {
      if (langButtons[0].classList.contains('active')) {
        return console.log('nope, is already in french')
      } else {
        tl.to(en, {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.in',
        })
          .to(fr, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' })
          .set(en, { autoAlpha: 0 })
        langButtons[2].classList.remove('active')
        langButtons[0].classList.add('active')
      }
    })
    langButtons[2].addEventListener('click', () => {
      if (langButtons[2].classList.contains('active')) {
        return console.log('nope, is already in english')
      } else {
        tl.to(fr, {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.in',
        })
          .to(en, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' })
          .set(fr, { autoAlpha: 0 })
        langButtons[0].classList.remove('active')
        langButtons[2].classList.add('active')
      }
    })

    const ecouter = document.querySelector('.button-ecouter')
    ecouter.addEventListener('click', () => {
      gsap.to(window, {
        scrollTo: '.section-ecouter',
        duration: 2,
        ease: 'power1.inOut',
      })
    })

    let mm = gsap.matchMedia()
    mm.add('(min-width: 992px)', () => {
      // Buttons about hover
      const buttonsAbout = gsap.utils.toArray('.button-dates, .button-ecouter')
      buttonsAbout.forEach((button) => {
        button.addEventListener('mouseenter', () => {
          if (buttonsAbout.indexOf(button) === 0) {
            gsap.to(button, { scale: 1.05, duration: 0.25, rotate: -20 })
          } else {
            gsap.to(button, { scale: 1.05, duration: 0.25, rotate: 20 })
          }
        })
        button.addEventListener('mouseleave', () => {
          if (buttonsAbout.indexOf(button) === 0) {
            gsap.to(button, { scale: 1, duration: 0.25, rotate: 0 })
          } else {
            gsap.to(button, { scale: 1, duration: 0.25, rotate: 0 })
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
          gsap.to('#arrow-video-left', {
            attr: { stroke: '#201f1f' },
            duration: 0.25,
          })
        }
        if (percent == -66) {
          gsap.to('#arrow-video-right', {
            attr: { stroke: '#a80000' },
            duration: 0.25,
          })
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
          gsap.to('#arrow-video-right', {
            attr: { stroke: '#201f1f' },
            duration: 0.25,
          })
        }
        if (percent == 33) {
          gsap.to('#arrow-video-left', {
            attr: { stroke: '#a80000' },
            duration: 0.25,
          })
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
