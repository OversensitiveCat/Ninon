import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, Observer)

const galerie = () => {
  function galerieFunction() {
    const container = document.querySelector('.photos-container'),
      photo = document.querySelector('.photo'),
      arrows = gsap.utils.toArray('.arrow-galerie'),
      photosBox = gsap.utils.toArray('.photo-box'),
      photosItem = gsap.utils.toArray('.photos-item')
    let percent = 0,
      width = 34,
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
            ease: 'power1.out',
          })
          if (isMobile === false) {
            gsap.to('.loading-line-galerie', {
              width: widthPercent,
              duration: isDesktop ? 0.6 : 0.4,
              ease: 'power1.inOut',
            })
          }
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
              width -= 34
              active -= 1
              widthPercent = width + '%'
              transform()
            }
          }
          if (isTablet && isMobile == false) {
            if (percent == 0) {
              gsap.to('#arrow-video-left', {
                attr: { stroke: '#201f1f' },
                duration: 0.25,
              })
            }
            if (percent == -50) {
              gsap.to('#arrow-video-right', {
                attr: { stroke: '#a80000' },
                duration: 0.25,
              })
            }
            if (percent == 0) {
              return
            } else {
              percent += 25
              width -= 34
              widthPercent = width + '%'
              transform()
            }
          }
          if (isMobile) {
            if (percent == -25) {
              gsap.to('#arrow-video-left', { attr: { stroke: '#201f1f' } })
            }
            if (percent == -75) {
              gsap.to('#arrow-video-right', { attr: { stroke: '#a80000' } })
            }
            if (percent == 0) {
              return
            } else {
              percent += 25
              transform()
            }
          }
          console.log(percent, width)
        }
        function goRight() {
          if (isDesktop) {
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
              width += 34
              active += 1
              widthPercent = width + '%'
              transform()
            }
          }
          if (isTablet && isMobile == false) {
            if (percent == -25) {
              gsap.to('#arrow-video-right', { attr: { stroke: '#201f1f' } })
            }
            if (percent == 0) {
              gsap.to('#arrow-video-left', { attr: { stroke: '#a80000' } })
            }
            if (percent == -50) {
              return
            } else {
              percent -= 25
              width += 34
              widthPercent = width + '%'
              transform()
            }
          }
          if (isMobile) {
            if (percent == -50) {
              gsap.to('#arrow-video-right', { attr: { stroke: '#201f1f' } })
            }
            if (percent == 0) {
              gsap.to('#arrow-video-left', { attr: { stroke: '#a80000' } })
            }
            if (percent == -75) {
              return
            } else {
              percent -= 25
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

        // TABLETTE ET MOBILE
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
  gsap.delayedCall(1, galerieFunction)
}

export default galerie
