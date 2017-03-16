import R from 'ramda'

import { User } from '../domain/index.js'


const addIfNotFound = async (ctx, next) => User
  .getByUid(ctx.mysql, {uid: ctx.params.uid})   

  // TODO: grab info from checker
  .tap(R.when(R.isNil, () => User.save(ctx.mysql, {
    uid: ctx.request.body.uid,
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    email_verified: ctx.request.body.email_verified ? 1 : 0,
    profile_image: ctx.request.body.profile_image
  })))

  .then( () => { ctx.body={ success: true } } )


export default {
  addIfNotFound
}
