/**
 * Created by huangpeisong on 2017/3/5.
 */
'use strict';
// const crypto = require('crypto');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  'id': {type: Number, default: Date.now, index: {unique: false, dropDups: true}},
  "username": {type: String, index: {unique: true, dropDups: true}},
  "password": {type: String, match: /\w+/, index: true},
  "registerTime": {type: Date, default: Date.now, index: true},
  "loginTime": {type: Date, default: Date.now, index: true}
});

//最后决定前端加密
// //md5加密密码
// User.path('password').set(function (v) {
//   let shasum = crypto.createHash('md5');
//   shasum.update(v);
//   return shasum.digest('hex');
// });

//update time
// User.pre('save', function (next) {
//   this.loginTime = Date.now();
//   next();
// });

const model = mongoose.model('User', User);


let xiaoming = new model({
  'id': 1,
  'username': 'xiaoming',
  'password': '200820e3227815ed1756a6b531e7e0d2'
});
xiaoming.save(function (err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)

  }
});

module.exports = model;
