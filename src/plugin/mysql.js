import Bluebird from 'bluebird'
import Mysql from 'mysql2'
import PMysql from 'mysql2/promise'
import Tester from 'mysql'

const pool = PMysql.createPool({
  connectionLimit: 2,
  host: 'life-is-beautiful.ctn77leeq8zt.us-west-2.rds.amazonaws.com',
  user: 'root',
  password: 'Test123Test',
  database: 'lib',
  namedPlaceholders: true,
  Promise: Bluebird
})

const mysqlPlugin = async (ctx, next) => {
  ctx.mysql = await pool.getConnection()
  ctx.mysql.escape = Mysql.escape

  await next()
  ctx.mysql.release() 
}

const test = async (ctx, next) => {
  const _pool = Tester.createPool({
    connectionLimit: 2,
    host: 'life-is-beautiful.ctn77leeq8zt.us-west-2.rds.amazonaws.com',
    user: 'root',
    password: 'Test123Test',
    database: 'lib'
  })

  ctx.mysql = _pool
  await next()
}


export default mysqlPlugin
