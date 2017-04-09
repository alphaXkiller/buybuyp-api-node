import R from 'ramda'
import { Model } from '../lib/mysql/index.js'


const _model = Model({
  table: 'chat_contact',
  sql: {
    select: R.join('\n', [
      'SELECT',
      '`chat_contact`.`id`                     AS `id`,',
      '`chat_contact`.`user_id_1`              AS `user_id_1`,',
      '`chat_contact`.`user_id_1`              AS `user_id_1`,',
      '`chat_contact`.`last_contact_timestamp` AS `last_contact_timestamp`'
    ]),
    where: 'WHERE `chat_contact`.`deleted` = 0',
    order: 'ORDER BY `chat_contact`.`last_contact_timestamp` DESC'
  }
})


const save = _model.save

const getById = _model.getById

const getByUserId = R.curry((mysql, user_id) => {
  const where = R.join('\n', [
    'AND (`chat_contact`.`user_id_1` = ?',
    'OR `chat_contact`.`user_id_2` = ?)',
  ])
  return _model.getWhere(where, mysql, [user_id, user_id])
})


export default {
  save,
  getById
  getByUserId,
}
