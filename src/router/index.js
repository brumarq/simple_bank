
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Accounts from '../views/Accounts.vue'
import Employees from '../views/Employees.vue'
import Customers from '../views/Customers.vue'
import Transactions from '../views/Transactions.vue'

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/employees',
    name: 'Employees',
    component: Employees
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: Accounts
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
