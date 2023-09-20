import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const footerFadeIn = () => {
  let mm = gsap.matchMedia()
  mm.add(
    {
      isDesktop: '(min-width: 992px)',
      isMobile: '(max-width: 991px)',
    },
    (context) => {
      let { isDesktop, isMobile } = context.conditions

      let tl = gsap.timeline({ paused: true })
      if (isDesktop) {
        tl.from('.nav-item-footer', {
          autoAlpha: 0,
          yPercent: 40,
          duration: 0.4,
          stagger: { amount: 1 },
        })
          .from(
            '.line-footer',
            {
              yPercent: 30,
              autoAlpha: 0,
              duration: 1,
            },
            0
          )
          .from(
            '.contact-item-footer',
            {
              autoAlpha: 0,
              yPercent: 40,
              duration: 0.4,
              stagger: { amount: 0.8 },
            },
            0
          )
          .from(
            '.credits-footer',
            {
              opacity: 0,
              yPercent: 100,
              stagger: 0.15,
              duration: 0.4,
            },
            0.5
          )
      } else if (isMobile) {
        tl.from(
          '.contact-item-footer',
          {
            autoAlpha: 0,
            yPercent: 40,
            duration: 0.3,
            stagger: { amount: 0.5 },
          },
          0
        )
          .from(
            '.credits-footer',
            {
              opacity: 0,
              yPercent: -50,
              stagger: 0.15,
              duration: 0.4,
            },
            0
          )
          .from(
            '.arrow-back-to-top',
            {
              opacity: 0,
              yPercent: 50,
              duration: 0.7,
            },
            '>-=0.7'
          )
      }

      ScrollTrigger.create({
        trigger: '.main',
        start: 'bottom 85%',
        onEnter: () => tl.play(),
      })
      ScrollTrigger.create({
        trigger: '.main',
        start: 'bottom bottom',
        onLeaveBack: () => tl.pause(0),
      })
    }
  )
}

export default footerFadeIn
