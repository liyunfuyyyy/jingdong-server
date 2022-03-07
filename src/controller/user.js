/**
 * @description user controller
 * @author liyunfu
 */

const { User } = require('../models/index')

/**
 * 登录
 * @param {String} username 用户名
 * @param {String} password 密码
 */
async function login(username, password) {
  const user = await User.findOne({ username, password })
  if (user != null) {
    // 登录成功
    return true
  }
  // 登录失败
  return false
}

/**
 * 注册新用户
 * @param {Object} userInfo 用户信息
 */
async function register(userInfo = {}) {
  // 注意验证一下 username unique
  const newUser = await User.create(userInfo)
  return newUser
}

module.exports = {
  login,
  register
}

