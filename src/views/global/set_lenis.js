import lenis from './lenis'

const setLenis = () => {
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
}

export default setLenis
