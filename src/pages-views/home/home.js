import { gsap } from 'gsap'

import { hamHome, hamHomeClear } from './hamHome'
import homeButtons from './homeButtons'
import {
  homeProjectsDesktop,
  homeProjectsDesktopClear,
} from './homeProjectsDesktop'
import homeProjectsMobile from './homeProjectsMobile'
import { lightbox, lightboxClear } from './lightbox'
import { listen, listenClear } from './listen'
import { vidsLoaded } from '../../utilities/loading'

const home = (data) => {
  homeButtons()
  listen()
  lightbox()

  let mm = gsap.matchMedia()
  mm.add(
    {
      isDesktop: '(min-width: 992px)',
      isMobile: '(max-width: 991px)',
    },
    (context) => {
      let { isDesktop, isMobile } = context.conditions

      let videos

      if (isDesktop) {
        homeProjectsDesktop()
        videos = gsap.utils.toArray('.section-projets video')
      } else if (isMobile) {
        videos = gsap.utils.toArray('.section-projets-mob video')
        homeProjectsDesktopClear()
        homeProjectsMobile()
        hamHome()
      }

      vidsLoaded(function () {
        videos.forEach((video) => {
          video.muted = true
          video.play()
        })
      }, data.next.container)
    }
  )
}

const homeClear = () => {
  homeProjectsDesktopClear()
  listenClear()
  lightboxClear()
  hamHomeClear()
}

export { home, homeClear }
