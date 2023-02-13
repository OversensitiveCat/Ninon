import { barba } from '@barba/core'
import { barbaPrefetch } from '@barba/prefetch'

import { homeEnter } from './transitions/home_enter'
import { projectEnter } from './transitions/project_enter'
import { animations, setLenis, navMobile, footer } from './views/global_views'
import home from './views/home'
import mobileHeightProject from './views/mobileHeightProject'

mobileHeightProject()

barba.use(barbaPrefetch)

barba.hooks.beforeEnter((data) => {
  console.log(data.next.namespace)
  animations()
  setLenis()
  navMobile()
  footer()
})

barba.hooks.beforeOnce((data) => {
  console.log(data.next.namespace)
  animations()
  setLenis()
  navMobile()
  footer()
})

barba.init({
  views: [
    {
      namespace: 'home',
      afterEnter() {
        home()
      },
    },
  ],
  transitions: [
    {
      sync: true,
      name: 'enter-home',
      to: { namespace: ['home'] },
      afterEnter({ next }) {
        homeEnter(next.container)
      },
    },
    {
      sync: true,
      afterEnter({ next }) {
        projectEnter(next.container)
      },
    },
  ],
})
