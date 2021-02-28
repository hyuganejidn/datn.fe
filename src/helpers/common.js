export function timeSince(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return `${Math.floor(interval)} năm`
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return `${Math.floor(interval)} tháng`
  }
  interval = seconds / 86400
  if (interval > 1) {
    return `${Math.floor(interval)} ngày`
  }
  interval = seconds / 3600
  if (interval > 1) {
    return `${Math.floor(interval)} giờ`
  }
  interval = seconds / 60
  if (interval > 1) {
    return `${Math.floor(interval)} phút`
  }
  return `${Math.floor(seconds)} giây`
}

export function capitalizeFirstLetter(str) {
  const capitalized = str.replace(/^./, str[0].toUpperCase())
  return capitalized
}
