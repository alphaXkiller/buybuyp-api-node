import Awesomize from 'awesomize'
import Bluebird  from 'bluebird'
import V         from 'validator'
import R         from 'ramda'

import { SetErrIfInvalid } from '../lib/awesomize-util.js'

const addContact = async (ctx, next) => {
  const contact_uid = R.path(['request', 'body', 'contact_uid'])(ctx)

  await Awesomize({}, v => ({
    contact_uid: [ v.required ] 
  }))({contact_uid})

  .then(SetErrIfInvalid)

  .then( () => {
    ctx.checker = { contact_uid }
    return next()
  })
}


const searchContact = async (ctx, next) => {
  const in_chat = R.path(['request', 'query', 'in_chat'], ctx)

  await Awesomize({},  v => ({
    in_chat: {
      normalize: [ R.ifElse(R.equals('1'), R.T, R.always(null)) ]
    }
  }))({in_chat})

    .then( res => {
      ctx.checker = { in_chat: res.data.in_chat }
      return next()
    } )
}


export default {
  addContact,
  searchContact
}
