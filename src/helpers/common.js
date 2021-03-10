export function timeSince(_date) {
  const date = new Date(_date)
  const seconds = Math.floor((new Date() - date) / 1000)

  let interval = seconds / 31536000

  if (interval > 1) {
    return `${Math.floor(interval)} năm`
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return `${Math.floor(interval)} tháng`
  }
  interval = seconds / 86400
  const option = {
    month: 'long',
    day: 'numeric',
  }

  if (date.getFullYear() !== new Date().getFullYear()) option.year = 'numeric'

  if (interval > 1) {
    if (interval > 6) return date.toLocaleDateString('vi-VN', option)
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

/**
 * Convert a base64 string in a Blob according to the data and contentType.
 *
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || ''
  sliceSize = sliceSize || 512

  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i += 1) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)

    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

// function isBase64(s) {
//   const regexCheckBase64 = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i
//   return !!s.match(regexCheckBase64)
// }

export function getImages(xmlString) {
  const doc = new DOMParser().parseFromString(xmlString, 'text/html')
  const elImages = doc.body.querySelectorAll('img[src^="data:image/"]')
  const imagesBase = Array.from(elImages).map(el => {
    const srcBase = el.getAttribute('src')
    if (srcBase) {
      const block = srcBase.split(';')
      const contentType = block[0].split(':')[1] // In this case "image/gif"
      // get the real base64 content of the file
      const realData = block[1].split(',')[1]
      return { realData, contentType }
    }
    return {}
  })

  const imgs = imagesBase.map((img, i) => b64toBlob(img.realData, img.contentType, i))
  return imgs
}

export const replaceSrcImg = (xmlString, srcImgs) => {
  const doc = new DOMParser().parseFromString(xmlString, 'text/html')
  const elImages = doc.body.querySelectorAll('img[src^="data:image/"]')
  for (let i = 0; i < elImages.length; i += 1) {
    elImages[i].setAttribute('src', srcImgs[i].path)
  }
  return doc
}

export const getFirstTagImg = xmlString => {
  const doc = new DOMParser().parseFromString(xmlString, 'text/html')
  const elImgFirst = doc.body.querySelector('img')
  return elImgFirst
}

export const getInnerText = xmlString => {
  const dom = new DOMParser().parseFromString(xmlString, 'text/html')
  const elContent = dom.body.firstChild
  return elContent.innerText
}
