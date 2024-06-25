export function deepCopy(target) {
  if (typeof target === 'object') {
      const result = Array.isArray(target) ? [] : {}
      for (const key in target) {
          if (typeof target[key] == 'object') {
              result[key] = deepCopy(target[key])
          } else {
              result[key] = target[key]
          }
      }

      return result
  }

  return target
}

export  function generateUniqueID() {
  return `v2-${Date.now()}-${Math.floor(Math.random() * (9e12 - 1)) + 1e12}`
}

export function isSupportPerformanceObserver() {
  return !!window.PerformanceObserver
}
export function isSupportSendBeacon() {
  return !!window.navigator?.sendBeacon
}

export function onBFCacheRestore(callback) {
  window.addEventListener('pageshow', event => {
      // pageshow 事件有一个persisted属性，返回一个布尔值。页面第一次加载时，这个属性是false；当页面从缓存加载时，这个属性是true。
      if (event.persisted) {
          callback(event)
      }
  }, true)
}

export function onBeforeunload(callback) {
  window.addEventListener('beforeunload', callback, true)
}

export function onHidden(callback, once) {
  const onHiddenOrPageHide = (event) => {
      if (event.type === 'pagehide' || document.visibilityState === 'hidden') {
          callback(event)
          if (once) {
              window.removeEventListener('visibilitychange', onHiddenOrPageHide, true)
              window.removeEventListener('pagehide', onHiddenOrPageHide, true)
          }
      }
  }

  window.addEventListener('visibilitychange', onHiddenOrPageHide, true)
  window.addEventListener('pagehide', onHiddenOrPageHide, true)
}

export function executeAfterLoad(callback) {
  if (document.readyState === 'complete') {
      callback()
  } else {
      const onLoad = () => {
          callback()
          window.removeEventListener('load', onLoad, true)
      }

      window.addEventListener('load', onLoad, true)
  }
}

export function getPageURL() {
  return window.location.href 
}