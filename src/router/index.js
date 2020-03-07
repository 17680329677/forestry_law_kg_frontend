import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '功能列表', icon: 'dashboard' }
    }]
  },

  {
    path: '/kg_qa',
    component: Layout,
    redirect: '/kg_qa/index',
    children: [
      {
        path: 'index',
        name: 'qa',
        component: () => import('@/views/question_answer/index'),
        meta: { title: '智能问答', icon: 'form' }
      }
    ]
  },

  {
    path: '/kg',
    component: Layout,
    redirect: '/kg/show',
    name: 'KG',
    meta: { title: '图谱展示', icon: 'example' },
    children: [
      {
        path: 'show',
        name: 'Table',
        component: () => import('@/views/knowledge_graph/index'),
        meta: { title: '图谱展示', icon: 'table' }
      }
    ]
  },

  {
    path: '/search',
    component: Layout,
    redirect: '/search/index',
    meta: { title: '法律法规检索', icon: 'nested' },
    children: [
      {
        path: 'index',
        name: 'search',
        component: () => import('@/views/search/index'),
        meta: { title: '全文检索', icon: 'example' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://www.lawiask.com/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
