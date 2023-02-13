const mobileHeight = () => {
  const setHeight = () => {
    document.querySelector('#accueil').style.height = window.innerHeight + 'px'
  }
  let deviceWidth = window.matchMedia('(max-width: 991px)')
  if (deviceWidth.matches) {
    setHeight()
  }
}

export default mobileHeight
