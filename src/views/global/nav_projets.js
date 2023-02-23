import { gsap } from 'gsap'

const navProjets = () => {
  function set() {
    let mm = gsap.matchMedia()
    mm.add('(min-width: 992px)', () => {
      const button = document.querySelector('.nav-projets')
      const items = gsap.utils.toArray('.nav-link-projet')
      gsap.set(button, { height: '2.5rem' })
      gsap.set(items, { autoAlpha: 0 })
      gsap.set(items[3], { paddingBottom: '1rem' })
      let tl = gsap.timeline({ paused: true })

      tl.to(button, {
        height: 'auto',
        duration: 0.6,
      }).to(
        items,
        {
          autoAlpha: 1,
          stagger: 0.2,
          duration: 0.3,
          yPercent: 25,
        },
        '<'
      )
      button.addEventListener('mouseenter', () => {
        tl.play()
      })
      button.addEventListener('mouseleave', () => {
        tl.reverse()
      })
    })
  }
  return gsap.delayedCall(1, set)
}

export default navProjets
