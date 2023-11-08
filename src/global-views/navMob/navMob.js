import gsap from 'gsap'
import imagesLoaded from 'imagesloaded'

import { lenis } from '../lenis'
import navMobTimeline from './navMobTimeline'
import { vidsLoaded } from '../../utilities/loading'

const tl = navMobTimeline()

const white = 'rgb(247, 244, 244)'
let color
let colorChange = false

function hamColor(color, d) {
  gsap.to('.ham-line', { backgroundColor: color, delay: d })
}

function toogle() {
  let current = gsap.getProperty('.ham-line', 'backgroundColor')
  if (current !== 'rgb(247, 244, 244)') {
    color = current
    colorChange = true
  }

  if (tl.progress() === 0 && !tl.isActive()) {
    if (colorChange) hamColor(white, 0)
    lenis.stop()
    return tl.play()
  } else if (tl.progress() === 1 && !tl.isActive()) {
    if (colorChange) {
      hamColor(color, 1.75)
      colorChange = false
    }
    return tl.reverse().then(() => lenis.start())
  }
}

const navMob = () => {
  let mm = gsap.matchMedia()
  mm.add('(max-width: 991px)', () => {
    let ham = document.querySelector('.hamburger')

    ham.addEventListener('click', toogle)
  })
}

const navLeave = (data, done) => {
  data.current.container.remove()
  window.scrollTo(0, 0)
  done()
}

const navLeaveVid = (data, done) => {
  vidsLoaded(function () {
    data.current.container.remove()
    window.scrollTo(0, 0)      
    let vid = data.next.container.querySelector('.section-hero video')
    vid.muted = true
    vid.play()
    done()
  }, data.next.container)
}


const navEnter = (pageEnter) => {
  return tl.reverse().then(() => {
    lenis.start()
    pageEnter()
  })
}

export { navMob, navLeave, navLeaveVid, navEnter }
