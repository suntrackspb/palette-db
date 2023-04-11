export const capitalizeFirstLetter = (str) => {
  let firstLetter = str.match(/[a-zа-яё]/)
  if (firstLetter) {
    let index = str.indexOf(firstLetter);
    return str.substring(0, index) + firstLetter[0].toUpperCase() + str.substring(index + 1)
  } else {
    return str
  }
}