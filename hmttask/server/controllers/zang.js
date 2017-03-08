/**
 * Created by huangpeisong on 2017/3/7.
 */

const todolist = require('../models/todolist.js');
var parse = require('co-body');


const getzang = function *(next) {
  if ('POST' != this.method) return yield next;
  var body = yield parse(this, {limit: '1kb'});
  // var keywords = body.saywords;

  var result = yield todolist.findOne(body).exec()
  var zangNum = result.zang + 1;
  var test = yield todolist.update(body, {'zang': zangNum})
  if (test) {
    this.body = {
      success: true,
      info: 'Good++'
    }
  }
};


module.exports = {
  auth: (router) => {
    router.post('/api/zang', getzang)
  }
}
