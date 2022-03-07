/**
 * @description mongoose 连接数据库
 * @author liyunfu
 */
const mongoose = require('mongoose')

const DB_URL = 'mongodb://root:example@47.99.147.11:27017/jingdong?authSource=admin'

// 开始连接
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// 连接对象
const db = mongoose.connection

db.on('error', err => {
  console.error('mongoose connect error', err)
})
db.once('open', () => {
  console.log('mongoose 连接成功')
})

module.exports = mongoose
