import Router from 'koa-router'

import ChatChannel from '../middleware/chat-channel.js'

const routes = () => {
  const router = Router()

  router.get('/:user_id/all', ChatChannel.getAllWithUsersByUserUid)

  return router.routes()
}

export default routes
