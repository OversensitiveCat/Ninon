import Lenis from '@studio-freight/lenis'

// eslint-disable-next-line prettier/prettier
'use strict'

const lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 0.5,
})

const setLenis = () => {
  'use strict'
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}

export { lenis, setLenis }
