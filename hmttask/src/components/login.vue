<template>
  <div>
    <el-input v-model="username" placeholder="请输入账号"></el-input>
    <el-input v-model="password" placeholder="请输入密码" @click.enter.native='login'></el-input>
    <el-button type="primary" @click='login'>登陆</el-button>
    <el-button type="danger" @click='register'>注册</el-button>
  </div>

</template>

<script type="text/ecmascript-6">
  import md5 from 'md5'
  import {mapGetters, mapActions} from 'vuex'
  // import axios from 'axios'
  // import store from'../store'

  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login: function () {
        let userinfo = {
          name: this.username,
          password: md5(this.password)
        };
        this.$store.commit('UPDATE', {name:this.username});
        this.$http.post('/auth/user', userinfo) // 将信息发送给后端
          .then((res) => {
            console.log(res);
            if (res.data.success) { // 如果成功
              sessionStorage.setItem('demo-token', res.data.token); // 用sessionStorage把token存下来
              this.$message({ // 登录成功，显示提示语
                type: 'success',
                message: '登录成功！'
              });
              this.$router.push('/todolist'); // 进入todolist页面，登录成功
            } else {
              this.$message.error(res.data.info); // 登录失败，显示提示语
              sessionStorage.setItem('demo-token', null); // 将token清空
            }
          }, (err) => {
            this.$message.error('请求错误！');
            sessionStorage.setItem('demo-token', null); // 将token清空
          })
      },
      register: function () {
        window.location.href = 'register';
      }
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
