import R        from 'ramda'
import Path     from 'path'
import Firebase from 'firebase-admin'

import Config from '../config/index.js'
import Product from './product.js'
import Image from './image.js'
import ProductImage from './product-image.js'

Firebase.initializeApp(R.merge(
  Config.firebase,
  { 
    credential: Firebase.credential.cert(Path.resolve(
      __dirname, '../_must_hide/firebase-account-key.json')
    ) 
  }
))

const auth = () => Firebase.auth()


export {
  auth,
  Product,
  Image,
  ProductImage
}
