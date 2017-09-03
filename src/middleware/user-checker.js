import Awesomize from 'awesomize'
import Bluebird  from 'bluebird'
import V         from 'validator'
import R         from 'ramda'

import { SetErrIfInvalid } from '../lib/awesomize-util.js'


const Field = {
  contact_uid: R.path(['request', 'body', 'contact_uid']),
  unread_message: R.path(['request', 'body', 'unread_message'])
}


const getField = ctx => R.reduce(
  (acc, val) => R.merge(acc, {[val] : Field[val](ctx)}), {}
)


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


const unreadMsgCount = async (ctx, next) => {
  const field = getField(ctx)(['contact_uid', 'unread_message'])

  await Awesomize({}, v => ({
    contact_uid: [ v.required ],
    unread_message: [ v.required ]
  }))(field)

  .then(SetErrIfInvalid)

  .then(() => {
    ctx.checker = field

    return next()
  })
}

const searchContact = async (ctx, next) => {
}


export default {
  addContact,
  searchContact,
  unreadMsgCount
}
