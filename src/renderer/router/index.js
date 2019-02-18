import Vue from 'vue'
import Router from 'vue-router'
import TodoList from '../components/TodoList'
import TodoView from '../components/TodoView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'todolist',
      component: TodoList
    },
    {
      path: '/todoview',
      name: 'todoview',
      component: TodoView
    }
  ]
})
