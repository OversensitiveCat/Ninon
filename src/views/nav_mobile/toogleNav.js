import tlNav from './tlNav'

function toogleNav() {
  if (tlNav.progress() == 0) {
    tlNav.play()
    document.querySelector('.body').style.overflowY = 'hidden'
  } else if (tlNav.progress() == 1) {
    tlNav.reverse()
    document.querySelector('.body').style.overflowY = 'scroll'
  }
  console.log('toogle toogle please')
}

export default toogleNav
