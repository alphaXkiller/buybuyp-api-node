import Router from 'koa-router'

import UserChecker from '../middleware/user-checker.js'
import User        from '../middleware/user.js'

const routes = () => {
  const router = Router()

  //TODO: get UID from ctx.state.user instead of params
  router.post('/:uid/validate',
    // (ctx, next) => { 
    //   console.log(ctx.mysql)
    //   return next()
    // }, 
    User.addIfNotFound
  )

  return router.routes()
}

export default routes
