const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

const pbkdf2SyncOptions = {
  iterations: 100000,
  keyLength: 64,
  digest: 'sha512'
};

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, pbkdf2SyncOptions.iterations, pbkdf2SyncOptions.keyLength, pbkdf2SyncOptions.digest);
};

userSchema.methods.validPassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, pbkdf2SyncOptions.iterations, pbkdf2SyncOptions.keyLength, pbkdf2SyncOptions.digest);
  return hash === this.hash;
};

userSchema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000)
  }, process.env.JWT_SECRET);
};

mongoose.model('User', userSchema);
