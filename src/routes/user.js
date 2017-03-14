import Router from 'koa-router'

const routes = () => {
  const router = Router()

  router.get('/', function (ctx, next) {
    console.log('still get to user')
    ctx.body = 'here'
  })

  return router.routes()
}

export default routes
