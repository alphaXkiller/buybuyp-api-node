import R from 'ramda'
import Bluebird from 'bluebird'
import { Model } from '../lib/mysql/index.js'

// import { Model } from 'pimp-my-sql'

const _model = Model({
  table: 'image',

  sql: {
    select: `
      SELECT
        \`image\`.\`id\`   AS \`id\`,
        \`image\`.\`path\` AS \`path\`
    `
  }
})

const save = R.curry((mysql, {path}) => _model.save(mysql, {path}))


const getById = R.curry((mysql, {id}) => _model.getById(mysql, id))


const getByIds = R.curry((mysql, {ids}) => Bluebird.map(ids, id => 
  _model.getById(mysql, id)
))


const getByProductId = R.curry((mysql, {product_id}) => {
  const clause = {
    join: `
      LEFT JOIN \`product_image\`
        ON \`product_image\`.\`image_id\` = \`image\`.\`id\`
        AND \`product_image\`.\`deleted\` = 0
    `,
    where: ' AND `product_image`.`product_id` = ?'
  }

  return _model.get(clause, mysql, [product_id])
})


export default {
  save,
  getById,
  getByIds,
  getByProductId
}
