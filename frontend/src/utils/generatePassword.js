export const generatePassword = () => {
  const numbers = '1234567890'
  const letters = 'qwertyuiopasdfghjklzxcvbnm'
  const lettersUpp = 'QWERTYUIOPASDFGHJKLZXCVBNM'
  const symbols = '!@#$%^&*-_=+?'

  const getRandom = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)]
  }

  const generateArray = () => {
    const output = []

    for (let i = 0; i < 4; i++) {
      output.push(getRandom(letters))
      output.push(getRandom(lettersUpp))
    }
    output.push(getRandom(numbers))
    output.push(getRandom(symbols))

    return output
  }
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }
  return shuffle(generateArray()).join('')
}