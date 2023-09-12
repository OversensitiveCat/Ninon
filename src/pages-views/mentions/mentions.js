import { gsap } from 'gsap'

const mentions = () => {
  // Mentions
  const items = gsap.utils.toArray('.mention-item')

  const heights = items
    .map((item) => {
      return gsap.getProperty(item, 'height')
    })
    .sort((a, b) => a - b)
  let min = heights.shift()
  let max = heights.pop()
  let snap = gsap.utils.snap(0.05)
  let map = gsap.utils.mapRange(min, max, 0.4, 0.7)

  items.forEach((item) => {
    let height = gsap.getProperty(item, 'height')
    let t = snap(map(height))
    let head = item.querySelector('.mention-head')
    let arrow = item.querySelector('.mention-arrow')
    let para = item.querySelectorAll('.mention-content')
    gsap.set(item, { height: head.offsetHeight })
    gsap.set(arrow, { rotate: 180 })

    let tl = gsap.timeline({ paused: true })
    tl.to(arrow, { rotate: 0, duration: t, ease: 'power1.inOut' })
      .to(item, { height: 'auto', duration: t, ease: 'power1.inOut' }, 0)
      .from(
        para,
        { yPercent: 25, opacity: 0, duration: t, ease: 'power1.inOut' },
        0
      )

    function toogle() {
      if (tl.progress() === 0) {
        tl.play()
      } else if (tl.progress() === 1) {
        tl.reverse()
      }
    }
    head.addEventListener('click', toogle)
  })
}

export default mentions
