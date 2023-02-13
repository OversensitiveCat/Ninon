import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'

import enterTransition from './transitions/basic_enter'
import leaveTransition from './transitions/basic_leave'
import homeEnter from './transitions/home_enter'
import homeOnce from './transitions/home_once'
import projectEnter from './transitions/project_enter'
import projectOnce from './transitions/project_once'
import quickTransition from './transitions/quick_enter'
// import { animations, setLenis, navMobile, footer } from './views/global_views'
// import home from './views/home'
// import mobileHeightProject from './views/mobileHeightProject'

barba.use(barbaPrefetch)

// barba.hooks.enter((data) => {
//   console.log(data.next.namespace)
//   animations(), setLenis(), navMobile(), footer()
// })

// barba.hooks.once((data) => {
//   console.log(data.next.namespace)
//   animations(), setLenis(), navMobile(), footer()
// })

barba.init({
  debug: true,

  // views: [
  //   {
  //     namespace: 'home',
  //     beforeEnter() {
  //       home()
  //     },
  //   },
  //   {
  //     namespace: 'programme',
  //     beforeEnter() {
  //       mobileHeightProject()
  //     },
  //   },
  //   {
  //     namespace: 'royaumont',
  //     beforeEnter() {
  //       mobileHeightProject()
  //     },
  //   },
  //   {
  //     namespace: 'durand',
  //     beforeEnter() {
  //       mobileHeightProject()
  //     },
  //   },
  //   {
  //     namespace: 'mdc',
  //     beforeEnter() {
  //       mobileHeightProject()
  //     },
  //   },
  // ],
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
      name: 'basic-transition',
      leave() {
        const done = this.async()
        leaveTransition(done)
      },
      enter() {
        enterTransition()
      },
      afterEnter() {
        projectEnter()
      },
      once() {
        projectOnce()
      },
    },
  ],
})
