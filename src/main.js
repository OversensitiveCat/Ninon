import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'

import galerieEnter from './transitions/galerie_enter'
import enterTransition from './transitions/global/basic_enter'
import leaveTransition from './transitions/global/basic_leave'
import homeEnter from './transitions/home_enter'
import galerieOnce from './transitions/once/galerie_once'
import homeOnce from './transitions/once/home_once'
import otherOnce from './transitions/once/other_once'
import projectOnce from './transitions/once/project_once'
import otherEnter from './transitions/other_enter'
import projectEnter from './transitions/project_enter'
import quickTransition from './transitions/quick_enter'
import agenda from './views/agenda'
import animations from './views/global/animations'
import mobileHeight from './views/global/mobileHeight'
import nav from './views/global/nav'
import navProjets from './views/global/nav_projets'
import setContact from './views/global/set_contact'
import setLenis from './views/global/set_lenis'
import setNavMob from './views/global/set_navMob'
import home from './views/home'

barba.use(barbaPrefetch)

barba.hooks.enter((data) => {
  mobileHeight(data)
  console.log('mobile height should be fix')
  window.addEventListener('unload', () => window.scrollTo(0, 0))
})

barba.hooks.afterEnter((data) => {
  animations(),
    setLenis(),
    setNavMob(data),
    setContact(data),
    navProjets(),
    nav(data)
})

barba.init({
  timeout: 4000,
  views: [
    {
      namespace: 'home',
      afterEnter() {
        home()
      },
    },
    {
      namespace: 'agenda',
      beforeEnter() {
        agenda()
      },
    },
  ],
  transitions: [
    {
      name: 'home',
      to: { namespace: ['home'] },
      leave() {
        const done = this.async()
        leaveTransition(done)
      },
      enter() {
        quickTransition()
      },
      afterEnter() {
        homeEnter()
      },
      once() {
        homeOnce()
      },
    },
    {
      name: 'projects',
      leave() {
        const done = this.async()
        leaveTransition(done)
      },
      enter(data) {
        enterTransition(data)
      },
      afterEnter({ next }) {
        projectEnter(next.container)
      },
      once() {
        projectOnce()
      },
    },
    {
      name: 'agenda',
      to: { namespace: ['agenda'] },
      leave() {
        const done = this.async()
        leaveTransition(done)
      },
      enter(data) {
        enterTransition(data)
      },
      afterEnter(data) {
        otherEnter(data)
      },
      once(data) {
        otherOnce(data)
      },
    },
    {
      name: 'archives',
      to: { namespace: ['archives'] },
      leave() {
        const done = this.async()
        leaveTransition(done)
      },
      enter(data) {
        enterTransition(data)
      },
      afterEnter(data) {
        otherEnter(data)
      },
      once(data) {
        otherOnce(data)
      },
    },
    {
      name: 'galerie',
      to: { namespace: ['galerie'] },
      leave() {
        const done = this.async()
        leaveTransition(done)
      },
      enter(data) {
        enterTransition(data)
      },
      afterEnter() {
        galerieEnter()
      },
      once() {
        galerieOnce()
      },
    },
  ],
})
