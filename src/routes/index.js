import Router from 'koa-router'

import Public_Product          from './public/product.js'
import Public_Product_Category from './public/product-category.js'

import Image          from './image.js'
import User           from './user.js'
import Product        from './product.js'
import Contact        from './contact.js'

const router = Router()

const Index = () => {
  router.get('/', (ctx, next) => {
    ctx.body = { Hello_World: 'Welcome to buybuy api' }
  })

  return router.routes()
}

const Public = {
  Product         : Public_Product,
  ProductCategory : Public_Product_Category,
}

export default {
  Index,
  Image,
  User,
  Product,
  Contact,

  Public
}
