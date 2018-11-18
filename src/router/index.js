import Vue from 'vue'
import Router from 'vue-router'
import Constructor from '../components/Constructor'
import Schematics from '../components/Schematics'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Constructor
    },
    {
      path: '/schematics',
      component: Schematics
    }
  ]
})
