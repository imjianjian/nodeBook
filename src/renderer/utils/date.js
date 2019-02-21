export function getDate () {
  let year = new Date().getFullYear()
  let month = new Date().getMonth() + 1
  let day = new Date().getDate()
  let hour = new Date().getHours()
  let minute = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()
  let second = new Date().getSeconds() < 10 ? `0${new Date().getSeconds()}` : new Date().getSeconds()
  return `${year}-${month}-${day}/${hour}:${minute}:${second}`
}
