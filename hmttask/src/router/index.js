import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import todolist from '../components/todolist'
import register from '../components/register';
Vue.use(Router)

var vueRouter = new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/login',
      component: login
    },
    {
      path: '/todolist',
      component: todolist
    },
    {
      path: '/register',
      component: register
    }
  ]
});


vueRouter.beforeEach((to,from,next) =>{
  const token = sessionStorage.getItem('demo-token');
  if(to.path == '/'||to.path=='/register'){ // 如果是跳转到登录页的
    if(token != 'null' && token != null){
      next('/todolist'); // 如果有token就转向todolist不返回登录页
    }
    next(); // 否则跳转回登录页
  }else{
    if(token != 'null' && token != null){
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token; // 注意Bearer后有个空格
      next(); // 如果有token就正常转向
    }else{
      next('/'); // 否则跳转回登录页
    }
  }
});


export default  vueRouter
