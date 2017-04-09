import R from 'ramda'

import { ChatChannel } from '../domain/index.js'


const getAllWithUsersByUserUid = async (ctx, next) => ChatChannel
  .getAllWithUsersByUserUid(ctx.mysql, ctx.params.user_id)
  .then(res => { ctx.body = res })


export default {
  getAllWithUsersByUserUid
}
