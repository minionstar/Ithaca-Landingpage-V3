export const preloader = (params: {onChange: any}) => {
  const {onChange} = params

  let mediaNodes = [
      ...Array.from(document.images),
      ...Array.from(document.getElementsByTagName("video")),
    ],
    mediaLength = mediaNodes.length,
    countLoaded = 0

  for (let node of mediaNodes) {
    let isComplete = false
    let action = ""

    if (node instanceof HTMLImageElement) {
      isComplete = node.complete
      action = "load"
    } else if (node instanceof HTMLVideoElement) {
      isComplete = !!node.duration
      action = "canplay"
    }

    if (isComplete) {
      ++countLoaded
      const result = calculatePercentage(countLoaded)
      onChange(result.percentage, result.completed)
      continue
    }

    node.addEventListener(action, onLoad)
  }

  function calculatePercentage(countLoaded: number) {
    let percentage = (countLoaded / mediaLength) * 100
    let completed = percentage === 100

    return {
      percentage,
      completed,
    }
  }

  function onLoad(this: any) {
    if (this.getAttribute("data-loaded")) {
      return
    }
    this.setAttribute("data-loaded", "")
    ++countLoaded
    const result = calculatePercentage(countLoaded)
    onChange(result.percentage, result.completed)
  }
}
