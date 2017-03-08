/**
 * Created by huangpeisong on 2017/3/7.
 */

const zang = require('../controllers/zang.js');
const router = require('koa-router')();

zang.auth(router);

module.exports = router;

