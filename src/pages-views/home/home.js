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

  vidsLoaded(function () {
    gsap.utils.toArray('video').forEach((video) => {
      video.muted = true
      video.play()
    })
  }, data.next.container)

  let mm = gsap.matchMedia()
  mm.add(
    {
      isDesktop: '(min-width: 992px)',
      isMobile: '(max-width: 991px)',
    },
    (context) => {
      let { isDesktop, isMobile } = context.conditions

      if (isDesktop) {
        homeProjectsDesktop()
      } else if (isMobile) {
        homeProjectsDesktopClear()
        homeProjectsMobile()
        hamHome()
      }
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
