/**
 * Created by huangpeisong on 2017/3/6.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const todolist = new Schema({
  'zang': {type: Number, default: 0, index: true},
  "username": {type: String, index: true},
  "saywords": {type: String, index: true},
  "saytime": {type: Date, default: Date.now, index: true},
});


const model = mongoose.model('todolist', todolist);


let firstsay = new model({
  'zang': 0,
  'username': 'xiaoming',
  'saywords': 'woshixiaoming'
});
let secondsay = new model({
  'zang': 0,
  'username': 'xiaohong',
  'saywords': 'woshixiaohong'
});
firstsay.save(function (err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
});
secondsay.save(function (err, data) {
  if (err) {
    console.log(err)
  } else {
    console.log(data)
  }
});


module.exports = model;
