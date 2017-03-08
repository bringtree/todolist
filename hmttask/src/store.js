/**
 * Created by huangpeisong on 2017/3/8.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var state = {
  name: '',
};

const mutations = {
  UPDATE(state, value){
    state.name = value
  }
};
const getters = {
  name(state){
    return state.name
  }
};


export default new Vuex.Store({
  state,
  mutations,
  getters
})
