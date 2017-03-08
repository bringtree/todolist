<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import login from './components/login'

export default {
  name: 'app',
  components:{
  login
  }
}


</script>

<style>
</style>
