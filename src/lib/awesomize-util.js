import R from 'ramda'

import { notNil, notEmpty } from './helpers.js'


const SetErrIfInvalid = R.compose(
  R.when(notEmpty,
    obj => {
      const key = Object.keys(obj)[0]
      let err = new Error()

      // TODO: refactor the error to err lib
      err.name = 'VALIDATION ERROR'
      err.message = 'fail to pass validation'
      err.status = 400
      err.validation = {[key]: obj[key]}

      throw err
    }
  ),
  R.pickBy(notNil),
  R.path(['validated'])
)


export {
  SetErrIfInvalid
}
