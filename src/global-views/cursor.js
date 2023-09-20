import gsap from 'gsap'

import { touchDevice } from '../utilities/utilities'

const cursor = () => {
  if (touchDevice()) return
  gsap.set('.cursor', { display: 'block', xPercent: -50, yPercent: -50 })
  let xTo = gsap.quickTo('.cursor', 'x', { duration: 0.4, ease: 'power3' }),
    yTo = gsap.quickTo('.cursor', 'y', { duration: 0.4, ease: 'power3' })

  window.addEventListener('mousemove', (e) => {
    xTo(e.clientX)
    yTo(e.clientY)
  })
}

export default cursor
