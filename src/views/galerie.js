import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, Observer)

const galerie = () => {
  function galerieFunction() {
    const container = document.querySelector('.photos-container')
    const photo = document.querySelector('.photo')
    const arrows = gsap.utils.toArray('.arrow-galerie')
    const photosBox = gsap.utils.toArray('.photo-box')
    const photosItem = gsap.utils.toArray('.photos-item')
    let percent = 0
    let width = 25
    let widthPercent = width + '%'
    let active = 1

    let largBox = photo.offsetWidth
    function boxSize() {
      photosBox.forEach((box) => {
        if (photosBox.indexOf(box) == active) {
          gsap.set(box, { height: 'auto' })
        } else {
          gsap.set(box, { height: largBox })
        }
      })
    }
    function ajustSize() {
      gsap.set(container, { height: 'auto' })
      let height = container.offsetHeight
      gsap.set(container, { height: height })
    }
    boxSize()
    gsap.delayedCall(0.6, ajustSize)

    window.addEventListener('resize', () => {
      largBox = photo.offsetWidth
      boxSize()
      ajustSize()
    })

    function transform() {
      gsap.to('.photos-wrapper', {
        xPercent: percent,
        duration: 0.6,
        ease: 'none',
      })
      gsap.to('.loading-line', {
        width: widthPercent,
        duration: 0.6,
        ease: 'none',
      })
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
    transform()

    function goLeft() {
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
    function goRight() {
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

    arrows[0].addEventListener('click', () => goLeft())
    arrows[1].addEventListener('click', () => goRight())
    window.addEventListener('keydown', (e) => {
      if (e.key == 'ArrowLeft') {
        goLeft()
      } else if (e.key == 'ArrowRight') {
        goRight()
      }
    })
  }
  gsap.delayedCall(1, galerieFunction)
}

export default galerie
