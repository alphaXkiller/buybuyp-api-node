import R from 'ramda'
import { Model } from '../lib/mysql/index.js'


const TABLE = 'chat_channel'


const _model = Model({
  table: TABLE,
  sql: {
    select: R.join('\n', [
      'SELECT',
      `\`${TABLE}\`.\`id\`                     AS \`id\`,`,
      `\`${TABLE}\`.\`uid\`                    AS \`uid\`,`,
      `\`${TABLE}\`.\`last_message_timestamp\` AS \`last_message_timestamp\``
    ]),

    where: `WHERE \`${TABLE}\`.\`deleted\` = 0`,
    order: `ORDER BY \`${TABLE}\`.\`last_message_timestamp\` DESC`
  }
})


const save = _model.save

const getById = _model.getById

const getAllWithUsersByUserUid = R.curry((mysql, uid) => {
  const clause = {

    select: `
      user.uid           AS \`user.uid\`,
      user.name          AS \`user.name\`,
      user.profile_image AS \`user.profile_image\``,

    join: `
      join chat_channel_user on chat_channel_user.chat_channel_id = chat_channel.id
      join user on user.id = chat_channel_user.user_id`,

    where: `
      AND chat_channel.id IN (
        SELECT chat_channel_id
        FROM chat_channel_user
        JOIN user ON user.id = chat_channel_user.user_id
        WHERE user.uid = ?
      )`
  }

  return _model.get(clause, mysql, [ uid ])
})

export default {
  save,
  getAllWithUsersByUserUid
}
