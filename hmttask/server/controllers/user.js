/**
 * Created by huangpeisong on 2017/3/5.
 */
const usermodel = require('../models/user.js');
const todolistmodel = require('../models/todolist.js');

const jwt = require('jsonwebtoken');
var parse = require('co-body');

const getUserInfo = function *() {
  const id = this.params.id;
  const result = yield usermodel.findOne({'id': id}, function (err, resad) {
    return resad;
  });
  this.body = result;
};


const postUserAuth = function *(next) {
  // let data = this.request.body;
  if ('POST' != this.method) return yield next;
  var body = yield parse(this, {limit: '1kb'});
  if (!body.name) this.throw(400, '.name required');
  // this.body = { name: body.name };
  var data = body;


  var userInfo = yield usermodel.findOne({'username': data.name}).exec()

  if (userInfo != null) {
    if (userInfo.password != data.password) {
      this.body = {
        success: false,
        info: '密码错误！'
      }
    } else {
      const userToken = {
        name: userInfo.username,
        id: userInfo.id
      };
      const secret = 'hmt';
      const token = jwt.sign(userToken, secret); // 签发token
      console.log(token);
      this.body = {
        success: true,
        token: token
      }
    }
  } else {
    this.body = {
      success: false,
      info: '用户不存在'
    }
  }
};


module.exports = {
  auth: (router) => {
    router.get('/user/:id', getUserInfo);
    router.post('/user', postUserAuth)
  }
};

