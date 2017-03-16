import Router from 'koa-router'

import Authenticate from './public/authenticate.js'
import Image from './image.js'
import User from './user.js'
import Product from './product.js'
import Product_P from './public/product.js'

const router = Router()

const Index = () => {
  router.get('/', (ctx, next) => {
    ctx.body = { Hello_World: 'Welcome to buybuy api' }
  })

  return router.routes()
}

const Public = {
  Product: Product_P,
  Authenticate
}

export default {
  Index,
  Image,
  User,
  Product,
  Public
}
