const mobileHeight = (data) => {
  if (data.next.namespace != 'galerie') {
    const setHeight = () => {
      document.querySelector('.section-hero').style.height =
        window.innerHeight + 'px'
    }
    let deviceWidth = window.matchMedia('(max-width: 991px)')
    if (deviceWidth.matches) {
      setHeight()
    }
  }
}

export default mobileHeight
