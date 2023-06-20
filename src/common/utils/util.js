export function getUrlParam(name, h) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
  if (h) {
    const hash = window.location.hash
    const arr = hash.split('?')
    if (arr[1] !== undefined && arr[1].trim() !== '') {
      const r = arr[1].match(reg) // 匹配目标参数
      if (r != null) return decodeURIComponent(r[2])
      return null // 返回参数值
    }
  } else {
    const r = window.location.search.substr(1).match(reg) // 匹配目标参数
    if (r != null) return decodeURIComponent(r[2])
    return null // 返回参数值
  }
  return null
}