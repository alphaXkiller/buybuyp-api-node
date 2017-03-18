import Router from 'koa-router'
import Product from '../../middleware/product.js'

const routes = () => {
  const router = Router()

  router.get('/', Product.search)

  router.get('/:id', Product.getById)

  return router.routes()
}

export default routes
