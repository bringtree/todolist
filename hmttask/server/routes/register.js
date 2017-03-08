/**
 * Created by huangpeisong on 2017/3/6.
 */
const register = require('../controllers/register.js');
const router = require('koa-router')();

register.auth(router)

module.exports = router;

