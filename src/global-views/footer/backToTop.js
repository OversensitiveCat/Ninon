import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import { touchDevice } from '../../utilities/utilities'

gsap.registerPlugin(ScrollToPlugin)

const backToTop = () => {
  const svg = document.querySelector('.arrow-back-to-top')
  const arrow = svg.querySelector('path')
  const circle = svg.querySelector('circle')
  let d =
    Math.round(
      (document.querySelector('.body').scrollHeight /
        window.innerHeight /
        3.5) *
        10
    ) / 10

  svg.addEventListener('click', () =>
    gsap.to(window, { scrollTo: 0, duration: d, ease: 'power2.inOut' })
  )

  if (!touchDevice()) {
    let tl = gsap.timeline({ paused: true })
    tl.to(arrow, { stroke: '#b40000', ease: 'none', duration: 0.2 })
      .to(circle, { stroke: '#b40000', ease: 'none', duration: 0.2 }, '<')
      .to(svg, { yPercent: -10, ease: 'none', duration: 0.3 }, '<')

    svg.addEventListener('mouseenter', () => tl.play())
    svg.addEventListener('mouseleave', () => tl.reverse())
  }
}

export default backToTop
