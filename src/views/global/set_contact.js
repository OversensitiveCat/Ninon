import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollToPlugin)

const setContact = () => {
  let letters = new SplitType('.contact-heading', {
    types: 'chars',
    tagName: 'span',
  })
  let copyright = new SplitType('.copyright', {
    types: 'chars',
    tagName: 'span',
  })
  let tlContact = gsap.timeline({ paused: true })
  tlContact
    .to('.section-contact', {
      zIndex: 6,
      duration: 0,
    })
    .to(
      '.contact-card-container, .nav-bar-fixed',
      { backgroundColor: '#141313', duration: 0.4, ease: 'none' },
      '<'
    )
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
      '-=0.3'
    )
    .from(
      '.contact-item',
      {
        autoAlpha: 0,
        yPercent: 50,
        duration: 0.6,
      },
      '-=0.4'
    )
    .from(
      '.agence-grid > .link-out, .credits-grid > .contact-subheading',
      {
        autoAlpha: 0,
        yPercent: -60,
        duration: 0.4,
      },
      '-=0.2'
    )
    .from(
      '.agent1 > *',
      {
        autoAlpha: 0,
        yPercent: 40,
        duration: 0.4,
        stagger: { amount: 0.5 },
      },
      '-=0.2'
    )
    .from(
      '.agent2 > *',
      {
        autoAlpha: 0,
        yPercent: 40,
        duration: 0.4,
        stagger: { amount: 0.5 },
      },
      '<'
    )
    .from(
      '.credits > *',
      {
        autoAlpha: 0,
        yPercent: 40,
        duration: 0.4,
        stagger: { amount: 0.5 },
      },
      '<'
    )
    .from(
      copyright.chars,
      {
        autoAlpha: 0,
        stagger: { amount: 0.6 },
        duration: 0.2,
      },
      '-=0.4'
    )

  let hoverButton = gsap.timeline({ paused: true })
  hoverButton.to('.close-button', {
    rotate: 90,
    duration: 0.3,
    transformOrigin: 'center',
    scale: 1.1,
  })

  function set() {
    let mm = gsap.matchMedia()
    mm.add('(min-width: 992px)', () => {
      console.log('contact is set')
      let contactButton = document.querySelector('.nav-item-contact')
      let closeButton = document.querySelector('.close-button')
      contactButton.addEventListener('click', () => {
        tlContact.timeScale(1).play()
      })
      closeButton.addEventListener('click', () => {
        tlContact.timeScale(1.8).reverse()
      })
      closeButton.addEventListener('mouseenter', () => {
        hoverButton.play()
      })
      closeButton.addEventListener('mouseleave', () => {
        hoverButton.reverse()
      })
    })
    mm.add('(max-width: 991px)', () => {
      console.log('contact mobile is set')

      let contactButtonMobile = document.querySelector(
        '.nav-item-contact-mobile'
      )
      let closeButton = document.querySelector('.close-button')
      contactButtonMobile.addEventListener('click', () => {
        tlContact.play()
      })
      closeButton.addEventListener('click', () => {
        tlContact.reverse()
      })
      closeButton.addEventListener('mouseenter', () => {
        hoverButton.play()
      })
      closeButton.addEventListener('mouseleave', () => {
        hoverButton.reverse()
      })
    })
    const links = gsap.utils.toArray('.agent-container > .grey-link')
    links.forEach((link) => {
      let tl = gsap.timeline({ paused: true })
      tl.to(link, { color: '#a80000', duration: 0.1, ease: 'none' })
      link.addEventListener('mouseenter', () => tl.play())
      link.addEventListener('mouseleave', () => tl.reverse())
    })
  }
  return gsap.delayedCall(1, set)
}

export default setContact
