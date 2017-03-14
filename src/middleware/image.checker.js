import Awesomize from 'awesomize'
import Bluebird from 'bluebird'
import Fs from 'fs'
import R from 'ramda'
import V from 'validator'

import { SetErrIfInvalid } from '../lib/awesomize-util.js'
import { toArrayIfNot } from '../lib/helpers.js'

const deleteFile = Bluebird.promisify(Fs.unlink)

const postImage = async (ctx, next) => {
  const image = R.compose(
    toArrayIfNot,
    R.path(['request', 'body', 'files', 'image'])
  )(ctx)

  await Awesomize({}, (v) => ({
    image: {
      validate: [ v.required, R.reduce(
        (acc, file) => {
          if (!R.test(/^image\/*/)(file.type)) {
            return 'invalid file type'
          }
        },
        null
      ) ]
    }
  }))({image})

  .then(SetErrIfInvalid)

  .then(() => {
    ctx.checker = { image }
    return next()
  })

  .catch( err => Bluebird.resolve(ctx.request.body.files)

    .then(R.map(R.compose(
      R.map(R.compose(deleteFile, R.prop('path'))),
      toArrayIfNot)
    ))
    
    .then( () => {
      if (err.status === 400) {
        ctx.status = err.status
        ctx.body = {
          error_message: err.message,
          validation_error: err.validation
        }
      } else next(err) 
    })
  )
}


export default {
  postImage
}
