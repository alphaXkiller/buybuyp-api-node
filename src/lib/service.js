import AWS from 'aws-sdk'
import Bluebird from 'bluebird'
import Fs from 'fs'

const Bucket = 'buybuy-img'
const S3_Bucket = new AWS.S3({params: {Bucket}})
const s3PutObject = Bluebird.promisify(S3_Bucket.putObject, {
  context: S3_Bucket
})

const S3 = {
  public_path: 'https://s3-us-west-1.amazonaws.com/buybuy-img/',
  putObject: ({Key, Body, ContentType}) => s3PutObject({Key, Body, ContentType})
}

export {
  S3
}
