import Router from 'koa-router'

import UserChecker from '../middleware/user-checker.js'
import User        from '../middleware/user.js'


const routes = () => {
  const router = Router()

  router.post('/', UserChecker.addContact, User.addContact)

  router.get('/', User.searchContact)

  router.post('/unreadMessageCount', 
    UserChecker.unreadMsgCount 
  )

  return router.routes()
}

export default routes
