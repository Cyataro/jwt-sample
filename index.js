'use struct'

const jwt = require('jsonwebtoken')
const jose = require('jose')
const {
  JWE,   // JSON Web Encryption (JWE)
  JWK,   // JSON Web Key (JWK)
  JWKS,  // JSON Web Key Set (JWKS)
  JWS,   // JSON Web Signature (JWS)
  JWT,   // JSON Web Token (JWT)
  errors // errors utilized by jose
} = jose

const crypto = require("crypto")
const fs = require('fs')

const algorithm = 'aes-256-ctr'
const passowrd = 'passw0rd'

const privatekey = fs.readFileSync('private-key.pem')
const publickkey = fs.readFileSync('public-key.pem')

const userData = {id: 'sampleid', email: 'hoge@hoge.com'}

// 暗号化
var cipher = crypto.createCipher('aes256', passowrd);
var cipheredText = cipher.update(JSON.stringify(userData), 'utf8', 'hex');
cipheredText += cipher.final('hex');

// function crypter (data) {
//   const cipher = crypto.createCipher(algorithm, passowrd)
//   let c = cipher.update(data, "utf8", 'hex')
//   c += cipher.final('hex')
//   return c
// }

// function decoder (data) {
//   const decipher = crypto.createDecipher(algorithm, passowrd);
//   let dec = decipher.update(data, 'hex', 'utf8');
//   dec += decipher.final('utf8');
//   return dec
// }

// const data = crypter(JSON.stringify({id: 'sampleid', email: 'hoge@hoge.com'}))
// // const data = {id: 'sampleid', email: 'hoge@hoge.com'}

// const token = jwt.sign(data, privatekey, { algorithm: 'RS256', mutatePayload: true})

// console.log(token)

// const jwtDecoded = jwt.verify(token, publickkey, { algorithms: ['RS256'] })

// console.log(jwtDecoded)

// const dData = JSON.parse(decoder(jwtDecoded))
// // const dData = jwtDecoded

// console.log(dData)
const makeKey = pem => jose.JWK.asKey(pem, {kid: 'test'})
const publicKey = makeKey(publickkey)
const privateKey = makeKey(privatekey)
console.log(privateKey)

const token = jose.JWT.sign(
  {data: cipheredText},
  privateKey,
  {
    algorithm: 'RS256',
    header: {
      typ: 'JWT'
    }})

console.log(token)

const jwtDecoded = jose.JWT.verify(token, publicKey, { algorithms: ['RS256'] })
console.log(jwtDecoded)
console.log(jwtDecoded.data)

var decrypt = crypto.createDecipher('aes256', passowrd);
decrypt.setAutoPadding(false);
// var s = decrypt.update(jwtDecoded.data, 'hex', 'utf8');
var data = decrypt.update(jwtDecoded.data, 'hex', 'utf8')
data += decrypt.final('utf8');
console.log(data)
