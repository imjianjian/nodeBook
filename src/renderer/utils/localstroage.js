export function getNode (code) {
  return JSON.parse(localStorage.getItem(code))
}

export function setNode ({code, title, msg}) {
  return localStorage.setItem(code, JSON.stringify({title, msg}))
}

export function delNode (code) {
  return localStorage.removeItem(code)
}

export function clearItem () {
  return localStorage.clear()
}
