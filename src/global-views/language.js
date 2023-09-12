import { gsap } from 'gsap'

const language = () => {
  const buttons = gsap.utils.toArray('.lang-text')

  const en = gsap.utils.toArray('.en')
  const fr = gsap.utils.toArray('.fr')

  if (en.length !== fr.length) {
    console.log('an element is missing')
    console.log(en.length, en)
    console.log(fr.length, fr)
  }

  gsap.set(en, { autoAlpha: 0 })

  let tl = gsap.timeline()

  function toogle(n, o, remove, add) {
    if (n.classList.contains('active')) return

    o.classList.remove('active')
    n.classList.add('active')

    tl.to(remove, {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power1.in',
    }).to(add, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' })
  }

  buttons[0].addEventListener('click', () =>
    toogle(buttons[0], buttons[2], en, fr)
  )
  buttons[2].addEventListener('click', () =>
    toogle(buttons[2], buttons[0], fr, en)
  )
}

export default language
