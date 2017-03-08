/**
 * Created by huangpeisong on 2017/3/5.
 */
const user = require('../controllers/user.js');
const router = require('koa-router')();

user.auth(router);

module.exports = router;
