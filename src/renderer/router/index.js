import Vue from 'vue'
import Router from 'vue-router'
import NodeList from '../components/NodeList'
import EditView from '../components/EditView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'nodelist',
      component: NodeList
    },
    {
      path: '/editview',
      name: 'editview',
      component: EditView
    }
  ]
})
