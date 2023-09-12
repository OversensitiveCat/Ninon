import { debounce } from './utilities'

/* eslint-disable no-unused-vars */
const breakpoints = [
  { media: 'none', d: [0, 299] },
  { media: 'mobileOne', d: [300, 479] },
  { media: 'mobileTwo', d: [480, 767] },
  { media: 'tablet', d: [768, 991] },
  { media: 'desktop', d: [992, 1279] },
  { media: 'desktopOne', d: [1280, 1439] },
  { media: 'desktopTwo', d: [1280, 1439] },
  { media: 'desktopThree', d: [1440, 1919] },
  { media: 'desktopFour', d: [1920, Infinity] },
]

function findCurrent(el) {
  return window.innerWidth > el.d[0] && window.innerWidth < el.d[1]
}

const printMedia = () => {
  let previous = breakpoints.find(findCurrent),
    current = previous

  function print() {
    return console.log(`${current.media}: ${current.d[0]} – ${current.d[1]}`)
  }
  print()

  function resize() {
    current = breakpoints.find(findCurrent)
    if (current !== previous) {
      previous = current
      return print()
    } else return
  }

  let debounceResize = debounce(resize, 50)
  window.addEventListener('resize', debounceResize)
}

export { printMedia }
