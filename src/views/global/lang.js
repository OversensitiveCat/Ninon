import { gsap } from 'gsap'

const language = (data) => {
  function removeFr(para) {
    return para.classList.contains('en')
  }
  function removeEn(para) {
    if (para.classList.contains('en')) {
      return false
    } else return true
  }

  if (data.next.namespace == 'home' || data.next.namespace == 'royaumont') {
    const langButtons = data.next.container.querySelectorAll('.lang-text')
    let text

    if (data.next.namespace == 'home') {
      text = gsap.utils.toArray('.bio-highlight-para, .bio-para')
    }
    if (data.next.namespace == 'royaumont') {
      text = gsap.utils.toArray(
        '.para-white, .link-out-box, .question-box, .next-dates'
      )
    }

    const en = text.filter(removeFr)
    const fr = text.filter(removeEn)
    let tl = gsap.timeline()

    gsap.set(en, { autoAlpha: 0 })
    langButtons[0].addEventListener('click', () => {
      if (langButtons[0].classList.contains('active')) {
        return
      } else {
        tl.to(en, {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.in',
        })
          .to(fr, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' })
          .set(en, { autoAlpha: 0 })
        langButtons[2].classList.remove('active')
        langButtons[0].classList.add('active')
      }
    })
    langButtons[2].addEventListener('click', () => {
      if (langButtons[2].classList.contains('active')) {
        return
      } else {
        tl.to(fr, {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.in',
        })
          .to(en, { autoAlpha: 1, duration: 0.3, ease: 'power1.out' })
          .set(fr, { autoAlpha: 0 })
        langButtons[0].classList.remove('active')
        langButtons[2].classList.add('active')
      }
    })
  } else return
}

export default language
