/**
 * @description Product Model
 * @author liyunfu
 */

const mongoose = require('../db/db')

const Schema = mongoose.Schema({
  shopId: { // 商店 id
    type: String,
    require: true
  },
  name: String,
  imgUrl: String,
  sales: Number, // 月售多少
  price: Number, // 当前价格
  oldPrice: Number, // 原价
  tabs: [String] // 商品分类，见原型图中，商品详情页左侧的 tab
}, { timestamps: true })

const Product = mongoose.model('product', Schema)

module.exports = Product
