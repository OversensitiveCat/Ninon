import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollToPlugin)

const setContact = () => {
  let agents = gsap.utils.toArray('.agent-container')
  let agentUn = agents[0].querySelectorAll('*')
  let agentDeux = agents[1].querySelectorAll('*')
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
      zIndex: 5,
      duration: 0,
    })
    .to(
      '.contact-card-container',
      { backgroundColor: '#141313', duration: 0.4 },
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
    .from(agentUn, {
      autoAlpha: 0,
      yPercent: 40,
      duration: 0.4,
      stagger: { amount: 0.5 },
    })
    .from(
      agentDeux,
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
    console.log('contact is set')
    let contactButton = document.querySelector('.nav-item-contact')
    let closeButton = document.querySelector('.close-button')
    contactButton.addEventListener('click', () => {
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
  }
  return gsap.delayedCall(1, set)
}

export default setContact
