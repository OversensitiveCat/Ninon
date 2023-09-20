async function checkIframeLoaded(iframe) {
  return new Promise((resolve, reject) => {
    iframe.addEventListener('load', function () {
      resolve()
    })

    iframe.addEventListener('error', function () {
      reject()
    })
  })
}

const loadIframe = async (iframe, onSuccess, onError) => {
  checkIframeLoaded(iframe).then(onSuccess).catch(onError)
}

export default loadIframe
