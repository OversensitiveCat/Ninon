const debounce = (func, delay) => {
  let timeoutId
  return function () {
    const context = this
    const args = arguments
    clearTimeout(timeoutId)
    timeoutId = setTimeout(function () {
      func.apply(context, args)
    }, delay)
  }
}

const touchDevice = () => {
  if (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  ) {
    return true
  } else return false
}

const resizeX = (func, delay) => {
  if (!delay) {
    delay = 0
  }
  let timeoutId
  let previousWidth = window.innerWidth

  const onResize = () => {
    const currentWidth = window.innerWidth
    if (previousWidth !== currentWidth) {
      previousWidth = currentWidth
      func()
    }
  }

  return () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => onResize(), delay)
  }
}

const isDesktop = () => {
  return window.innerWidth > 991
}

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

const refreshMedia = (func) => {
  let previous = breakpoints.find(findCurrent),
    current

  function resize() {
    current = breakpoints.find(findCurrent)
    if (current !== previous) {
      previous = current
      return func()
    } else return
  }

  let debounceResize = debounce(resize, 50)
  window.addEventListener('resize', debounceResize)
}

export { debounce, touchDevice, resizeX, isDesktop, refreshMedia }
