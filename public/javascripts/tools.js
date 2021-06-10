const toolsFunction = {
  dateToString(date) {
    const day = ('0' + String(date.getDate())).slice(-2)
    const month = ('0' + String( date.getMonth() + 1)).slice(-2)
    const year = String(date.getFullYear())
    const dateArray = [year, month, day]
    return dateArray.join('-')
  },
  inputValidation(data) {
    const {name, category, date, amount} = data
    const validationResults = {
      name: true,
      category: true,
      date: true,
      amount: true
    }
    name.trim().length === 0 ? validationResults.name = false : ''
    category.length === 0 ? validationResults.category = false : ''
    date.length === 0 ? validationResults.date = false : ''
    amount.length === 0 ? validationResults.amount = false : ''

    return validationResults
  }
}

module.exports = toolsFunction
