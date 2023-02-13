import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'

import homeEnter from './transitions/home_enter'
import projectEnter from './transitions/project_enter'
import { animations, setLenis, navMobile, footer } from './views/global_views'
import home from './views/home'
import mobileHeightProject from './views/mobileHeightProject'

barba.use(barbaPrefetch)

barba.hooks.enter((data) => {
  console.log(data.next.namespace)
  animations(), setLenis(), navMobile(), footer()
})

barba.hooks.once((data) => {
  console.log(data.next.namespace)
  animations(), setLenis(), navMobile(), footer()
})

barba.init({
  debug: true,
  views: [
    {
      namespace: 'home',
      enter() {
        home()
      },
    },
    {
      namespace: 'programme',
      enter() {
        mobileHeightProject()
      },
    },
    {
      namespace: 'royaumont',
      enter() {
        mobileHeightProject()
      },
    },
    {
      namespace: 'durand',
      enter() {
        mobileHeightProject()
      },
    },
    {
      namespace: 'mdc',
      enter() {
        mobileHeightProject()
      },
    },
  ],
  transitions: [
    {
      name: 'home',
      to: { namespace: ['home'] },
      once() {
        homeEnter()
      },
      enter() {
        homeEnter()
      },
    },
    {
      name: 'basic enter',
      once() {
        projectEnter()
      },
      enter() {
        projectEnter()
      },
    },
  ],
})
