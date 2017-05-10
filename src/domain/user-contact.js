import R         from 'ramda'

import { Model } from '../lib/mysql/index.js'
import { notNil } from '../lib/helpers.js'


const _model = Model({
  table: 'user_contact',

  sql: {
    select: R.join('\n', [
      'SELECT',
      '`user_contact`.`id`             AS `id`,',
      '`user_contact`.`user_uid`       AS `user_uid`,',
      '`user_contact`.`contact_uid`    AS `contact_uid`,',
      '`user_contact`.`unread_message` AS `unread_message`'
    ])
    ,
    where: 'WHERE `user_contact`.`deleted` = 0'
  }
})


const save = _model.save


const search = R.curry( (mysql, params) => {
  const map = {
    user_uid: () => ({
      where: 'AND `user_contact`.`user_uid` = :user_uid'
    })
  }

  const _params = R.filter(notNil)(params)

  return _model.search(map, mysql, _params)
})

export default {
  save,
  search
}
