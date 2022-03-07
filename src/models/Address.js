/**
 * @description Address Model
 * @author liyunfu
 */

const mongoose = require('../db/db')

const Schema = mongoose.Schema({
  username: { // 用户名
    type: String,
    required: true
  },
  city: String, // 城市
  department: String, // 小区
  houseNumber: String, // 门牌号
  name: String,
  phone: String,
}, { timestamps: true })

const Address = mongoose.model('address', Schema)

module.exports = Address
