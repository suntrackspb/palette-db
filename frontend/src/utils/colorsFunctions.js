export const hexToRgba = (hex) => {
  const rgbArr = hex.slice(1).match(/.{1,2}/g).map(el => parseInt(el, 16))
  return {
    r: rgbArr[0],
    g: rgbArr[1],
    b: rgbArr[2],
    a: 1
  }
}

export const rgbaToText = (rgba) => {
  return `rgba(${Object.values(rgba).join(', ')})`
}

export const rgbaToHexText = (rgba) => {
  const arr = Object.values(rgba).map((item, i) => {
    //Переводим в 16 ричную систему и преобразуем альфа канал в 255 диапазон
    return i === 3 ? Math.round(item*255).toString(16) : item.toString(16)
  }).map(item => {
    //Проверяем наличие 2 символов в канале цвета
    return item.length > 1 ? item : `0${item}`
  }).map((item, i) => {
    //Убраем альфа канал при 1
    return i !== 3 ? item : item === 'ff' ? '' : item
  })
  return `#${arr.join('')}`
}