import gsap from 'gsap'

function tlItem(item, text, color, backColor) {
  let tl = gsap.timeline({ paused: true })
  tl.to(item, {
    borderColor: color,
    backgroundColor: backColor,
    duration: 0.25,
  }).to(text, { color: color, duration: 0.25 }, 0)

  return tl
}

function tlContact(navContact, color, backColor) {
  let tl = gsap.timeline({ paused: true })

  tl.to(navContact, {
    borderColor: color,
    backgroundColor: backColor,
    duration: 0.25,
  }).to('.nav-item-contact .nav-text', { color: color, duration: 0.25 }, 0)

  return tl
}

function tlProjet(navProjet, color, backColor) {
  let tl = gsap.timeline({ paused: true })

  tl.to(navProjet, {
    backgroundColor: backColor,
    height: 'auto',
    borderColor: color,
    duration: 0.35,
    ease: 'power1.inOut',
  })
    .to(
      '.nav-item-projets .nav-link .nav-text',
      { color: color, duration: 0.35 },
      0
    )
    .to('.project-arrow-nav', { rotate: 90, duration: 0.35 }, 0)
    .from(
      '.drop-projects .nav-text',
      { opacity: 0, stagger: { amount: 0.3 }, duration: 0.35 },
      0
    )
    .to('.project-arrow-color', { stroke: color, duration: 0.35 }, 0)

  return tl
}

export { tlItem, tlContact, tlProjet }
