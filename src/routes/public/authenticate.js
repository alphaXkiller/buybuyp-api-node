import Router              from 'koa-router'
import Authenticate        from '../../middleware/authenticate.js'
import * as AuthenticateChecker from '../../middleware/authenticate.checker.js'

const routes = () => {
  const router = Router()

  router.post('/signup', AuthenticateChecker.signup, Authenticate.signup)

  return router.routes()
}

export default routes
