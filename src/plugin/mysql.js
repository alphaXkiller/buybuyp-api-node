import Mysql from 'mysql'

const connection = () => Mysql.createPool({
  connectionLimit: 10,
  host: 'life-is-beautiful.ctn77leeq8zt.us-west-2.rds.amazonaws.com',
  user: 'root',
  password: 'Test123Test',
  database: 'lib'
})

const mysqlPlugin = async (ctx, next) => {
  ctx.mysql = await connection()
  await next()
}

export default mysqlPlugin
