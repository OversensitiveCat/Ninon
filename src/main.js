import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'

import enterTransition from './transitions/basic_enter'
import quickTransition from './transitions/basic_enter_home'
import leaveTransition from './transitions/basic_leave'
import homeEnter from './transitions/home_enter'
import mobileHeight from './transitions/mobileHeight'
import mobileHeightProject from './transitions/mobileHeightProject'
import homeOnce from './transitions/once/home_once'
import projectOnce from './transitions/once/project_once'
import projectEnter from './transitions/project_enter'
import animations from './views/global/animations'
import setLenis from './views/global/lenis'
import navMobile from './views/global/navMobile'
import home from './views/home'

barba.use(barbaPrefetch)

barba.hooks.afterEnter((data) => {
  animations(), setLenis(), navMobile(data)
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
        mobileHeight()
      },
      enter() {
        quickTransition()
      },
      afterEnter() {
        homeEnter()
      },
      beforeOnce() {
        mobileHeight()
      },
      once() {
        homeOnce()
      },
    },
    {
      name: 'basic-transition',
      leave() {
        const done = this.async()
        leaveTransition(done)
      },
      beforeEnter() {
        mobileHeightProject()
      },
      enter() {
        enterTransition()
      },
      afterEnter({ next }) {
        projectEnter(next.container)
      },
      beforeOnce() {
        mobileHeightProject()
      },
      once() {
        projectOnce()
      },
    },
  ],
})
