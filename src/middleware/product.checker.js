import R from 'ramda'
import V from 'validator'
import Awesomize from 'awesomize'

import { SetErrIfInvalid } from '../lib/awesomize-util.js'

const checkPostBody = async (ctx, next) => {
  await Awesomize({}, (v) => ({
    name: { validate: [ v.required ] },
    description: { validate: [ v.required ] },
    price: { validate: [ v.required ] },
    address: { validate: [ v.required ] },
    image_ids: { validate: [ v.required, v.isArray() ] }
    // city: { validate: [ v.required ] },
    // state: { validate: [ v.required ] },
    // postal_code: { validate: [ v.required, v.isInt ] },
    // image: { validate: [ v.required, v.isArray() ] }
  }))(ctx.request.body)

  .tap(SetErrIfInvalid)

  .then( ({data}) => {
    ctx.checker = data

    return next()
  })

  .catch( err => {
    if (err.status === 400) {
      ctx.status = 400
      ctx.body = err
    } else throw err
  })
}


const awesomizeQuery = async (ctx, next) => {
  await Awesomize({}, v => ({
    limit: { validate: [ v.isInt ], normalize: [ R.defaultTo('16') ] },
    page: { validate: [ v.isInt ], normalize: [ R.defaultTo('1') ] },
    keyword: {}
  }))(ctx.request.query)

  .tap(SetErrIfInvalid)

  .then( ({ data }) => {
    ctx.checker = data

    return next()
  } )

  .catch( err => {
    if (err.status === 400) {
      ctx.status = 400
      ctx.body = err
    } else throw err
  } )
}


export default {
  checkPostBody,
  awesomizeQuery
}
