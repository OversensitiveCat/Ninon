import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { touchDevice } from '../../utilities/utilities'
import { lenis } from '../lenis'
import contactTimeline from './contactTimeline'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

let key

const contact = (data) => {
  // DOM
  const buttonHeader = document.querySelector('.nav-item-contact')
  const buttonFooter = document.querySelector('.nav-item-footer-contact')
  const buttonMobile = document.querySelector('.nav-mobile-contact')
  const closeButton = document.querySelector('.close-button')
  const lineOne = document.querySelector('.line-close1')
  const lineTwo = document.querySelector('.line-close2')

  let open
  let close
  let eventHeader
  let scroll

  let tl = contactTimeline()
  // Functions
  if (data.next.namespace !== 'home') {
    open = () => {
      if (tl.progress() === 0 && !tl.isActive()) {
        lenis.stop()
        return tl.play()
      }
    }

    eventHeader = () => {
      if (tl.progress() === 0 && !tl.isActive()) {
        lenis.stop()
        return tl.play()
      } else if (tl.progress() === 1 && !tl.isActive()) {
        return tl.reverse().then(() => lenis.start())
      }
    }
  } else {
    // Functions home
    let hero = false
    if (data.next.namespace == 'home') {
      hero = true
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

    scroll = (tl) => {
      gsap.to(window, {
        scrollTo: '.section-about',
        duration: 0.8,
        ease: 'sine.inOut',
        onComplete: () => tl.play(),
      })
    }

    open = () => {
      if (tl.progress() === 0 && !tl.isActive()) {
        lenis.stop()
        return hero ? scroll(tl) : tl.play()
      }
    }

    eventHeader = () => {
      if (tl.progress() === 0 && !tl.isActive()) {
        lenis.stop()
        return hero ? scroll(tl) : tl.play()
      } else if (tl.progress() === 1 && !tl.isActive()) {
        return tl.reverse().then(() => lenis.start())
      }
    }
  }

  close = () => {
    if (tl.progress() === 1 && !tl.isActive()) {
      return tl.reverse().then(() => lenis.start())
    }
  }

  // Toogle mobile
  function contactMobile() {
    if (tl.progress() === 0 && !tl.isActive()) {
      return tl.play()
    }
  }

  // Events
  buttonHeader.addEventListener('click', eventHeader)
  buttonFooter.addEventListener('click', open)
  buttonMobile.addEventListener('click', contactMobile)

  // Close button
  closeButton.addEventListener('click', close)

  if (!touchDevice()) {
    closeButton.addEventListener('mouseenter', () => {
      gsap.to(lineOne, { rotate: -45 })
      gsap.to(lineTwo, { rotate: 45 })
    })
    closeButton.addEventListener('mouseleave', () => {
      gsap.to(lineOne, { rotate: 45 })
      gsap.to(lineTwo, { rotate: -45 })
    })
  }

  // Escape
  key = (e) => {
    if (e.key == 'Escape') {
      close()
    }
  }
  window.addEventListener('keydown', key)
}

const contactClear = () => {
  window.removeEventListener('keydown', key)
}

export { contact, contactClear }
