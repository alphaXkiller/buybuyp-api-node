import { ProductCategory } from '../domain/index.js'


const getAll = async (ctx, next) => ProductCategory
  .getAll(ctx.mysql)

  .then( categories => { ctx.body = categories } )


export default {
  getAll
}
