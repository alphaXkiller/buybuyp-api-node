import R from 'ramda'
import Bluebird from 'bluebird'
import { Model } from '../lib/mysql/index.js'

const _product_clause = {
  select: '`product_image`.`product_id` AS `product_id`',
  join: R.join('\n', [
    'LEFT JOIN `product_image`',
    'ON `product_image`.`image_id` = `image`.`id`',
    'AND `product_image`.`deleted` = 0'
  ])
}


const _model = Model({
  table: 'image',

  sql: {
    select: R.join('\n', [
      'SELECT',
      '`image`.`id`   AS `id`,',
      '`image`.`path` AS `path`'
    ])
  }
})

const save = _model.save


const getById = R.curry((mysql, {id}) => _model.getById(mysql, id))


const getByIds = R.curry((mysql, {ids}) => {
  const where = 'AND `image`.`id` IN ( ? )'

  return _model.getWhere(where, mysql, [ids])
})


const getByProductId = R.curry((mysql, {product_id}) => {
  const clause = R.merge(_product_clause)({
    where: 'AND `product_image`.`product_id` = ?'
  })

  return _model.get(clause, mysql, [product_id])
})


const getByProductIds = R.curry( (mysql, {list}) => {
  const clause = R.merge(_product_clause)({
    where: 'AND `product_image`.`product_id` IN ( ? )'
  })
  
  return _model.get(clause, mysql, [list])
})


export default {
  save,
  getById,
  getByIds,
  getByProductId,
  getByProductIds
}
