import barba from '@barba/core'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

import { debounce } from '../../utilities/utilities'

let handleResize

const homeProjectsDesktop = () => {
  // Slide
  const section = document.querySelector('.section-projets')
  const vids = gsap.utils.toArray('.project-vid')
  const wrappers = gsap.utils.toArray('.headings-wrapper, .numbers-wrapper')

  gsap.from(vids[0], {
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '25% top',
      scrub: true,
    },
    scale: 0,
  })
  gsap.from(vids[1], {
    scrollTrigger: {
      trigger: section,
      start: '25% top',
      end: '50% top',
      scrub: true,
    },
    scale: 0,
  })
  gsap.from(vids[2], {
    scrollTrigger: {
      trigger: section,
      start: '50% top',
      end: '75% top',
      scrub: true,
    },
    scale: 0,
  })

  // Nav circles
  let sectionHeight, distance, projetUn, projetDeux, projetTrois
  function getPosition() {
    sectionHeight = section.clientHeight
    distance = section.getBoundingClientRect().top + window.scrollY
    projetUn = distance + (sectionHeight / 100) * 25
    projetDeux = distance + (sectionHeight / 100) * 50
    projetTrois = distance + (sectionHeight / 100) * 75
  }
  getPosition()
  handleResize = debounce(getPosition, 400)

  window.addEventListener('resize', handleResize)

  function scroll(position) {
    return gsap.to(window, {
      scrollTo: position,
      duration: 1,
      ease: 'power1.inOut',
    })
  }

  const circles = gsap.utils.toArray('.circles-container > .circle')
  circles[0].addEventListener('click', () => scroll(projetUn))
  circles[1].addEventListener('click', () => scroll(projetDeux))
  circles[2].addEventListener('click', () => scroll(projetTrois))

  gsap.to(circles[0], { backgroundColor: '#b40000' })
  function transformCircle(a, b) {
    gsap.to(circles[a], {
      backgroundColor: '#141313',
      duration: 0.3,
      ease: 'none',
    })
    gsap.to(circles[b], {
      backgroundColor: '#b40000',
      duration: 0.3,
      ease: 'none',
    })
  }

  // Other slides and link events
  function linkOne() {
    barba.go('./solo')
  }
  function linkTwo() {
    barba.go('./royaumont')
  }
  function linkThree() {
    barba.go('./musique-de-chambre')
  }
  const button = document.querySelector('.discover-button')
  button.addEventListener('click', linkOne)

  gsap.to(wrappers, {
    scrollTrigger: {
      trigger: section,
      start: '27.5% top',
      end: '33.5% top',
      scrub: true,
      onEnter: () => {
        button.removeEventListener('click', linkOne)
        button.addEventListener('click', linkTwo)
        transformCircle(0, 1)
      },
      onEnterBack: () => {
        button.removeEventListener('click', linkTwo)
        button.addEventListener('click', linkOne)
        transformCircle(1, 0)
      },
    },
    yPercent: -33.5,
  })
  gsap.fromTo(
    wrappers,
    { yPercent: -33.5 },
    {
      scrollTrigger: {
        trigger: section,
        start: '61% top',
        end: '67% top',
        scrub: true,
        onEnter: () => {
          button.removeEventListener('click', linkTwo)
          button.addEventListener('click', linkThree)
          transformCircle(1, 2)
        },
        onEnterBack: () => {
          button.removeEventListener('click', linkThree)
          button.addEventListener('click', linkTwo)
          transformCircle(2, 1)
        },
      },
      yPercent: -67,
    }
  )
  gsap.set(wrappers, { yPercent: 0 })
}

const homeProjectsDesktopClear = () => {
  window.removeEventListener('resize', handleResize)
}

export { homeProjectsDesktop, homeProjectsDesktopClear }
