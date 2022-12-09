import { createRouter, createWebHistory } from 'vue-router'
import type { customRouteRecordRaw } from 'vue-router';
import { RouteRecordName } from './types';

import LayoutVue from '@/layout/index.vue';

export const menuRoute: customRouteRecordRaw = {
  path: '/',
  name: RouteRecordName.Index,
  component: LayoutVue,
  redirect: { name: RouteRecordName.Dashboard },
  children: [
    {
      path: 'dashboard',
      name: RouteRecordName.Dashboard,
      component: () => import('@/views/Dashboard.vue'),
      meta: {
        title: '主页',
        icon: 'dashboard'
      }
    },
    {
      path: 'component',
      name: RouteRecordName.Component,
      redirect: { name: RouteRecordName.TableData },
      meta: {
        title: '组件',
        icon: 'component'
      },
      children: [
        {
          path: 'table-data',
          name: RouteRecordName.TableData,
          component: () => import('@/views/TableData.vue'),
          meta: {
            title: 'CRUD',
            icon: 'table-data'
          }
        }
      ]
    }
  ]
}

const routes: customRouteRecordRaw[] = [
  menuRoute,
  {
    path: '/login',
    name: RouteRecordName.Login,
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: RouteRecordName.Error,
    component: () => import('@/views/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
