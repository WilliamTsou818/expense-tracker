const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
  name: 'User1',
  email: 'user1@example.com',
  password: '12345678'
}

const SEED_DATA = [
  {
    name: '午餐',
    category: '餐飲食品',
    date: '2021-06-01',
    amount: 150,
    merchant: '美吉堡'
  },
  {
    name: '晚餐',
    category: '餐飲食品',
    date: '2021-06-02',
    amount: 100,
    merchant: '全家'
  },
  {
    name: '文明帝國 VI',
    category: '休閒娛樂',
    date: '2021-06-02',
    amount: 1200,
    merchant: 'Steam'
  },
  {
    name: 'Netflix訂閱',
    category: '休閒娛樂',
    date: '2021-06-03',
    amount: 399,
    merchant: 'Netflix'
  }
]

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        password: hash,
        email: SEED_USER.email
      })
    )
    .then((user) => {
      const userId = user._id
      return Promise.all(
        Array.from({ length: SEED_DATA.length }, (_, i) =>
          Record.create({
            name: SEED_DATA[i].name,
            category: SEED_DATA[i].category,
            date: SEED_DATA[i].date,
            amount: SEED_DATA[i].amount,
            merchant: SEED_DATA[i].merchant,
            userId
          })
        )
      )
    })
    .then(() => {
      console.log('add record and user seed data!')
      return db.close()
    })
    .catch((err) => console.error(err))
})
