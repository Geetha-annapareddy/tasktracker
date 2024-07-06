// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import SigninForm from '../components/SigninForm.vue';
import SignupForm from '../components/SignupForm.vue';
import TaskList from '../components/Tasks/TaskList.vue';

const routes = [
  { path: '/signin', name: 'SigninForm', component: SigninForm },
  { path: '/signup', name: 'SignupForm', component: SignupForm },
  { path: '/tasks', name: 'TaskList', component: TaskList }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
