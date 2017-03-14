import Router from 'koa-router'

import Authenticate from './authenticate.js'
import Image from './image.js'
import User from './user.js'
import Product from './product.js'

const router = Router()

const Index = () => {
  router.get('/', (ctx, next) => {
    ctx.body = { Hello_World: 'Welcome to buybuy api' }
  })

  return router.routes()
}


export default {
  Authenticate,
  Index,
  Image,
  User,
  Product
}
