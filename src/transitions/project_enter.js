import { gsap } from 'gsap'

const projectEnter = () => {
  gsap.set('#hero-section > *', { autoAlpha: 1 })
  const letters = gsap.utils.toArray('.heading1-project .char')
  let tl = gsap.timeline()
  tl.from(letters, {
    autoAlpha: 0,
    scale: 0.2,
    yPercent: -20,
    duration: 0.2,
    stagger: { amount: 0.8 },
  })
    .from(
      '.project-number-hero',
      {
        autoAlpha: 0,
        yPercent: -100,
        duration: 0.8,
      },
      '-=0.6'
    )
    .from('.nav-item', {
      autoAlpha: 0,
      yPercent: 100,
      duration: 0.4,
      stagger: { amount: 1 },
    })
    .from(
      '.nav-heading .char',
      {
        autoAlpha: 0,
        scale: 0.2,
        yPercent: -20,
        duration: 0.2,
        stagger: { amount: 0.5 },
      },
      '<'
    )
}

export default projectEnter
