import Router from 'koa-router'

import User from '../middleware/user.js'

const routes = () => {
  const router = Router()

  router.post('/get-by-uids', User.getByUidList)

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
