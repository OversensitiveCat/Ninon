/* eslint-disable no-unused-vars */
import gsap from 'gsap'

import { tlItem, tlContact, tlProjet } from './navHoverTimelines'
const red = '#b40000'
const black = '#141313'
const white = '#f7f4f4'

const navHover = () => {
  const items = gsap.utils.toArray('.nav-item').filter((i) => {
    if (
      i.classList.contains('nav-item-projets') ||
      i.classList.contains('nav-item-contact')
    ) {
      return false
    } else return true
  })

  const navProjet = document.querySelector('.nav-item-projets')
  const navContact = document.querySelector('.nav-item-contact')

  items.forEach((item) => {
    let text = item.querySelector('.nav-text')
    let itemHover = tlItem(item, text, red, 'transparent')

    item.addEventListener('mouseenter', () => itemHover.play())
    item.addEventListener('mouseleave', () => itemHover.reverse())
  })

  let projetHover = tlProjet(navProjet, red, black)
  navProjet.addEventListener('mouseenter', () => projetHover.play())
  navProjet.addEventListener('mouseleave', () => projetHover.reverse())

  let contactHover = tlContact(navContact, red, white)
  navContact.addEventListener('mouseenter', () => contactHover.play())
  navContact.addEventListener('mouseleave', () => contactHover.reverse())
}

const navHoverAgenda = () => {
  const items = gsap.utils.toArray('.nav-item').filter((i) => {
    if (
      i.classList.contains('nav-item-projets') ||
      i.classList.contains('nav-item-contact')
    ) {
      return false
    } else return true
  })

  const navProjet = document.querySelector('.nav-item-projets')
  const navContact = document.querySelector('.nav-item-contact')

  items.forEach((item) => {
    let text = item.querySelector('.nav-text')
    let itemHover = tlItem(item, text, red, white)

    item.addEventListener('mouseenter', () => itemHover.play())
    item.addEventListener('mouseleave', () => itemHover.reverse())
  })

  let projetHover = tlProjet(navProjet, red, white)
  navProjet.addEventListener('mouseenter', () => projetHover.play())
  navProjet.addEventListener('mouseleave', () => projetHover.reverse())

  let contactHover = tlContact(navContact, red, white)
  navContact.addEventListener('mouseenter', () => contactHover.play())
  navContact.addEventListener('mouseleave', () => contactHover.reverse())
}

export { navHover, navHoverAgenda }
