import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'

import aaEnter from './transitions/archives-agenda_enter'
import aaOnce from './transitions/archives-agenda_once'
import galerieEnter from './transitions/galerie_enter'
import galerieOnce from './transitions/galerie_once'
import leaveTransition from './transitions/global/leave'
import homeEnter from './transitions/home_enter'
import homeOnce from './transitions/home_once'
import projectEnter from './transitions/project_enter'
import projectOnce from './transitions/project_once'
import agenda from './views/agenda'
import animations from './views/global/animations'
import language from './views/global/lang'
import mobileHeight from './views/global/mobileHeight'
import nav from './views/global/nav'
import navProjets from './views/global/nav_projets'
import setContact from './views/global/set_contact'
import setLenis from './views/global/set_lenis'
import setNavMob from './views/global/set_navMob'
import home from './views/home'
import { slideGalerie } from './views/slider-galerie'
import { slideHome } from './views/slider-home'

barba.use(barbaPrefetch)

barba.hooks.beforeEnter((data) => {
  mobileHeight(data)
  window.addEventListener('unload', () => window.scrollTo(0, 0))
})

barba.hooks.afterEnter((data) => {
  animations()
  setLenis()
  setNavMob(data)
  setContact(data)
  navProjets()
  nav(data)
  language(data)
})

barba.init({
  timeout: 4000,
  views: [
    {
      namespace: 'home',
      afterEnter() {
        home()
        slideHome()
      },
    },
    {
      namespace: 'agenda',
      afterEnter() {
        agenda()
      },
    },
    {
      namespace: 'galerie',
      afterEnter() {
        slideGalerie()
      },
    },
  ],
  transitions: [
    {
      name: 'home',
      to: { namespace: ['home'] },
      leave(data) {
        const done = this.async()
        leaveTransition(data, done)
      },
      enter() {
        homeEnter()
      },
      once() {
        homeOnce()
      },
    },
    {
      name: 'projects',
      leave(data) {
        const done = this.async()
        leaveTransition(data, done)
      },
      enter({ next }) {
        projectEnter(next.container)
      },
      once() {
        projectOnce()
      },
    },
    {
      name: 'agenda',
      to: { namespace: ['agenda'] },
      leave(data) {
        const done = this.async()
        leaveTransition(data, done)
      },
      enter(data) {
        aaEnter(data)
      },
      once(data) {
        aaOnce(data)
      },
    },
    {
      name: 'archives',
      to: { namespace: ['archives'] },
      leave(data) {
        const done = this.async()
        leaveTransition(data, done)
      },
      enter(data) {
        aaEnter(data)
      },
      once(data) {
        aaOnce(data)
      },
    },
    {
      name: 'galerie',
      to: { namespace: ['galerie'] },
      leave(data) {
        const done = this.async()
        leaveTransition(data, done)
      },
      enter() {
        galerieEnter()
      },
      once() {
        galerieOnce()
      },
    },
  ],
})
