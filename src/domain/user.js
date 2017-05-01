import R from 'ramda'
import { Model } from '../lib/mysql/index.js'

const _model = Model({
  table: 'user',

  sql: {
    select: R.join('\n', [
      'SELECT',
      '`user`.`id`             AS `id`,',
      '`user`.`uid`            AS `uid`,',
      '`user`.`email`          AS `email`,',
      '`user`.`email_verified` AS `email_verified`,',
      '`user`.`profile_image`  AS `profile_image`,',
      '`user`.`name`           AS `name`'
    ])
  }
})


const save = _model.save


const getByUid = R.curry( (mysql, {uid}) => {
  const where = 'AND `user`.`uid` = ?'
  return _model.getWhere(where, mysql, [uid]).then(R.head)
})


const getByUids = R.curry( (mysql, uids) => {
  const where = 'AND `user`.`uid` IN (?)'
  return _model.getWhere(where, mysql, [uids])
})


export default {
  save,
  getByUid,
  getByUids,
}
