import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger, Observer)

const galerieEnter = () => {
  function galerieFunction() {
    gsap.set('.nav-bar > *, max-width > *', { autoAlpha: 1 })
    let letters = new SplitType('.heading1', {
      types: 'chars',
      tagName: 'span',
    })
    let lettersNav = new SplitType('.nav-heading', {
      types: 'chars',
      tagName: 'span',
    })
    let tl = gsap.timeline()
    tl.from(
      letters.chars,
      {
        autoAlpha: 0,
        scale: 0.2,
        yPercent: -20,
        duration: 0.2,
        stagger: { amount: 0.5 },
      },
      '+=0.8'
    )
      .from(
        '.nav-item',
        {
          autoAlpha: 0,
          yPercent: 100,
          duration: 0.4,
          stagger: { amount: 1 },
        },
        '-=0.2'
      )
      .from(
        lettersNav.chars,
        {
          autoAlpha: 0,
          scale: 0.2,
          yPercent: -20,
          duration: 0.2,
          stagger: { amount: 0.5 },
        },
        '<'
      )
      .from(
        '.photos-item',
        { opacity: 0, yPercent: 20, stagger: 0.35 },
        '-=0.8'
      )
      .from(
        '.max-width > .loading-line-box',
        { opacity: 0, yPercent: 60 },
        '-=1'
      )
      .from('.link-out.global', { opacity: 0, yPercent: 20 }, '-=0.8')
      .from(
        '.nav-galerie',
        {
          opacity: 0,
          rotate: 360,
          yPercent: -60,
          xPercent: -50,
          duration: 0.7,
        },
        '<'
      )

    const container = document.querySelector('.photos-container'),
      photo = document.querySelector('.photo'),
      arrows = gsap.utils.toArray('.arrow-galerie'),
      photosBox = gsap.utils.toArray('.photo-box'),
      photosItem = gsap.utils.toArray('.photos-item')
    let percent = 0,
      width = 25,
      widthPercent = width + '%',
      active = 1,
      largBox = photo.offsetWidth,
      mm = gsap.matchMedia()

    mm.add(
      {
        isDesktop: `(min-width: 992px)`,
        isTablet: `(max-width: 991px)`,
        isMobile: `(max-width: 767px)`,
      },
      (context) => {
        let { isDesktop, isTablet, isMobile } = context.conditions

        if (isDesktop) {
          console.log('Desktop')
        }
        if (isDesktop == false) {
          console.log('Not desktop')
        }
        if (isTablet && isMobile == false) {
          console.log('Tablet')
        }
        if (isMobile) {
          console.log('Mobile')
        }

        function boxSize() {
          photosBox.forEach((box) => {
            if (photosBox.indexOf(box) == active) {
              gsap.set(box, { height: 'auto' })
            } else {
              gsap.set(box, { height: photo.offsetWidth })
            }
          })
        }
        function ajustSize() {
          gsap.set(container, { height: 'auto' })
          let height = container.offsetHeight
          gsap.set(container, { height: height })
        }
        if (isDesktop) {
          boxSize()
          ajustSize()
          window.addEventListener('resize', () => {
            largBox = photo.offsetWidth
            boxSize()
            ajustSize()
          })
        }

        function transform() {
          gsap.to('.photos-wrapper', {
            xPercent: percent,
            duration: isDesktop ? 0.6 : 0.4,
            ease: 'none',
          })
          gsap.to('.loading-line-galerie', {
            width: widthPercent,
            duration: isDesktop ? 0.6 : 0.4,
            ease: 'none',
          })
          if (isDesktop) {
            photosItem.forEach((item) => {
              if (photosItem.indexOf(item) == active) {
                gsap.to(item, { yPercent: 10, duration: 0.6 })
              } else {
                gsap.to(item, { yPercent: 0, duration: 0.6 })
              }
            })
            photosBox.forEach((box) => {
              if (photosBox.indexOf(box) == active) {
                gsap.to(box, { height: 'auto', duration: 0.6 })
              } else {
                gsap.to(box, { height: largBox, duration: 0.6 })
              }
            })
          }
        }
        transform()

        function goLeft() {
          if (isDesktop) {
            if (percent == 0) {
              gsap.to('#arrow-video-left', { attr: { stroke: '#201f1f' } })
            }
            if (percent == -60) {
              gsap.to('#arrow-video-right', { attr: { stroke: '#a80000' } })
            }
            if (percent == 20) {
              return
            } else {
              percent += 20
              width -= 25
              active -= 1
              widthPercent = width + '%'
              transform()
            }
          }
          if (isTablet && isMobile == false) {
            if (percent == -20) {
              gsap.to('#arrow-video-left', { attr: { stroke: '#201f1f' } })
            }
            if (percent == -60) {
              gsap.to('#arrow-video-right', { attr: { stroke: '#a80000' } })
            }
            if (percent == 0) {
              return
            } else {
              percent += 20
              width -= 25
              widthPercent = width + '%'
              transform()
            }
          }
          if (isMobile) {
            if (percent == -20) {
              gsap.to('#arrow-video-left', { attr: { stroke: '#201f1f' } })
            }
            if (percent == -80) {
              gsap.to('#arrow-video-right', { attr: { stroke: '#a80000' } })
            }
            if (percent == 0) {
              return
            } else {
              percent += 20
              width -= 25
              widthPercent = width + '%'
              transform()
            }
          }
        }
        function goRight() {
          if (isDesktop) {
            if (percent == -40) {
              gsap.to('#arrow-video-right', { attr: { stroke: '#201f1f' } })
            }
            if (percent == 20) {
              gsap.to('#arrow-video-left', { attr: { stroke: '#a80000' } })
            }
            if (percent == -60) {
              return
            } else {
              percent -= 20
              width += 25
              active += 1
              widthPercent = width + '%'
              transform()
            }
          }
          if (isTablet && isMobile == false) {
            if (percent == -40) {
              gsap.to('#arrow-video-right', { attr: { stroke: '#201f1f' } })
            }
            if (percent == 0) {
              gsap.to('#arrow-video-left', { attr: { stroke: '#a80000' } })
            }
            if (percent == -60) {
              return
            } else {
              percent -= 20
              width += 25
              widthPercent = width + '%'
              transform()
            }
          }
          if (isMobile) {
            if (percent == -60) {
              gsap.to('#arrow-video-right', { attr: { stroke: '#201f1f' } })
            }
            if (percent == 0) {
              gsap.to('#arrow-video-left', { attr: { stroke: '#a80000' } })
            }
            if (percent == -80) {
              return
            } else {
              percent -= 20
              width += 25
              widthPercent = width + '%'
              transform()
            }
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

        // IPAD ET MOBILE
        if (isDesktop == false) {
          gsap.to('#arrow-video-left', { attr: { stroke: '#201f1f' } })
          Observer.create({
            target: '.photos-container',
            type: 'touch',
            tolerance: 60,
            onRight: () => goLeft(),
            onLeft: () => goRight(),
          })
        }
      }
    )
  }
  gsap.delayedCall(0.2, galerieFunction)
}

export default galerieEnter
