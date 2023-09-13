import imagesLoaded from 'imagesloaded'

const imgsLoaded = (container, func) => {
  let imgLoad = imagesLoaded(container)
  imgLoad.on('done', func)
}

function isDOMFullyLoaded() {
  return document.readyState === 'complete'
}

function areAllVideosLoaded(vids) {
  let allLoaded = true

  vids.forEach(function (vid) {
    if (vid.readyState !== 4) {
      allLoaded = false
      return false
    }
  })

  return allLoaded
}

const domLoaded = (func) => {
  if (isDOMFullyLoaded()) {
    func()
  } else {
    document.addEventListener('readystatechange', function () {
      if (isDOMFullyLoaded()) {
        if (func && typeof func === 'function') {
          func()
        } else console.log('DOM loaded')
      }
    })
  }
}

const vidsLoaded = (func, container) => {
  function performActionWhenVidsLoaded(vids) {
    if (areAllVideosLoaded(vids)) {
      if (func && typeof func === 'function') func()
    } else {
      vids.forEach((vid) => {
        vid.addEventListener('loadeddata', () =>
          performActionWhenVidsLoaded(vids)
        )
        vid.addEventListener('error', () => performActionWhenVidsLoaded(vids))
      })
    }
  }

  let checkVids = () => {
    let vids = container
      ? Array.from(container.querySelectorAll('video'))
      : Array.from(document.querySelectorAll('video'))

    if (!vids) return
    else return performActionWhenVidsLoaded(vids)
  }

  domLoaded(checkVids)
}

function areAllImagesLoaded() {
  const images = document.querySelectorAll('img')
  let allLoaded = true

  images.forEach(function (img) {
    if (!img.complete) {
      allLoaded = false
      return false
    }
  })

  return allLoaded
}

const imgsLoadedUs = (func, container) => {
  let checkImagesInterval

  function performActionWhenImgsLoaded(imgs) {
    if (areAllImagesLoaded(imgs)) {
      console.log('Imgs loaded')
      clearInterval(checkImagesInterval)
      if (func && typeof func === 'function') func()
    }
  }

  let checkImages = () => {
    const imgs = container
      ? container.querySelectorAll('img')
      : document.querySelectorAll('img')

    checkImagesInterval = setInterval(
      () => performActionWhenImgsLoaded(imgs),
      1000
    )
  }

  domLoaded(checkImages)
}

export { domLoaded, vidsLoaded, imgsLoaded, imgsLoadedUs }
