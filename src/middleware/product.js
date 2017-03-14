import R from 'ramda'
import Bluebird from 'bluebird'

import { Product, Image, ProductImage } from '../domain/index.js'

const save = async (ctx, next) =>
  Product.save(ctx.mysql, {
    name        : ctx.checker.name,
    description : ctx.checker.description,
    user_id     : ctx.state.user.id,
    price       : ctx.checker.price,
    address     : ctx.checker.address
  })

  .then( product => Bluebird
    .map( ctx.checker.image_ids, image_id => ProductImage.save(ctx.mysql)({
      product_id: product.id,
      image_id
    }))
    
    .then( () => Image.getByIds(ctx.mysql)({ids: ctx.checker.image_ids}) )

    .then( images => R.merge(product, {images}) )
  )

  .then( product_with_img => {
    ctx.body = product_with_img
  })


const getById = async (ctx, next) => 
  Bluebird.props({
    product: Product.getById(ctx.mysql)({id: ctx.params.id}),
    images: Image.getByProductId(ctx.mysql)({product_id: ctx.params.id})
  })

  .then( ({product, images}) => { ctx.body = R.merge(product)({images}) } )


export default {
  save,
  getById
}
