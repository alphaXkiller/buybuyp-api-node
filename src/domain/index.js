import ChatContact     from './chat-contact.js'
import Image           from './image.js'
import Product         from './product.js'
import ProductImage    from './product-image.js'
import ProductCategory from './product-category.js'
import User            from './user.js'

import Firebase from '../lib/firebase.js'
const Auth = Firebase.Auth

export {
  Auth,
  ChatContact,
  Image,
  Product,
  ProductImage,
  ProductCategory,
  User
}
