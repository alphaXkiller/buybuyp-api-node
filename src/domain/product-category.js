import R from 'ramda'
import { Model } from '../lib/mysql/index.js'

const _model = Model({
  table: 'product_category',
  sql: {
    order: 'ORDER BY `product_category`.`name` ASC'
  }
})


const save = _model.save


const getAll = R.curry( mysql => _model.get({}, mysql, {}) )


export default {
  save,
  getAll
}
