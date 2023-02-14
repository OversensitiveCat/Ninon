import { gsap } from 'gsap'

import toogleNav from '../views/nav_mobile/toogleNav'

const homeEnter = () => {
  gsap.set('.accueil > *', { autoAlpha: 1 })
  const letters = gsap.utils.toArray('.accueil .cls-1, .accueil .cls-3')

  let tl = gsap.timeline({
    onComplete: () => {
      let hamburger = document.querySelector('.hamburger')
      hamburger.addEventListener('click', toogleNav)
      console.log('add click ham enter')
    },
  })
  tl.from(
    letters,
    {
      autoAlpha: 0,
      duration: 0.2,
      stagger: { amount: 1.2 },
      scale: 0.2,
      yPercent: -20,
    },
    '+=0.7'
  )
    .from(
      '.image-accueil',
      { autoAlpha: 0, yPercent: 70, duration: 1.6, scale: 0.9 },
      '+=0.2'
    )
    .from(
      '.accueil-subheading',
      {
        duration: 1,
        stagger: 0.4,
        rotateX: 50,
        autoAlpha: 0,
        yPercent: 30,
      },
      '-=1'
    )
}

export default homeEnter
