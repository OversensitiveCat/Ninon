import { gsap } from 'gsap'
import SplitType from 'split-type'

const navMobTimeline = () => {
  const mentions = new SplitType('.nav-mobile-mentions', {
    types: 'chars',
    tagName: 'span',
  })

  let tl = gsap.timeline({ paused: true })
  tl.set('.nav-bar-mobile-container', {
    bottom: 0,
    left: 0,
    gridTemplateRows: '60px auto 1fr auto',
  })
    .set('.nav-mobile', { display: 'block' })
    .set('.nav-mobile-contact', { display: 'block' })
    .set('.nav-mobile-mentions', { display: 'block' })
    .to('.nav-bar-mobile-container', {
      backgroundColor: '#141313',
      duration: 0.4,
    })
    .to('#hamLine1', { top: 39, rotate: 225, duration: 0.5 }, '<')
    .to('#hamLine2', { top: 39, rotate: -225, duration: 0.5 }, '<')
    .from(
      '.nav-item-mobile',
      {
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.2,
        yPercent: 60,
      },
      '-=0.3'
    )
    .from(
      '.nav-mobile-contact',
      { opacity: 0, yPercent: 20, scale: 0.9 },
      '>-=0.2'
    )
    .from(mentions.chars, { opacity: 0, stagger: { amount: 0.45 } }, '>-=0.6')

  return tl
}

export default navMobTimeline
