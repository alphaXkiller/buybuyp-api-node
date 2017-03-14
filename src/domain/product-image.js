import R from 'ramda'
import { Model } from 'pimp-my-sql'

const _model = Model({
  table: 'product_image'
})

const save = R.curry((mysql, {product_id, image_id}) =>
  _model.save(mysql, {product_id, image_id})
)


export default {
  save
}
