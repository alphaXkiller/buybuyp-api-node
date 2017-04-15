import R from 'ramda'

import { Model } from '../lib/mysql/index.js'
import { notNil } from '../lib/helpers.js'

const _model = Model({
  table: 'product',

  sql: {
    select: R.join('\n', [
      'SELECT',
      '`product`.`id`                  AS `id`,',
      '`product`.`name`                AS `name`,',
      '`product`.`description`         AS `description`,',
      '`product`.`price`               AS `price`,',
      '`product`.`product_category_id` AS `product_category_id`,',
      '`product`.`feature_image_id`    AS `feature_image_id`,',
      '`product`.`uid`                 AS `uid`,',
      '`product`.`address`             AS `address`,',
      '`product`.`created_timestamp`   AS `created_timestamp`,',
      '`product`.`updated_timestamp`   AS `updated_timestamp`,',
      '`product`.`deleted_timestamp`   AS `deleted_timestamp`,',
      '`user`.`id`                     AS `user.id`,',
      '`user`.`uid`                    AS `user.uid`,',
      '`user`.`name`                   AS `user.name`,',
      '`user`.`email`                  AS `user.email`,',
      '`user`.`profile_image`          AS `user.profile_image`,',
      '`product_category`.`id`         AS `product_category.id`,',
      '`product_category`.`name`       AS `product_category.name`'

    ]),
    join: R.join('\n', [
      'JOIN `user` ON `user`.`uid` = `product`.`uid`',
      'JOIN `product_category` ON `product_category`.`id` = `product`.`product_category_id`'
    ]),
    where: 'AND `product`.`deleted` = 0'
  }
})


const save = _model.save


const getById = mysql => ({id}) => _model.getById(mysql, id)


const search = R.curry( (mysql, params) => {
  const map = {
    keyword: () => ({
      normalize: R.compose(R.concat(R.__, '%'), R.concat('%')),
      where: `AND \`product\`.\`name\` LIKE :keyword`
    })
    ,
    cid: () => ({
      where: 'AND `product_category`.`id` = :cid'
    })
    ,
    price_min: () => ({
      where: 'AND `product`.`price` >= :price_min'
    })
    ,
    price_max: () => ({
      where: 'AND `product`.`price` <= :price_max'
    })
    ,
    order_by: value => {
      const str = 'ORDER BY `product`.'
      const order = R.cond([
        [ R.equals('price'), R.always(str.concat('`price` DESC')) ],
        [ R.equals('-price'), R.always(str.concat('`price` ASC')) ],
        [ R.equals('posted'), 
          R.always(str.concat('`created_timestamp` DESC'))
        ],
        [ R.equals('-posted'), 
          R.always(str.concat('`created_timestamp` ASC'))
        ],
        [ R.T,  R.always('')]
      ])(value)

      return { order }
    }
  }

  const _params = R.filter(notNil)(params)

  return _model.search(map, mysql, _params)
})


export default {
  getById,
  save,
  search
}
