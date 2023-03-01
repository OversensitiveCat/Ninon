import { gsap } from 'gsap'
import SplitType from 'split-type'

const projectEnter = (container) => {
  let letters = new SplitType('.heading1', {
    types: 'chars',
    tagName: 'span',
  })
  let lettersNav = new SplitType('.nav-heading', {
    types: 'chars',
    tagName: 'span',
  })
  let tl = gsap.timeline({ paused: true })
  tl.from(letters.chars, {
    autoAlpha: 0,
    scale: 0.2,
    yPercent: -20,
    duration: 0.2,
    stagger: { amount: 0.8 },
  })
    .from(
      '.project-number-hero',
      {
        autoAlpha: 0,
        yPercent: -100,
        duration: 0.8,
      },
      '-=0.6'
    )
    .from(
      '.nav-item',
      {
        autoAlpha: 0,
        yPercent: 100,
        duration: 0.4,
        stagger: { amount: 1 },
      },
      '-=0.4'
    )
    .from(
      lettersNav.chars,
      {
        autoAlpha: 0,
        scale: 0.2,
        yPercent: -20,
        duration: 0.2,
        stagger: { amount: 0.5 },
      },
      '<'
    )
  const shape0 =
    'M469.539032,263.986786q -234.7695 0 -469.539 0L0,263.557617c66.11113,0.429169,351.088104,0.429169,469.539032,0.208344V263.986786z'
  const shape3 =
    'M 469.539 263.9868 q -290.539 -269.9868 -469.539 0 L 0 0 c 226.1111 0 182.8873 -0.4145 469.539 0 V 263.9868 z z'
  const shape4 =
    'M 469.539 0 q -234.7695 0 -469.539 0 L 0 0 c 66.1111 0.4292 351.0881 0.4292 469.539 0.2083 V 0 z'

  let enter = gsap.timeline({ onComplete: () => tl.play() })
  enter
    .to('#path', {
      attr: { d: shape3 },
      ease: 'Power2.easeIn',
      duration: 0.6,
    })
    .to('#path', {
      attr: { d: shape4 },
      ease: 'Power2.easeOut',
      duration: 0.6,
    })
    .to('#path', {
      attr: { d: shape0 },
      duration: 0,
    })
    .to('.path-container', { zIndex: -5 })

  let video = container.querySelector('video')
  video.muted = true
  video.play()
}

export default projectEnter
