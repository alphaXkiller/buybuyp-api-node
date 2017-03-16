import Product from './product.js'
import Image from './image.js'
import ProductImage from './product-image.js'
import User from './user.js'

import Firebase from '../lib/firebase.js'
const Auth = Firebase.Auth

export {
  Auth,
  Image,
  User,
  Product,
  ProductImage
}
