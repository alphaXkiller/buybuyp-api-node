import Router from 'koa-router'
import ProductCategory from '../../middleware/product-category.js'

const routes = () => {
  const router = Router()

  router.get('/', ProductCategory.getAll)

  return router.routes()
}


export default routes
