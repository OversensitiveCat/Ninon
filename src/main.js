import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'

import enterTransition from './transitions/basic_enter'
import leaveTransition from './transitions/basic_leave'
import homeEnter from './transitions/home_enter'
import homeOnce from './transitions/home_once'
import mobileHeight from './transitions/mobileHeight'
import mobileHeightProject from './transitions/mobileHeightProject'
import projectEnter from './transitions/project_enter'
import projectOnce from './transitions/project_once'
import quickTransition from './transitions/quick_enter'
import { animations, setLenis, navMobile } from './views/global_views'
import home from './views/home'

barba.use(barbaPrefetch)

barba.hooks.afterEnter((data) => {
  console.log(data.next.namespace)
  animations(), setLenis(), navMobile()
})

barba.hooks.afterOnce((data) => {
  console.log(data.next.namespace)
  animations(), setLenis(), navMobile()
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
      afterEnter() {
        projectEnter()
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
