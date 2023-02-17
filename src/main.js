import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'

import agendaEnter from './transitions/agenda_enter'
import archivesEnter from './transitions/archives_enter'
import enterTransition from './transitions/basic_enter'
import quickTransition from './transitions/basic_enter_home'
import leaveTransition from './transitions/basic_leave'
import homeEnter from './transitions/home_enter'
import mobileHeightHome from './transitions/mobileHeight'
import mobileHeight from './transitions/mobileHeightProject'
import agendaOnce from './transitions/once/agenda_once'
import archivesOnce from './transitions/once/archives_once'
import homeOnce from './transitions/once/home_once'
import projectOnce from './transitions/once/project_once'
import projectEnter from './transitions/project_enter'
import animations from './views/global/animations'
import setLenis from './views/global/lenis'
import setContact from './views/global/set_contact'
import setNavMob from './views/global/set_navMob'
import home from './views/home'

barba.use(barbaPrefetch)

barba.hooks.afterEnter(() => {
  animations(), setLenis(), setNavMob(), setContact()
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
      beforeEnter() {
        mobileHeightHome()
      },
      enter() {
        quickTransition()
      },
      afterEnter() {
        homeEnter()
      },
      beforeOnce() {
        mobileHeightHome()
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
      beforeEnter() {
        mobileHeight()
      },
      enter() {
        enterTransition()
      },
      afterEnter({ next }) {
        projectEnter(next.container)
      },
      beforeOnce() {
        mobileHeight()
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
      beforeEnter() {
        mobileHeight()
      },
      enter() {
        enterTransition()
      },
      afterEnter() {
        agendaEnter()
      },
      beforeOnce() {
        mobileHeight()
      },
      once() {
        agendaOnce()
      },
    },
    {
      name: 'archives',
      to: { namespace: ['archives'] },
      leave() {
        const done = this.async()
        leaveTransition(done)
      },
      beforeEnter() {
        mobileHeight()
      },
      enter() {
        enterTransition()
      },
      afterEnter({ next }) {
        archivesEnter(next.container)
      },
      beforeOnce() {
        mobileHeight()
      },
      once({ next }) {
        archivesOnce(next.container)
      },
    },
  ],
})
