import { gsap } from 'gsap'
import SplitType from 'split-type'

const contactTimeline = () => {
  let tl = gsap.timeline({ paused: true })

  let letters = new SplitType('.contact-heading', {
    types: 'chars',
    tagName: 'span',
  })

  tl.set('.section-contact', { zIndex: 100 })
    .to('.section-contact, .nav-bar-container, .nav-item-projets', {
      backgroundColor: '#141313',
      duration: 0.4,
      ease: 'none',
    })
    .from(
      '.contact-card',
      {
        yPercent: 100,
        duration: 0.8,
      },
      '<'
    )
    .from(
      letters.chars,
      {
        autoAlpha: 0,
        scale: 0.2,
        yPercent: -40,
        duration: 0.2,
        stagger: { amount: 0.5 },
      },
      '>-=0.5'
    )
    .from('.close-button', { opacity: 0 }, '<')
    .from(
      '.contact-item',
      {
        autoAlpha: 0,
        yPercent: 50,
        duration: 0.6,
      },
      '<'
    )
    .from(
      '.agence-grid > .link-out, .credits-grid > .contact-subheading',
      {
        autoAlpha: 0,
        yPercent: -60,
        duration: 0.4,
      },
      '>-=0.4'
    )
    .from(
      '#agent1 > *',
      {
        autoAlpha: 0,
        yPercent: 40,
        duration: 0.4,
        stagger: { amount: 0.5 },
      },
      '<'
    )
    .from(
      '#agent2 > *',
      {
        autoAlpha: 0,
        yPercent: 40,
        duration: 0.4,
        stagger: { amount: 0.5 },
      },
      '<'
    )
    .to('.line-close1', { rotate: 45 }, '<')
    .to('.line-close2', { rotate: -45 }, '<')

  return tl
}

export default contactTimeline
