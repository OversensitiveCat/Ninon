import gsap from 'gsap'

import { isDesktop } from '../utilities/utilities'

const onceMob = (data) => {
  let d

  if (data.next.namespace === 'home') {
    d = 1.7
  } else {
    d = 0.2
  }

  if (!isDesktop()) {
    const lines = gsap.utils.toArray('.ham-line')

    if (data.next.namespace === 'agenda') {
      gsap.set(lines, { backgroundColor: '#b40000' })
    }

    gsap.from(lines[0], { xPercent: -150, delay: d })
    gsap.from(lines[1], { xPercent: 150, delay: d })

    gsap.set('[data-anim="ham"', { opacity: 1 })
  }
}

export default onceMob
