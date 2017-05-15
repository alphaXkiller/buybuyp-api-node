require('babel-core/register')
import Koa     from 'koa'
import Json    from 'koa-json'
import Kcors   from 'koa-cors'
import Logger  from 'koa-logger'
import Router  from 'koa-router'
import Convert from 'koa-convert'
import Session from 'koa-session'
import KoaBody from 'koa-body'

import Config from './config/index.js'
import Routes from './routes/index.js'

import {
  ValidateAuth,
  MysqlPlugin
} from './plugin/index.js'

const PORT = process.env.PORT || 3031
const app = new Koa()
const router = new Router()

//TODO: use Public Key when release to prod
app.keys = ['im secret']

app.use(KoaBody())
app.use(Logger())
app.use(Convert(Kcors({credentials: true})))
app.use(Convert(Json()))
app.use(Convert(Session(Config.session_config, app)))
app.use(ValidateAuth)
app.use(MysqlPlugin)

router.use('/', Routes.Index())
router.use('/product', Routes.Public.Product())
router.use('/product-category', Routes.Public.ProductCategory())

router.use('/private/user', Routes.User())
router.use('/private/product', Routes.Product())
router.use('/private/image', Routes.Image())
router.use('/private/contact', Routes.Contact())

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT, err => {
  if (err) console.error(err)

  console.info('Server listen to port ' + PORT)
})

