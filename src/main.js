import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'

import agendaEnter from './entries/agendaEnter'
import archivesEnter from './entries/archivesEnter'
import { eventsEnter } from './entries/eventsEnter'
import galerieEnter from './entries/galerieEnter'
import homeEnter from './entries/homeEnter'
import mentionsEnter from './entries/mentionsEnter'
import onceMob from './entries/onceMob'
import projectEnter from './entries/projectEnter'
import {
  wordsFadeIn,
  headingsFadeIn,
  divsFadeIn,
  linksOut,
} from './global-views/animations'
import { contact, contactClear } from './global-views/contact/contact'
import footer from './global-views/footer/footer'
import language from './global-views/language'
import { setLenis } from './global-views/lenis'
import {
  navBackground,
  navBackgroundClear,
} from './global-views/nav/navBackground'
import { navHover, navHoverAgenda } from './global-views/nav/navHover'
import {
  navMob,
  navLeave,
  navEnter,
  navLeaveToGalerie,
} from './global-views/navMob/navMob'
import { galerie, galerieClear } from './pages-views/galerie/galerie'
import { home, homeClear } from './pages-views/home/home'
import mentions from './pages-views/mentions/mentions'
import beforeAgenda from './transitions/beforeAgenda'
import beforeEvents from './transitions/beforeEvents'
import enter from './transitions/enter'
import leave from './transitions/leave'
import leaveToGalerie from './transitions/leaveToGalerie'
import quickEnter from './transitions/quickEnter'
// import { printMedia } from './utilities/dev'

// printMedia()
setLenis()

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}
barba.use(barbaPrefetch)

barba.hooks.beforeEnter(() =>
  window.addEventListener('unload', () => window.scrollTo(0, 0))
)

barba.hooks.afterEnter((data) => contact(data))

barba.hooks.beforeLeave(contactClear)

