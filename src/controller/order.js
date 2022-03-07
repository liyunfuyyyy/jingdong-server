/**
 * @description 订单 controller
 * @author liyunfu
 */

const { Order, Product, Address } = require('../models/index')

// 创建订单（要从 Address Product 里拷贝数据，比较麻烦）
async function createOrder(username, data = {}) {
  console.log(username, data)
  // 解构 data（前端传来的订单信息）
  const {
    addressId,
    shopId,
    shopName,
    isCanceled = false,
    products = []
  } = data

  // 根据 addressId 获取地址信息
  const address = await Address.findById(addressId)

  // 获取商品列表
  const pIds = products.map(p => p.id)
  const productList = await Product.find({
    // 条件1：商品 id
    _id: {
      $in: pIds
    },
    // 条件2：商店 id
    shopId,
  })

  // 给商品列表增加销售数量（订单里，每个商品都有销量）
  const productListWithSales = productList.map(p => {
    // 商品 id
    const id = p._id.toString()

    // 找到商品销量
    const filterProducts = products.filter(item => item.id === id)
    if (filterProducts.length === 0) {
      // 没有找到匹配的数量，报错
      throw new Error('未找到匹配的销量数据')
    }

    return {
      orderSales: filterProducts[0].num, // 销量
      product: p
    }
  })

  // 创建订单
  const newOrder = await Order.create({
    username,
    address,
    shopId,
    shopName,
    isCanceled,
    products: productListWithSales
  })

  return newOrder
}

// 获取订单列表
async function getOrderList(username) {
  console.log('username', username)
  const list = await Order.find({ username }).sort({ _id: -1 })
  console.log('list', list)
  return list
}

module.exports = {
  createOrder,
  getOrderList
}
