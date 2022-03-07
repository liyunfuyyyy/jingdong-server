const router = require('koa-router')()

const { SuccessModel, ErrorModel } = require('../res-model/index')
const loginCheck = require('../middleware/loginCheck')
const { createOrder, getOrderList } = require('../controller/order')

router.prefix('/api/order')

// 创建订单
router.post('/', loginCheck, async function (ctx, next) {
  // 有登录验证，可以直接获取 session
  const userInfo = ctx.session.userInfo
  const username = userInfo.username

  // 订单数据
  const data = ctx.request.body

  try {
    const newOrder = await createOrder(username, data)
    ctx.body = new SuccessModel(newOrder)
  } catch (ex) {
    console.error(ex)
    ctx.body = new ErrorModel(10005, '订单创建失败')
  }
})

// 获取订单列表
router.get('/', loginCheck, async function (ctx, next) {
  // 有登录验证，可以直接获取 session
  const userInfo = ctx.session.userInfo
  const username = userInfo.username

  const list = await getOrderList(username)

  ctx.body = new SuccessModel(list)
})

module.exports = router
