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

    // FINSWEET
    window.fsAttributes = window.fsAttributes || []
    window.fsAttributes.push([
      'cmsfilter',
      (filterInstances) => {
        console.log('cmsfilter Successfully loaded!')

        // The callback passes a `filterInstances` array with all the `CMSFilters` instances on the page.
        const [filterInstance] = filterInstances

        // The `renderitems` event runs whenever the list renders items after filtering.
        filterInstance.listInstance.on('renderitems', (renderedItems) => {
          console.log(renderedItems)
        })
      },
    ])
  }
  return gsap.delayedCall(1, agendaFunction)
}

export default agenda
