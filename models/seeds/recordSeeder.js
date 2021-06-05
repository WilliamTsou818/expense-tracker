const Record = require('../record')
const db = require('../../config/mongoose')

const data = [
  {
    name: '午餐',
    category: '餐飲食品',
    date: '2021-06-01',
    amount: 150
  },
  {
    name: '晚餐',
    category: '餐飲食品',
    date: '2021-06-02',
    amount: 100
  },
  {
    name: '文明帝國 VI',
    category: '休閒娛樂',
    date: '2021-06-02',
    amount: 1200
  },
  {
    name: 'Netflix',
    category: '休閒娛樂',
    date: '2021-06-03',
    amount: 399
  }
]

db.once('open', () => {
  data.forEach(record => {
    Record.create({ 
      name: record.name,
      category: record.category,
      date: record.date,
      amount: record.amount
    })
  })
  console.log('Done!')
})
