import R from 'ramda'
import { Model } from '../lib/mysql/index.js'

const _model = Model({
  table: 'product_image'
})

const save = _model.save


export default {
  save
}
