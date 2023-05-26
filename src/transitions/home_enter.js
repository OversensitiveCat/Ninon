import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const homeEnter = () => {
  let mm = gsap.matchMedia()
  mm.add(
    {
      isDesktop: `(min-width: 992px)`,
      isMobile: `(max-width: 991px)`,
    },
    (context) => {
      // eslint-disable-next-line no-unused-vars
      let { isDesktop, isMobile } = context.conditions

      // BASIC ENTER
      let enter = gsap.timeline()
      enter
        .set('.hide', { autoAlpha: 0 })
        .to(window, {
          scrollTo: isDesktop ? '.nav-bar-sticky' : '.content-wrapper',
          duration: 0.1,
          ease: 'power1.inOut',
        })
        .fromTo(
          '.transition',
          { yPercent: 0 },
          {
            yPercent: -100,
            ease: 'Power1.inOut',
            duration: 0.4,
            delay: 0.5,
          }
        )
        .set('.transition', { zIndex: -20, yPercent: 100 })

      // tl Desktop
      if (isDesktop) {
        let lettersNav = new SplitType('.nav-heading', {
          types: 'chars',
          tagName: 'span',
        })
        let tl = gsap.timeline({ paused: true })
        tl.from('.nav-item', {
          autoAlpha: 0,
          yPercent: 100,
          duration: 0.4,
          stagger: { amount: 1 },
        })
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
          .fromTo(
            '.image-about',
            {
              opacity: 0,
              yPercent: 30,
              duration: 2,
            },
            { opacity: 1, yPercent: 0 },
            '-=0.3'
          )
          .fromTo(
            '.bio-highlight-para.fr',
            {
              opacity: 0,
              yPercent: 20,
              duration: 1.5,
            },
            { opacity: 1, yPercent: 0 },
            '-=0.2'
          )
          .fromTo(
            '.bio-para.fr, .bio-line',
            {
              opacity: 0,
              yPercent: 25,
              duration: 1.5,
            },
            { opacity: 1, yPercent: 0, stagger: { amount: 0.35 } },
            '-=0.2'
          )
          .fromTo(
            '.change-language',
            {
              opacity: 0,
              yPercent: 60,
              duration: 1,
            },
            { opacity: 1, yPercent: 0 },
            '-=0.35'
          )
          .fromTo(
            '.button-dates, .button-ecouter',
            {
              opacity: 0,
              yPercent: 60,
              duration: 1,
            },
            { opacity: 1, yPercent: 0, stagger: { amount: 0.35 } },
            '-=0.4'
          )

        enter.eventCallback('onComplete', () => tl.play())
      }
    }
  )
}

export default homeEnter
