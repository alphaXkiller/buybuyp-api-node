import Router from 'koa-router'

import ProductChecker from '../middleware/product.checker.js'
import Product        from '../middleware/product.js'

const routes = () => {
  const router = Router()

  router.post('/', 
    ProductChecker.checkPostBody,
    Product.save
  )

  router.get('/:id', Product.getById)

  return router.routes()
}

export default routes
