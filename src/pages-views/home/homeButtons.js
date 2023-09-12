import { gsap } from 'gsap'

import { touchDevice } from '../../utilities/utilities'

const homeButtons = () => {
  // Buttons
  const buttons = gsap.utils.toArray('.button-dates, .button-ecouter')
  const listen = document.querySelector('.section-ecouter')

  buttons[1].addEventListener('click', () => {
    gsap.to(window, {
      scrollTo: listen,
      duration: 2,
      ease: 'power1.inOut',
    })
  })

  if (!touchDevice()) {
    buttons[0].addEventListener('mouseenter', () => {
      gsap.to(buttons[0], { scale: 1.05, duration: 0.25, rotate: -20 })
    })
    buttons[0].addEventListener('mouseleave', () => {
      gsap.to(buttons[0], { scale: 1, duration: 0.25, rotate: 0 })
    })
    buttons[1].addEventListener('mouseenter', () => {
      gsap.to(buttons[1], { scale: 1.05, duration: 0.25, rotate: 20 })
    })
    buttons[1].addEventListener('mouseleave', () => {
      gsap.to(buttons[1], { scale: 1, duration: 0.25, rotate: 0 })
    })
  }
}

export default homeButtons
