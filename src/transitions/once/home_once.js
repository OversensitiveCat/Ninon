import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const homeOnce = () => {
  const letters = gsap.utils.toArray(
    '.section-hero-home .cls-1, .section-hero-home .cls-3'
  )
  let tlHero = gsap.timeline()
  tlHero
    .to('.hide', { autoAlpha: 0, duration: 0.4 })
    .from(letters, {
      autoAlpha: 0,
      duration: 0.2,
      stagger: { amount: 1.2 },
      scale: 0.2,
      yPercent: -20,
    })
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

export default homeOnce
