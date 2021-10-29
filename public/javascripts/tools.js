const toolsFunction = {
  dateToString (date) {
    const day = ('0' + String(date.getDate())).slice(-2)
    const month = ('0' + String(date.getMonth() + 1)).slice(-2)
    const year = String(date.getFullYear())
    const dateArray = [year, month, day]
    return dateArray.join('-')
  },
  inputValidation (data) {
    const { name, category, date, amount, merchant } = data
    const validationResults = {
      name: true,
      category: true,
      date: true,
      amount: true,
      merchant: true
    }
    name.trim().length === 0 ? validationResults.name = false : ''
    category.length === 0 ? validationResults.category = false : ''
    date.length === 0 ? validationResults.date = false : ''
    amount.length === 0 ? validationResults.amount = false : ''
    merchant.trim().length === 0 ? validationResults.merchant = false : ''

    return validationResults
  },

  registerInputValidation (data) {
    const { name, email, password, comfirmPassword } = data
    
    const errors = []
    if (!name || !email || !password || !comfirmPassword) {
      errors.push({ message: '所有欄位都是必填資料。' })
    }
    if (password !== comfirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符。' })
    }
    
    return errors
  }
}

module.exports = toolsFunction
