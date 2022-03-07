/**
 * @description address controller
 * @author liyunfu
 */

const { Address } = require('../models/index')

// 获取列表
async function getAddressList(username) {
  const list = Address.find({ username }).sort({ updatedAt: -1 }) // 按更新时间倒序
  return list
}

// 根据 id 获取单个
async function getAddressById(id) {
  const address = Address.findById(id)
  return address
}

// 新建
async function createAddress(username, data = {}) {
  const address = await Address.create({
    username, // 把 username 拼接上，因为前端传入的数据没有 username
    ...data
  })
  return address
}

// 更新
async function updateAddress(id, username, data = {}) {
  const address = await Address.findOneAndUpdate(
    { _id: id, username }, // 查询条件
    { username, ...data }, // 要更新的数据，别忘了 username
    {
      new: true // 返回更新之后的最新数据，默认是 false 返回更新之前的数据
    }
  )
  return address
}

module.exports = {
  getAddressById,
  getAddressList,
  createAddress,
  updateAddress
}
