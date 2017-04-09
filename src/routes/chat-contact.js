import Router from 'koa-router'

import ChatContact from '../middleware/chat-contact.js'

const routes = () => {
  const router = Router()

  router.get('/:user_id', ChatContact.getById)

  router.get('/:user_id/all', ChatContact.getByUserId)

  return router.routes()
}

export default routes
