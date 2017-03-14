//TODO: publish an ramda helpers module on NPM
//
import R from 'ramda'

const notNil = R.complement(R.isNil)

const notEmpty = R.complement(R.isEmpty)

const toArrayIfNot = R.when(
  R.both(R.complement(R.is(Array)), notNil),
  R.of
)

export {
  notNil,
  notEmpty,
  toArrayIfNot
}
