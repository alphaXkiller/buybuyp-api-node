import AWS     from 'aws-sdk'
import KoaBody from 'koa-body'
import Fs      from 'fs'
import Path    from 'path'
import Router  from 'koa-router'

import ImageMiddlewareChecker from '../middleware/image.checker.js'
import ImageMiddleware from '../middleware/image.js'

const routes = () => {
  const router = Router()

  router.post('/', 
    KoaBody({multipart: true}),
    ImageMiddlewareChecker.postImage,
    ImageMiddleware.uploadToS3,
    // (ctx, next) => {
    //   ctx.state.image = {
    //     urls : [
    //     'https://s3-us-west-1.amazonaws.com/buybuy-img/de07b0fc-11d2-4b87-9153-5724485777f6',
    //     'https://s3-us-west-1.amazonaws.com/buybuy-img/4ee70dc3-05c6-4a4d-b1f1-52c4693e7717'
    //   ]} 

    //   return next()
    // },
    ImageMiddleware.save
  )

  return router.routes()
}

export default routes
