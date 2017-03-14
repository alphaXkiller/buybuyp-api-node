import R from 'ramda'
import Bluebird from 'bluebird'
import { auth } from '../domain/index.js'


const validateAuth = async (ctx, next) => {
  if (ctx.url.startsWith('/api/')) {
    const header = R.path(['request', 'header'])(ctx)
    const id_token = R.compose(
      R.last,
      R.split(' ')
    )(header.authorization)

    await Bluebird.resolve(auth().verifyIdToken(id_token))

      .then( decoded => { ctx.state.user = { id: decoded.user_id } } )

      .then( () => next() )

      .catch( err => {
        if (R.pathEq(['errorInfo', 'code'], 'auth/argument-error')(err)) {
          ctx.status = 403
          ctx.message = 'Not authorized'
        } else throw err
      })

  } else {
    await next()
  }
}

export default validateAuth
