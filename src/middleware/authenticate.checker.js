import R from 'ramda'
import V from 'validator'
import Awesomize from 'awesomize'

import { SetErrIfInvalid } from '../lib/awesomize-util.js'

const signup = async (ctx, next) => {
  const email = R.path(['request', 'body', 'email'])(ctx)
  const password = R.path(['request', 'body', 'password'])(ctx)
  const name = R.path(['request', 'body', 'name'])(ctx)

  await Awesomize({}, (v) => ({
    email: {
      validate: [ v.required, R.ifElse(V.isEmail,
        R.always(null),
        R.always('Invalid Email')
      ) ]
    },
    password: {
      validate: [ v.required ]
    },
    name: {
      validate: [ v.required ]
    }
  }))({email, password, name})

  .then(SetErrIfInvalid(ctx))

  .then( () => next())

  .catch(next)
}


const login = async (ctx, next) => {
  const id_token = R.path(['request', 'body', 'id_token'])(ctx)

  await Awesomize({}, (v) => ({
    id_token: {
      validate: [ v.required ]
    }
  }))({id_token})

  .then(SetErrIfInvalid)

  .then( () => next() )

  .catch(next)
}


export {
  signup,
  login
}
