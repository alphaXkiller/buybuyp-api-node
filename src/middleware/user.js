import R from 'ramda'
import Bluebird from 'bluebird'

import { User, UserContact } from '../domain/index.js'
import { notEmpty } from '../lib/helpers.js'


const addIfNotFound = async (ctx, next) => User
  .getByUid(ctx.mysql, ctx.params.uid)   

  // TODO: grab info from checker
  .tap(R.when(R.isNil, () => User.save(ctx.mysql, [{
    uid: ctx.request.body.uid,
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    email_verified: ctx.request.body.email_verified ? 1 : 0,
    profile_image: ctx.request.body.profile_image
  }])))

  .then( () => { ctx.body={ success: true } } )


// const getByUidList = async (ctx, next) => User
//   .getByUidList(ctx.mysql, ctx.request.body.uid_list)
//   .then(res => { ctx.body = res })


const searchContact = async (ctx, next) => UserContact
  .search(ctx.mysql, {
    user_uid : ctx.state.user.uid
  })

  .then( user_contact => R.composeP(
    result => { ctx.body = result },
    R.ifElse(
      notEmpty, 
      R.composeP(
        rows => R.set(R.lensProp('rows'), rows, user_contact),
        R.map( contact => R.compose(
          match => R.merge(contact, { unread_message: match.unread_message }),
          R.find(R.propEq('contact_uid', contact.uid)),
        )(user_contact.rows)),
        User.getByUids(ctx.mysql)
      ),
      R.always(user_contact)
    ),
    R.pluck('contact_uid'),
    R.prop('rows'),
    Bluebird.resolve
  )(user_contact))


const addContact = async (ctx, next) => UserContact
  .save(ctx.mysql, [{
    user_uid: ctx.state.user.uid,
    contact_uid: ctx.checker.contact_uid
  }])

  .then( user_contact => User
    .getByUid(ctx.mysql, user_contact.contact_uid)
    .then( contact => R.merge(
      contact, { unread_message: user_contact.unread_message }
    ))
  )

  .then( res => { ctx.body = res })


export default {
  addIfNotFound,
  // getByUidList,
  addContact,
  searchContact
}
