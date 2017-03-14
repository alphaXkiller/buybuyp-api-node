import R from 'ramda'
import Jwt from 'jsonwebtoken'
import Moment from 'moment'
import Bluebird from 'bluebird'

import { auth } from '../domain/index.js'
import Domain from '../domain/index.js'


const signup = async (ctx, next) => {
  const email = R.path(['request', 'body', 'email'])(ctx)
  const password = R.path(['request', 'body', 'password'])(ctx)
  const displayName = R.path(['request', 'body', 'name'])(ctx)

  await Bluebird.resolve(auth().createUser({email, password, displayName}))

    .then(R.pick([
      'uidInternal',
      'emailInternal',
      'emailVerifiedInternal',
      'displayNameInternal',
      'photoURLInternal']) 
    )

    .then( token => {
      ctx.body = { success: true }
    })

    .catch( e => {
      let validation
      if (e.code === 'auth/email-already-exists') 
        validation = { email: 'already_exists' }
      ctx.status = 400
      ctx.body = {
        message: e.message,
        code: e.code,
        validation
      }
    })
}


const login = async (ctx, next) => {
  const provider = R.path(['request', 'body', 'provider'])(ctx)
  const id_token = R.path(['request', 'body', 'id_token'])(ctx)

  await Bluebird.resolve(auth().verifyIdToken(id_token))

    .then(R.applySpec({
      name: R.prop('name'),
      profile_image: R.prop('picture'),
      id: R.prop('user_id'),
      email: R.prop('email'),
      email_verified: R.prop('email_verified')
    }))

    .catch( err => {
      ctx.status = 400
      ctx.body = {
        message: err.message,
        code: err.code
      }
    })
}


const logout = (ctx, next) => {
  ctx.session = null
  ctx.status = 200
  ctx.cookies.set('x-access-token', null)
  ctx.cookies.set('x-access_token.sig', null)
  ctx.body = {
    message: "Logout successfully"
  }
}


export default {
  signup,
  login,
  logout
}
