import R from 'ramda'
import Bluebird from 'bluebird'

import { Product, Image, ProductImage, Auth } from '../domain/index.js'


// ======================================
// ========== PRIVATE FUNCTION ==========
// ======================================

const _mergeByRowId = (group_obj, key)=> R.map( row =>
  R.compose(
    R.merge(row),
    R.objOf(key),
    R.prop(row.id)
  )(group_obj)
)

// TODO: refactor to helpers
const mergeGroupToRowsById = R.curry( (obj, key, group_obj) => 
  R.set(
    R.lensProp('rows'),
    _mergeByRowId(group_obj, key)(obj.rows)
  )(obj) 
)


// ======================================
// ========== EXPORT FUNCTION ===========
// ======================================
const save = async (ctx, next) =>Product
  .save(ctx.mysql, [{
    name        : ctx.checker.name,
    description : ctx.checker.description,
    uid         : ctx.state.user.uid,
    price       : ctx.checker.price,
    address     : ctx.checker.address
  }])
  .tap(() => console.log(ctx.state.user))
  .then( product => Bluebird
    .map( ctx.checker.image_ids, image_id => ProductImage.save(ctx.mysql)([{
      product_id: product.id,
      image_id
    }]))
    
    .then( () => Image.getByIds(ctx.mysql)({ids: ctx.checker.image_ids}) )

    .then( images => R.merge(product, {images}) )
  )

  .then( product_with_img => {
    ctx.body = product_with_img
  })


const getById = async (ctx, next) => Bluebird
  .props({
    product: Product.getById(ctx.mysql)({id: ctx.params.id}),
    images: Image.getByProductId(ctx.mysql)({product_id: ctx.params.id})
  })

  .then( ({product, images}) => { ctx.body = R.merge(product)({images}) } )


const search = async (ctx, next) => Product
  .search(ctx.mysql, {}) 

  .then( obj => {
    const list = R.compose(
      R.pluck('id'),
      R.prop('rows')
    )(obj)

    return Image
      .getByProductIds(ctx.mysql, {list})

      .then(R.groupBy(R.prop('product_id')))

      .then(mergeGroupToRowsById(obj, 'images'))
  })

  .then( result => { ctx.body = result } )


export default {
  save,
  getById,
  search
}
