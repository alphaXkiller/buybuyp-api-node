import Bluebird from 'bluebird'
import Fs from 'fs'
import R  from 'ramda'
import Uuid from 'uuid/v4'

import { Image } from '../domain/index.js'
import { S3 } from '../lib/service.js'
import { toArrayIfNot } from '../lib/helpers.js'

const readFile   = Bluebird.promisify(Fs.readFile)
const deleteFile = Bluebird.promisify(Fs.unlink)

const uploadToS3 = async (ctx, next) => Bluebird
  .map(ctx.checker.image, (file) => {
    const uuid = Uuid()

    return readFile(file.path)
      .then( data => S3.putObject({
        Key: uuid, Body: data, ContentType: file.type
      }) )

      .then( () => S3.public_path + uuid )
  })

  .tap( () => Bluebird.resolve(ctx.request.body.files)
    .then(R.map(R.compose(
      R.map(R.compose(deleteFile, R.prop('path'))),
      toArrayIfNot)
    )) 
  )

  .then( urls => ctx.state.image = {urls} )

  .then(next)


const save = async (ctx, next) => Bluebird
  .map(ctx.state.image.urls, path => Image.save(ctx.mysql, {path}))

  .then( images => { ctx.body = images } )


export default {
  uploadToS3,
  save
}
