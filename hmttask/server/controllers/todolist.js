/**
 * Created by huangpeisong on 2017/3/6.
 */
const todolist = require('../models/todolist.js');
var parse = require('co-body');


const postsayingWords = function *(next) {
  if ('POST' != this.method) return yield next;
  var body = yield parse(this, {limit: '1kb'});

  var saytime = body.saytime;
  var username = body.username;
  var saywords = body.saywords;
  var zang = body.zang;
  var insertInformation = new todolist({
    'saytime': saytime,
    'username': username,
    'saywords': saywords,
    'zang': zang
  });

  insertInformation.save(function (err, data) {
    if (err) {
      this.body = {
        success: false,
        info: '发送失败！'
      };
      console.log(err)
    } else {
      this.body = {
        success: true,
        info: '发送成功！'
      };
    }
  });

};


const getAllTodolist = function *() {
  let page = this.query.page || 1;
  let limit = 1000;
  let skip = (page - 1) * limit;
  this.body = yield todolist.find().skip(skip).limit(limit);
};


module.exports = {
  getAllTodolist: getAllTodolist,
  auth: (router) => {
    router.post('/api/sayingWords', postsayingWords)
  }
};
