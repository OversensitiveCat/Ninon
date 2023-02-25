const mobileHeight = (data) => {
  if (data.next.namespace != 'galerie') {
    const setHeight = () => {
      document.querySelector('.section-hero').style.height =
        window.innerHeight + 'px'
    }
    console.log('before match')
    let deviceWidth = window.matchMedia('(max-width: 991px)')
    if (deviceWidth.matches) {
      setHeight()
      console.log('after match')
    }
  }
}

export default mobileHeight