barba.init({
  timeout: 4000,
  preventRunning: true,
  views: [
    {
      namespace: 'home',
      afterEnter() {
        home()
        headingsFadeIn()
        divsFadeIn()
        linksOut()
        language()
        navHover()
        navMob()
        footer()
      },
      afterLeave() {
        homeClear()
      },
    },
    {
      namespace: 'agenda',
      afterEnter() {
        divsFadeIn()
        navHoverAgenda()
        navBackground()
        navMob()
        footer()
      },
      afterLeave() {
        navBackgroundClear()
      },
    },
    {
      namespace: 'solo',
      afterEnter() {
        headingsFadeIn()
        wordsFadeIn()
        divsFadeIn()
        linksOut()
        navHover()
        navBackground()
        navMob()
        footer()
      },
      afterLeave() {
        navBackgroundClear()
      },
    },
    {
      namespace: 'royaumont',
      afterEnter() {
        wordsFadeIn()
        divsFadeIn()
        linksOut()
        navHover()
        navBackground()
        navMob()
        language()
        footer()
      },
      afterLeave() {
        navBackgroundClear()
      },
    },
    {
      namespace: 'durand',
      afterEnter() {
        wordsFadeIn()
        divsFadeIn()
        linksOut()
        navHover()
        navBackground()
        navMob()
        footer()
      },
      afterLeave() {
        navBackgroundClear()
      },
    },
    {
      namespace: 'mdc',
      afterEnter() {
        headingsFadeIn()
        wordsFadeIn()
        divsFadeIn()
        linksOut()
        navHover()
        navBackground()
        navMob()
        footer()
      },
      afterLeave() {
        navBackgroundClear()
      },
    },
    {
      namespace: 'archives',
      afterEnter() {
        headingsFadeIn()
        divsFadeIn()
        linksOut()
        navHover()
        navBackground()
        navMob()
        footer()
      },
      afterLeave() {
        navBackgroundClear()
      },
    },
    {
      namespace: 'galerie',
      afterEnter() {
        galerie()
        navHover()
        navMob()
        footer()
      },
      afterLeave() {
        galerieClear()
      },
    },
    {
      namespace: 'mentions',
      afterEnter() {
        mentions()
        navHover()
        linksOut()
        navMob()
        footer()
      },
    },
  ],
  transitions: [
    {
      name: 'home',
      to: { namespace: ['home'] },
      leave(data) {
        const done = this.async()
        leave(data, done)
      },
      enter() {
        enter(homeEnter)
      },
      once(data) {
        onceMob(data)
        homeEnter()
      },
    },
    {
      name: 'home-mob',
      from: {
        custom: ({ trigger }) => {
          return (
            trigger.classList && trigger.classList.contains('nav-link-mobile')
          )
        },
      },
      to: { namespace: ['home'] },
      leave(data) {
        const done = this.async()
        navLeave(data, done)
      },
      enter() {
        navEnter(homeEnter)
      },
    },
    {
      name: 'projects',
      to: { namespace: ['solo', 'royaumont', 'durand', 'mdc'] },
      leave(data) {
        const done = this.async()
        leave(data, done)
      },
      enter() {
        enter(projectEnter)
      },
      once(data) {
        onceMob(data)
        projectEnter()
      },
    },
    {
      name: 'projects-mob',
      from: {
        custom: ({ trigger }) => {
          return (
            trigger.classList && trigger.classList.contains('nav-link-mobile')
          )
        },
      },
      to: { namespace: ['solo'] },
      leave(data) {
        const done = this.async()
        navLeave(data, done)
      },
      enter() {
        navEnter(projectEnter)
      },
    },
    {
      name: 'agenda',
      to: { namespace: ['agenda'] },
      leave(data) {
        const done = this.async()
        leave(data, done)
      },
      enter() {
        beforeAgenda(agendaEnter)
      },
      once(data) {
        onceMob(data)
        agendaEnter()
      },
    },
    {
      name: 'agenda-mob',
      from: {
        custom: ({ trigger }) => {
          return (
            trigger.classList && trigger.classList.contains('nav-link-mobile')
          )
        },
      },
      to: { namespace: ['agenda'] },
      leave(data) {
        const done = this.async()
        navLeave(data, done)
      },
      enter() {
        navEnter(agendaEnter)
      },
    },
    {
      name: 'archives',
      to: { namespace: ['archives'] },
      leave(data) {
        const done = this.async()
        leave(data, done)
      },
      enter() {
        enter(archivesEnter)
      },
      once(data) {
        onceMob(data)
        archivesEnter()
      },
    },
    {
      name: 'archives-mob',
      from: {
        custom: ({ trigger }) => {
          return (
            trigger.classList && trigger.classList.contains('nav-link-mobile')
          )
        },
      },
      to: { namespace: ['archives'] },
      leave(data) {
        const done = this.async()
        navLeave(data, done)
      },
      enter() {
        navEnter(archivesEnter)
      },
    },
    {
      name: 'galerie',
      to: { namespace: ['galerie'] },
      leave(data) {
        const done = this.async()
        leaveToGalerie(data, done)
      },
      enter() {
        quickEnter(galerieEnter)
      },
      once(data) {
        onceMob(data)
        galerieEnter()
      },
    },
    {
      name: 'galerie-mob',
      from: {
        custom: ({ trigger }) => {
          return (
            trigger.classList && trigger.classList.contains('nav-link-mobile')
          )
        },
      },
      to: { namespace: ['galerie'] },
      leave(data) {
        const done = this.async()
        navLeaveToGalerie(data, done)
      },
      enter() {
        navEnter(galerieEnter)
      },
    },
    {
      name: 'galerie-events',
      from: {
        custom: ({ trigger }) => {
          return (
            trigger.classList && trigger.classList.contains('link-to-galerie')
          )
        },
      },
      to: { namespace: ['galerie'] },
      leave(data) {
        const done = this.async()
        leaveToGalerie(data, done)
      },
      enter() {
        beforeEvents(eventsEnter)
      },
    },
    {
      name: 'mentions',
      to: { namespace: ['mentions'] },
      leave(data) {
        const done = this.async()
        leave(data, done)
      },
      enter() {
        quickEnter(mentionsEnter)
      },
      once(data) {
        onceMob(data)
        mentionsEnter()
      },
    },
    {
      name: 'mentions-mob',
      from: {
        custom: ({ trigger }) => {
          return (
            trigger.classList &&
            trigger.classList.contains('nav-mobile-mentions')
          )
        },
      },
      to: { namespace: ['mentions'] },
      leave(data) {
        const done = this.async()
        navLeave(data, done)
      },
      enter() {
        navEnter(mentionsEnter)
      },
    },
    {
      name: 'self',
      leave(data) {
        if (
          data.trigger.classList.contains('nav-link-mobile') ||
          data.trigger.classList.contains('nav-mobile-mentions')
        ) {
          const done = this.async()
          navLeave(data, done)
        } else {
          const done = this.async()
          leave(data, done)
        }
      },
      enter(data) {
        if (
          data.trigger.classList.contains('nav-link-mobile') ||
          data.trigger.classList.contains('nav-mobile-mentions')
        ) {
          switch (data.current.namespace) {
            case 'home':
              navEnter(homeEnter)
              break
            case 'solo':
              navEnter(projectEnter)
              break
            case 'agenda':
              navEnter(agendaEnter)
              break
            case 'archives':
              navEnter(archivesEnter)
              break
            case 'galerie':
              navEnter(galerieEnter)
              break
            case 'mentions':
              navEnter(mentionsEnter)
              break
          }
        } else {
          switch (data.current.namespace) {
            case 'home':
              enter(homeEnter)
              break
            case 'solo':
              enter(projectEnter)
              break
            case 'royaumont':
              enter(projectEnter)
              break
            case 'durand':
              enter(projectEnter)
              break
            case 'mdc':
              enter(projectEnter)
              break
            case 'agenda':
              beforeAgenda(agendaEnter)
              break
            case 'archives':
              enter(archivesEnter)
              break
            case 'galerie':
              enter(galerieEnter)
              break
            case 'mentions':
              quickEnter(mentionsEnter)
              break
          }
        }
      },
    },
  ],
})
