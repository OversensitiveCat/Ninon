import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

import lenis from './lenis'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const setContact = (data) => {
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
    .to(
      '.section-contact',
      {
        zIndex: 9,
        duration: 0,
      },
      '<'
    )
    .to(
      '.contact-card-container, .nav-bar-fixed, .nav-projets',
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

  let hero = true
  if (data.next.namespace == 'home') {
    ScrollTrigger.create({
      trigger: '.section-hero',
      start: 'bottom top',
      onEnter: () => {
        hero = false
      },
      onLeaveBack: () => {
        hero = true
      },
    })
  }

  function set() {
    const itemsFooter = gsap.utils.toArray('.nav-item-footer')
    let closeButton = document.querySelector('.close-button')
    let mm = gsap.matchMedia()
    mm.add('(min-width: 992px)', () => {
      let buttons = [
        itemsFooter[5],
        document.querySelector('.nav-item-contact'),
      ]
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          if (data.next.namespace == 'home' && hero == true) {
            gsap.to(window, {
              scrollTo: '.section-about',
              duration: 1.2,
              ease: 'sine.inOut',
            })
            gsap.delayedCall(1.3, () => {
              lenis.stop()
              tlContact.timeScale(1).play()
            })
          } else {
            lenis.stop()
            tlContact.timeScale(1).play()
          }
        })
      })
      closeButton.addEventListener('click', () => {
        lenis.start()
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
      let colorNav = gsap.timeline({ paused: true })
      colorNav.to('.nav-mobile-container', {
        backgroundColor: '#141313',
        duration: 0.4,
        ease: 'none',
      })
      let buttons = [
        itemsFooter[5],
        document.querySelector('.nav-text-contact-mobile'),
      ]
      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          lenis.stop()
          tlContact.timeScale(1).play()
          colorNav.timeScale(1).play()
        })
      })
      closeButton.addEventListener('click', () => {
        lenis.start()
        tlContact.timeScale(1.8).reverse()
        colorNav.timeScale(0.6).reverse()
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
