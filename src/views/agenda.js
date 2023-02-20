import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const agenda = () => {
  function agendaFunction() {
    let items = gsap.utils.toArray('.agenda-item')
    items.forEach((item) => {
      let filter = item.querySelector('.red-filter')
      let tl = gsap.timeline({ paused: true })
      tl.to(filter, { width: '100%', duration: 0.2 })
      item.addEventListener('mouseenter', () => tl.play())
      item.addEventListener('mouseleave', () => tl.reverse())
    })
    let infos = gsap.utils.toArray('.infos-agenda')
    infos.forEach((info) => {
      let tl = gsap.timeline({ paused: true })
      tl.to(info, {
        borderColor: '#a80000',
        color: '#a80000',
        duration: 0.1,
        ease: 'none',
      })
      info.addEventListener('mouseenter', () => tl.play())
      info.addEventListener('mouseleave', () => tl.reverse())
    })

    //FIlTER DROPDOWN (-43deg)

    const form = document.querySelector('.form-block')
    const filterBox = document.querySelector('.filter-box')
    gsap.set(form, { autoAlpha: 0 })
    let dropForm = gsap.timeline({ paused: true })
    dropForm
      .to('.filter-arrow', { rotate: -43 })
      .to(form, { autoAlpha: 1, height: 'auto' }, '<')
    function drop() {
      if (dropForm.progress() == 0) {
        dropForm.play()
      } else {
        dropForm.reverse()
      }
    }
    filterBox.addEventListener('click', () => drop())

    // FILTER
    let c = new Array()
    let e = new Array()
    let r = new Array()

    items.forEach((item) => {
      let type = item.querySelector('.type-filter').innerHTML
      if (type == 'Concert') {
        c.push(item)
      }
      if (type == 'Enregistrement') {
        e.push(item)
      }
      if (type == 'Résidence') {
        r.push(item)
      }
    })

    class Type {
      constructor(items) {
        this.items = items
        this.visible = true
        this.active = false
      }
      filter() {
        if (this.visible == true) {
          this.items.forEach((item) => {
            item.style.display = 'grid'
          })
        } else {
          this.items.forEach((item) => {
            item.style.display = 'none'
          })
        }
      }
      check() {
        if (this.active == true) {
          this.visible = true
          this.filter()
        }
        if (this.active == false) {
          this.visible = false
          this.filter()
        }
      }
    }

    let concerts = new Type(c)
    let enregistrements = new Type(e)
    let residences = new Type(r)
    let all = [concerts, enregistrements, residences]

    // If we want to add an empty-state
    const emptyState = document.querySelector('.empty-state-agenda-manual')
    gsap.to(emptyState, { autoAlpha: 0 })

    // If we want to add a reset button

    // const reset = document.querySelector('.reset')
    // reset.addEventListener('click', () => {
    //   all.forEach((t) => {
    //     t.active = false
    //     t.visible = true
    //     t.filter()
    //   })
    //   checkboxs.forEach((checkbox) => {
    //     if (checkbox.classList.contains('w--redirected-checked') == true) {
    //       checkbox.classList.remove('w--redirected-checked')
    //     } else return
    //   })
    // })

    // Checkboxs events
    let checkboxs = gsap.utils.toArray('.check-box')
    checkboxs.forEach((checkbox) => {
      checkbox.addEventListener('click', () => {
        if (checkbox.classList.contains('w--redirected-checked') == false) {
          switch (checkboxs.indexOf(checkbox)) {
            case 0:
              concerts.active = true
              all.forEach((t) => t.check())
              break
            case 1:
              enregistrements.active = true
              all.forEach((t) => t.check())
              break
            case 2:
              residences.active = true
              all.forEach((t) => t.check())
          }
        }
        if (checkbox.classList.contains('w--redirected-checked') == true) {
          switch (checkboxs.indexOf(checkbox)) {
            case 0:
              concerts.active = false
              all.forEach((t) => t.check())
              break
            case 1:
              enregistrements.active = false
              all.forEach((t) => t.check())
              break
            case 2:
              residences.active = false
              all.forEach((t) => t.check())
          }
        }
        if (
          concerts.visible == false &&
          residences.visible == false &&
          enregistrements.visible == false
        ) {
          all.forEach((t) => {
            t.active = false
            t.visible = true
            t.filter()
          })
          checkboxs.forEach((checkbox) => {
            if (checkbox.classList.contains('w--redirected-checked') == false) {
              checkbox.classList.remove('w--redirected-checked')
            } else return
          })
        }
      })
    })
  }
  return gsap.delayedCall(1, agendaFunction)
}

export default agenda
