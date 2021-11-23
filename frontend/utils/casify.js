export const camelCase = data => {
  //get data keys and create array of matched cases
  let snakeKeys = Object.keys(data)
  let mappedCase = snakeKeys.map(key => {
    let parts = key.split("_")
    if (parts.length === 1) {
      return {[key]: key}
    } else {
      camelParts = parts.slice(1, parts.length).map(piece => {
        return piece[0].toUpperCase() + piece.slice(1,piece.length)
      })
      return {[key]:parts.slice().concat(camelParts).join()}
    }
  })
  const newData = {}
  snakeKeys.forEach(key => {
    newData[map]
  })
  //create new object and return with mapped keys
}