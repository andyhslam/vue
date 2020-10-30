import { toLocaleDateString } from '@/utils'

const filters = {
  formatDateTime (timestamp, format) {
    if (!timestamp) return ''

    let value = toLocaleDateString(timestamp, format)
    return value
  },
  // 将秒数转换为时分秒格式
  formatDuration (value) {
    if (!value) return ''

    let theTime = parseInt(value)// 秒
    let middle = 0// 分
    let hour = 0// 小时

    if (theTime > 60) {
      middle = parseInt(theTime / 60)
      theTime = parseInt(theTime % 60)
      if (middle > 60) {
        hour = parseInt(middle / 60)
        middle = parseInt(middle % 60)
      }
    }
    let result = `${parseInt(theTime)}"`
    if (middle > 0) {
      result = `${parseInt(middle)}'${result}`
    }
    if (hour > 0) {
      result = `${parseInt(hour)}°${result}`
    }
    return result
  },
  formatRichText (content) {
    content = content.replace(/<\/?.+?>/g, '')
    content = content.replace(/ /g, '')
    return content
  }
}

export default {
  install (Vue, options) {
    Object.keys(filters).forEach(name => {
      Vue.filter(name, filters[name])
    })
  }
}
