function dateToString(date) {
  const day = String(date.getDate())
  const month = String(date.getMonth() + 1)
  const year = String(date.getFullYear())
  const dateArray = [year, month, day]
  return dateArray.join('-')
}

module.exports = dateToString
