/**
 * @description Shop Model
 * @author liyunfu
 */

const mongoose = require('../db/db')

const Schema = mongoose.Schema({
  name: String,
  imgUrl: String,
  sales: Number, // 月售多少
  expressLimit: {  // 起送价格
    type: Number,
    default: 0
  },
  expressPrice: Number, // 基础运费
  slogan: String, // 宣传标语
}, { timestamps: true })

const Shop = mongoose.model('shop', Schema)

module.exports = Shop
