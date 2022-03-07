const router = require('koa-router')()

const { SuccessModel } = require('../res-model/index')
const {
  getHotList,
  getShopInfo,
  getProductsByShopId
} = require('../controller/shop')

router.prefix('/api/shop')

// 热门商店（首页商店列表）
router.get('/hot-list', async function (ctx, next) {
  const list = await getHotList()
  ctx.body = new SuccessModel(list)
})

// 根据 id 查询单个商店信息
router.get('/:id', async function (ctx, next) {
  const id = ctx.params.id // 商店 id
  const shop = await getShopInfo(id)
  ctx.body = new SuccessModel(shop)
})

router.get('/:id/products', async function (ctx, next) {
  const id = ctx.params.id // 商店 id
  const tab = ctx.query.tab || 'all' // query 里的 tab 参数，默认为 'all'
  const products = await getProductsByShopId(id, tab)
  ctx.body = new SuccessModel(products)
})

module.exports = router
