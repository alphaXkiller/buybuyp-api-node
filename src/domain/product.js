import R from 'ramda'
import { Model } from '../lib/mysql/index.js'
// import { Model } from 'pimp-my-sql'
const _model = Model({
  table: 'product',

  sql: {
    select: `
      SELECT
        \`product\`.\`id\`                AS \`id\`,
        \`product\`.\`name\`              AS \`name\`,
        \`product\`.\`description\`       AS \`description\`,
        \`product\`.\`price\`             AS \`price\`,
        \`product\`.\`uid\`               AS \`uid\`,
        \`product\`.\`address\`           AS \`address\`,
        \`product\`.\`created_timestamp\` AS \`created_timestamp\`,
        \`product\`.\`updated_timestamp\` AS \`updated_timestamp\`,
        \`product\`.\`deleted_timestamp\` AS \`deleted_timestamp\`,
        \`product\`.\`deleted\`           AS \`deleted\`,

        \`user\`.\`id\`            AS \`user.id\`,
        \`user\`.\`uid\`           AS \`user.uid\`,
        \`user\`.\`name\`          AS \`user.name\`,
        \`user\`.\`email\`         AS \`user.email\`,
        \`user\`.\`profile_image\` AS \`user.profile_image\`
      `
    ,
    join: 'JOIN `user` ON `user`.`uid` = `product`.`uid`',
    where: ' AND `product`.`deleted` = 0'
  }
})


const save = _model.save


const getById = mysql => ({id}) => _model.getById(mysql, id)


const search = R.curry( (mysql, params) => _model.search({}, mysql, {}) )

export default {
  getById,
  save,
  search
}
