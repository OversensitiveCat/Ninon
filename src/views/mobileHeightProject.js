const mobileHeightProject = () => {
  const setHeight = () => {
    document.querySelector('#hero-section').style.height =
      window.innerHeight + 'px'
  }
  let deviceWidth = window.matchMedia('(max-width: 991px)')
  if (deviceWidth.matches) {
    setHeight()
  }
}

export default mobileHeightProject
