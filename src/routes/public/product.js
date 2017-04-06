import Router from 'koa-router'
import Product from '../../middleware/product.js'
import ProductChecker from '../../middleware/product.checker.js'

const routes = () => {
  const router = Router()

  router.get('/', ProductChecker.awesomizeQuery, Product.search)

  router.get('/:id', Product.getById)

  return router.routes()
}

export default routes
