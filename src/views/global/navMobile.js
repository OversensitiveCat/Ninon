import barba from '@barba/core'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const navMobile = (data) => {
  let mm = gsap.matchMedia()
  mm.add('(max-width: 991px)', () => {
    const items = gsap.utils.toArray('.nav-item-mobile')
    let tl = gsap.timeline({ paused: true })
    tl.to('.nav-mobile-container', {
      width: '100%',
      height: '100%',
      duration: 0,
    })
      .to('.nav-mobile-container', {
        backgroundColor: '#141313',
        duration: 0.4,
      })
      .to('.ham-line1', { duration: 0.4, top: 39, rotate: 45 }, '<')
      .to('.ham-line2', { duration: 0.4, top: 39, rotate: -45 }, '<')
      .fromTo(
        items,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.5,
          stagger: 0.2,
          yPercent: 60,
        },
        '-=0.4'
      )

    document.querySelector('.hamburger').addEventListener('click', () => {
      if (tl.progress() == 0) {
        tl.play()
        document.querySelector('.body').style.overflowY = 'hidden'
      } else if (tl.progress() == 1) {
        tl.reverse()
        document.querySelector('.body').style.overflowY = 'scroll'
      }
    })

    if (data.next.namespace == 'home') {
      console.log('we are at home')
      items[0].addEventListener('click', () => {
        gsap.to(window, { duration: 0, scrollTo: '.section-about' })
        tl.reverse()
        document.querySelector('.body').style.overflow = 'scroll'
      })
      items[1].addEventListener('click', () => {
        gsap.to(window, { duration: 0, scrollTo: '.section-projets-mob' })
        tl.reverse()
        document.querySelector('.body').style.overflow = 'scroll'
      })
      // items[2].addEventListener('click', () => {
      //   barba.go('./calendrier')
      // gsap.delayedCall(0.7, () => {
      //   tl.progress(0)
      //   tl.pause()
      // })
      // document.querySelector('.body').style.overflow = 'scroll'
      // })
      items[3].addEventListener('click', () => {
        gsap.to(window, { duration: 0, scrollTo: '.section-ecouter' })
        tl.reverse()
        document.querySelector('.body').style.overflow = 'scroll'
      })
      items[4].addEventListener('click', () => {
        barba.go('./archives')
        gsap.delayedCall(2, () => {
          tl.progress(0)
          tl.pause()
        })
        document.querySelector('.body').style.overflow = 'scroll'
      })
      // items[5].addEventListener('click', () => {
      //   gsap.to(window, { duration: 0, scrollTo: { y: 'max' } })
      //   tl.reverse()
      //   document.querySelector('.body').style.overflow = 'scroll'
      // })
    } else {
      console.log('we are not at home')

      items[0].addEventListener('click', () => {
        barba.go('.')
        gsap.delayedCall(2, () => {
          tl.progress(0)
          tl.pause()
        })
        gsap.delayedCall(3.5, () => {
          gsap.to(window, { duration: 1, scrollTo: '.section-about' })
        })
        document.querySelector('.body').style.overflow = 'scroll'
      })
      items[1].addEventListener('click', () => {
        barba.go('.')
        gsap.delayedCall(2, () => {
          tl.progress(0)
          tl.pause()
        })
        gsap.delayedCall(3.5, () => {
          gsap.to(window, { duration: 1.25, scrollTo: '.section-projets-mob' })
        })
        document.querySelector('.body').style.overflow = 'scroll'
      })
      // items[2].addEventListener('click', () => {
      //   barba.go('./calendrier')
      // gsap.delayedCall(2, () => {
      //   tl.progress(0)
      //   tl.pause()
      // })
      // document.querySelector('.body').style.overflow = 'scroll'
      // })
      items[3].addEventListener('click', () => {
        barba.go('.')
        gsap.delayedCall(2, () => {
          tl.progress(0)
          tl.pause()
        })
        gsap.delayedCall(3.5, () => {
          gsap.to(window, { duration: 1.5, scrollTo: '.section-ecouter' })
        })
        document.querySelector('.body').style.overflow = 'scroll'
      })
      items[4].addEventListener('click', () => {
        barba.go('./archives')
        gsap.delayedCall(2, () => {
          tl.progress(0)
          tl.pause()
        })
        document.querySelector('.body').style.overflow = 'scroll'
      })
      // items[5].addEventListener('click', () => {
      //   gsap.to(window, { duration: 0, scrollTo: { y: 'max' } })
      //   tl.reverse()
      //   document.querySelector('.body').style.overflow = 'scroll'
      // })
    }
  })
}

export default navMobile
