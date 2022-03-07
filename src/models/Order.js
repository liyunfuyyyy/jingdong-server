/**
 * @description Order Model
 * @author liyunfu
 */

const mongoose = require('../db/db')

const Schema = mongoose.Schema({
  username: String,

  // 收货地址，格式参考 Address.js
  address: {
    username: { // 用户名
      type: String,
      required: true
    },
    city: String, // 城市
    department: String, // 小区
    houseNumber: String, // 门牌号
    name: String,
    phone: String,
  },

  shopId: String, // 商店 id
  shopName: String,

  // 订单是否被取消
  isCanceled: {
    type: Boolean,
    default: false // 默认不取消
  },

  products: [
    // 商品列表，参考 Product.js
    {
      orderSales: Number, // 销量
      product: {
        shopId: { // 商店 id
          type: String,
          require: true
        },
        name: String,
        imgUrl: String,
        sales: Number, // 月售多少
        price: Number, // 当前价格
        oldPrice: Number // 原价
      }
    }
  ]

}, { timestamps: true })

const Order = mongoose.model('order', Schema)

module.exports = Order

/*
    【重要提示！！！】
    创建订单时，前端传入的是 addressId 和商品 id
    但后端在存储订单时，要把当前 address 和商品信息全部取出来，拷贝一份，存储在订单信息中
    即，订单中不能通过 id 引用 address 和商品
    因为，订单一旦创建，其中的内容就不能再变化了。如后期商品降价或者涨价，订单里的商品也要保持当前购买时的价格
*/
