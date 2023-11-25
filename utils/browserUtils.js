export const isFirefox = function () {
  return (
    !window.$vueApp.config.globalProperties.$isServer &&
    !!window.navigator.userAgent.match(/firefox/i)
  )
}

export function rafThrottle(fn) {
  let locked = false
  return function (...args) {
    if (locked) return
    locked = true
    window.requestAnimationFrame((_) => {
      fn.apply(this, args)
      locked = false
    })
  }
}
