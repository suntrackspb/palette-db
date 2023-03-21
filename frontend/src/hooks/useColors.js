export const useDarkness = (rgba, darkness, amount) => {
  let colorsArr = []
  const addDarkness = (intensive, darkness) => {
    const result = intensive - darkness
    return result >= 0
      ? result
      : 0
  }
  for (let i = 0; i < amount; i++) {
    let obj = {
      r: addDarkness(rgba['r'], i * darkness),
      g: addDarkness(rgba['g'], i * darkness),
      b: addDarkness(rgba['b'], i * darkness),
      a: 1
    }
    colorsArr.push(obj)
  }
  return colorsArr
}

export const useLightness = (rgba, lightness, amount) => {
  let colorsArr = []
  const addLightness = (intensive, lightness) => {
    const result = intensive + lightness
    return result <= 255
      ? result
      : 255
  }
  for (let i = 0; i < amount; i++) {
    let obj = {
      r: addLightness(rgba['r'], i * lightness),
      g: addLightness(rgba['g'], i * lightness),
      b: addLightness(rgba['b'], i * lightness),
      a: 1
    }
    colorsArr.push(obj)
  }
  return colorsArr
}
