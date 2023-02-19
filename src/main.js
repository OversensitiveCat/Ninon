import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'

import enterTransition from './transitions/global/basic_enter'
import leaveTransition from './transitions/global/basic_leave'
import homeEnter from './transitions/home_enter'
import homeOnce from './transitions/once/home_once'
import otherOnce from './transitions/once/other_once'
import projectOnce from './transitions/once/project_once'
import otherEnter from './transitions/other_enter'
import projectEnter from './transitions/project_enter'
import quickTransition from './transitions/quick_enter'
import agenda from './views/agenda'
import animations from './views/global/animations'
import setLenis from './views/global/lenis'
import mobileHeight from './views/global/mobileHeight'
import setContact from './views/global/set_contact'
import setNavMob from './views/global/set_navMob'
import home from './views/home'

barba.use(barbaPrefetch)

barba.hooks.beforeEnter(() => {
  mobileHeight()
})

barba.hooks.afterEnter((data) => {
  animations(data), setLenis(), setNavMob(), setContact()
})

barba.init({
  debug: true,
  views: [
    {
      namespace: 'home',
      beforeEnter() {
        home()
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
      enter() {
        enterTransition()
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
      enter() {
        enterTransition()
      },
      afterEnter(data) {
        otherEnter(data)
        agenda()
      },
      once(data) {
        otherOnce(data)
        agenda()
      },
    },
    {
      name: 'archives',
      to: { namespace: ['archives'] },
      leave() {
        const done = this.async()
        leaveTransition(done)
      },
      enter() {
        enterTransition()
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
      enter() {
        enterTransition()
      },
      afterEnter(data) {
        otherEnter(data)
      },
      once(data) {
        otherOnce(data)
      },
    },
  ],
})
