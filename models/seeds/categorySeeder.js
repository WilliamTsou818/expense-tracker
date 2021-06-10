const Category = require('../category')
const db = require('../../config/mongoose')

const categoryData = [
  {
    categoryName: '家居物業',
    categoryEngName: 'home',
    categoryIcon: 'fas fa-home'
  },
  {
    categoryName: '交通出行',
    categoryEngName: 'transportation',
    categoryIcon: 'fas fa-shuttle-van'
  },
  {
    categoryName: '休閒娛樂',
    categoryEngName: 'entertainment',
    categoryIcon: 'fas fa-grin-beam'
  },
  {
    categoryName: '餐飲食品',
    categoryEngName: 'food',
    categoryIcon: 'fas a-utensils'
  },
  {
    categoryName: '其他',
    categoryEngName: 'others',
    categoryIcon: 'fas fa-pen'
  }
]

db.once('open', () => {
  Category.create(categoryData)
    .then(() => {
      console.log('Add category seeder!')
      return db.close()
    })
    .catch(err => console.error(err))
})
