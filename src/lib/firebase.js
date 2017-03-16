import R from 'ramda'
import Path from 'path'
import Firebase from 'firebase-admin'
import Config from '../config/index.js'

Firebase.initializeApp(R.merge(
  Config.firebase,
  {
    credential: Firebase.credential.cert(Path.resolve(
      __dirname, '../_must_hide/firebase-account-key.json'
    ))
  }
))

const Auth = () => Firebase.auth()

export default {
  Auth
}
