import { gsap } from 'gsap'

const quickTransition = () => {
  const shape0 =
    'M469.539032,263.986786q -234.7695 0 -469.539 0L0,263.557617c66.11113,0.429169,351.088104,0.429169,469.539032,0.208344V263.986786z'
  const shape3 =
    'M 469.539 263.9868 q -290.539 -269.9868 -469.539 0 L 0 0 c 226.1111 0 182.8873 -0.4145 469.539 0 V 263.9868 z z'
  const shape4 =
    'M 469.539 0 q -234.7695 0 -469.539 0 L 0 0 c 66.1111 0.4292 351.0881 0.4292 469.539 0.2083 V 0 z'

  let enter = gsap.timeline()
  enter
    .to('#path', {
      attr: { d: shape3 },
      ease: 'Power2.easeIn',
      duration: 0,
    })
    .to('#path', {
      attr: { d: shape4 },
      ease: 'Power2.easeOut',
      duration: 0,
    })
    .to('#path', {
      attr: { d: shape0 },
      duration: 0,
    })
    .to('.path-container', { zIndex: -5, duration: 0 })
  return enter
}

export default quickTransition
