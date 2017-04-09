import R from 'ramda'

import { ChatContact } from '../domain/index.js'


const getByUserId = async (ctx, next) => ChatContact
  .getByUserId(ctx.mysql, ctx.params.user_id)
  .then(res => { ctx.body = res }) 


const getById = async (ctx, next) => ChatContact
  .getById(ctx.mysql, ctx.params.user_id)
  .then(res => { ctx.body = res })


export default {
  getByUserId,
  getById
}
