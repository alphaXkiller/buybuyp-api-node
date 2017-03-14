import { Model } from 'pimp-my-sql'

const _model = Model({
  table: 'product',

  sql: {
    select: `
      SELECT
        \`product\`.\`id\`                AS \`id\`,
        \`product\`.\`name\`              AS \`name\`,
        \`product\`.\`description\`       AS \`description\`,
        \`product\`.\`price\`             AS \`price\`,
        \`product\`.\`user_id\`           AS \`user_id\`,
        \`product\`.\`address\`           AS \`address\`,
        \`product\`.\`created_timestamp\` AS \`created_timestamp\`,
        \`product\`.\`updated_timestamp\` AS \`updated_timestamp\`,
        \`product\`.\`deleted_timestamp\` AS \`deleted_timestamp\`,
        \`product\`.\`deleted\`           AS \`deleted\`
      `
  }
})


const save = _model.save


const getById = mysql => ({id}) => _model.getById(mysql, id)


export default {
  getById,
  save
}
