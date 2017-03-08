/**
 * Created by huangpeisong on 2017/3/6.
 */
const usermodel = require('../models/user.js');
const jwt = require('jsonwebtoken');
var parse = require('co-body');


const postregisterUser = function *(next) {
  // let data = this.request.body;
  if ('POST' != this.method) return yield next;
  var body = yield parse(this, {limit: '1kb'});
  // this.body = { name: body.name };
  var data = body;
  // var username = body.name;
  const result = yield usermodel.findOne({'username': body.name}).exec()

  if (result != null) {
    this.body = {
      success: false,
      info: '用户名已经被注册过了！'
    };
    console.log("用户名已经被注册过了")
  }
  else {
    this.body = {
      success: true,
      info: '注册成功！'
    };
    var username = body.name;
    var password = body.pass;
    var insertId = new usermodel({
      'username': username,
      'password': password
    });
    insertId.save(function (err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log(data)
      }
    });


    console.log(body)
  }

};


module.exports = {
  auth: (router) => {
    router.post('/register', postregisterUser)

  }
};
