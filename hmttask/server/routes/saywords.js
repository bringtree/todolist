/**
 * Created by huangpeisong on 2017/3/7.
 */
const todolist = require('../controllers/todolist.js');
const router = require('koa-router')();

todolist.auth(router);

module.exports = router;

