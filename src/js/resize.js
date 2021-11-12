const iframes = document.querySelectorAll('iframe.ap-embed')
const iframeMap = new Map()

iframes.forEach(iframe => iframeMap.set(iframe.contentWindow, iframe))

window.addEventListener('message', msg => {
  const iframe = iframeMap.get(msg.source)
  if (!iframe) return

  if (msg.data.type === 'embed-size') {
    iframe.setAttribute('height', msg.data.height)
    iframe.style.height = `${msg.data.height}px`
    return
  }
})

iframes.forEach(iframe => {
  const data = { type: 'embed-size-query' }
  iframe.contentWindow.postMessage(data, '*')
})
