import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'

gsap.registerPlugin(Observer)

const homeProjectsMobile = () => {
  const circles = gsap.utils.toArray('.circles-container-mob .circle')
  const container = gsap.utils.toArray('.projets-mob-container')
  let per = 0,
    current = 0,
    active = false

  gsap.to(circles[current], { backgroundColor: '#b40000' })

  const translateProject = () => {
    active = true
    gsap.to(container, { xPercent: per })
    gsap.to(circles[current], {
      backgroundColor: '#b40000',
      duration: 0.3,
      ease: 'none',
      onComplete: () => {
        active = false
      },
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
    target: '.projets-mob-container',
    type: 'touch',
    tolerance: 20,
    onRight: () => {
      if (per == 0 || active) {
        return
      } else {
        per += 100
        current -= 1
        translateProject()
      }
    },
    onLeft: () => {
      if (per == -200 || active) {
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
      if (active) return
      let index = circles.indexOf(circle)
      current = index
      per = index * -100
      translateProject()
    })
  })
}

export default homeProjectsMobile
