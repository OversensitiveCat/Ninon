import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const leaveTransition = (data, done) => {
  const shape1 =
    'M 469.539 263.9868 q -235.539 0 -469.539 0 L 0 104 c 226 -93 314 -26 469.539 0 V 263.9868 z z'
  const shape2 =
    'M 469.539 263.9868 q -234.7695 0 -469.539 0 L 0 0 c 226.1111 0 182.8873 -0.4145 469.539 0 V 263.9868 z z'

  let leave = gsap.timeline({
    onComplete: () => {
      done()
      gsap.to(window, { scrollTo: 0, duration: 0 })
      data.current.container.remove()
    },
  })
  leave
    .to('.path-container', { zIndex: 20 })
    .to('#path', {
      attr: { d: shape1 },
      ease: 'Power2.easeIn',
      duration: 0.7,
    })
    .to('#path', {
      attr: { d: shape2 },
      ease: 'Power2.easeOut',
      duration: 0.8,
    })

  return leave
}

export default leaveTransition
