import R from 'ramda'
import Bluebird from 'bluebird'

import { User } from '../domain/index.js'


const addIfNotFound = async (ctx, next) => User
  .getByUid(ctx.mysql, {uid: ctx.params.uid})   

  // TODO: grab info from checker
  .tap(R.when(R.isNil, () => User.save(ctx.mysql, [{
    uid: ctx.request.body.uid,
    name: ctx.request.body.name,
    email: ctx.request.body.email,
    email_verified: ctx.request.body.email_verified ? 1 : 0,
    profile_image: ctx.request.body.profile_image
  }])))

  .then( () => { ctx.body={ success: true } } )


const getByUidList = async (ctx, next) => User
  .getByUidList(ctx.mysql, ctx.request.body.uid_list)
  .then(res => { ctx.body = res })


export default {
  addIfNotFound,
  getByUidList
}
