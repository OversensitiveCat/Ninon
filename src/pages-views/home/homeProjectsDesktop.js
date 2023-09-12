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
      end: '20% top',
      scrub: true,
    },
    scale: 0,
  })
  gsap.from(vids[1], {
    scrollTrigger: {
      trigger: section,
      start: '20% top',
      end: '40% top',
      scrub: true,
    },
    scale: 0,
  })
  gsap.from(vids[2], {
    scrollTrigger: {
      trigger: section,
      start: '40% top',
      end: '60% top',
      scrub: true,
    },
    scale: 0,
  })
  gsap.from(vids[3], {
    scrollTrigger: {
      trigger: section,
      start: '60% top',
      end: '80% top',
      scrub: true,
    },
    scale: 0,
  })

  // Nav circles
  let sectionHeight, distance, projetUn, projetDeux, projetTrois, projetQuatre
  function getPosition() {
    sectionHeight = section.clientHeight
    distance = section.getBoundingClientRect().top + window.scrollY
    projetUn = distance + (sectionHeight / 100) * 20
    projetDeux = distance + (sectionHeight / 100) * 40
    projetTrois = distance + (sectionHeight / 100) * 60
    projetQuatre = distance + (sectionHeight / 100) * 80
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
  circles[3].addEventListener('click', () => scroll(projetQuatre))

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
    barba.go('./durand')
  }
  function linkFour() {
    barba.go('./musique-de-chambre')
  }
  const button = document.querySelector('.discover-button')
  button.addEventListener('click', linkOne)

  gsap.to(wrappers, {
    scrollTrigger: {
      trigger: section,
      start: '24% top',
      end: '30% top',
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
    yPercent: -25,
  })
  gsap.fromTo(
    wrappers,
    { yPercent: -25 },
    {
      scrollTrigger: {
        trigger: section,
        start: '44% top',
        end: '50% top',
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
      yPercent: -50,
    }
  )
  gsap.fromTo(
    wrappers,
    { yPercent: -50 },
    {
      scrollTrigger: {
        trigger: section,
        start: '64% top',
        end: '70% top',
        scrub: true,
        onEnter: () => {
          button.removeEventListener('click', linkThree)
          button.addEventListener('click', linkFour)
          transformCircle(2, 3)
        },
        onEnterBack: () => {
          button.removeEventListener('click', linkFour)
          button.addEventListener('click', linkThree)
          transformCircle(3, 2)
        },
      },
      yPercent: -75,
    }
  )
  gsap.set(wrappers, { yPercent: 0 })
}

const homeProjectsDesktopClear = () => {
  window.removeEventListener('resize', handleResize)
}

export { homeProjectsDesktop, homeProjectsDesktopClear }
