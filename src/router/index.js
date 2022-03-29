import Vue from 'vue'
import VueRouter from 'vue-router'
// import DefaultService from "../../services/defaultService";
import Authentication from './beforeEach'
import CadastrarProduto from '../views/cadastrarproduto/CadastrarProduto.vue'
import ListaDeProduto from '../views/cadastrarproduto/ListaDeProduto.vue'

import TelaCliente from '../views/telacliente/TelaCliente.vue'
import Relatorio from '../views/report/Report.vue'
import Login from '../views/login/Login.vue'
import Perfil from '../views/login/Perfil.vue'
import Cadastro from '../views/login/Cadastro.vue'


Vue.use(VueRouter)

const routes = [
 
  {
    path: '*',
    redirect: '/login'
  },

  {
    path: '/',
    name: 'TelaCliente',
    component: TelaCliente
  },
 
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/cadastro',
    name: 'Cadastro',
    component: Cadastro,
    meta: {
			authenticated: true,
		}
  },

  {
    path: '/email/:id/edit',
    name: 'emailEdit',
    component: Cadastro,
    meta: {
			authenticated: true,
		}
  },

  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: {
			authenticated: true,
		}
  },
  
  {
    path: '/cadastrarproduto',
    name: 'produtoCreate',
    component: CadastrarProduto,
    meta: {
			authenticated: true,
		}
  },
  {
    path: '/produto/:id/edit',
    name: 'produtoEdit',
    component: CadastrarProduto,
    meta: {
			authenticated: true,
		}
  },
 
  {
    path: '/listaprodutos',
    name: 'listaProdutos',
    component: ListaDeProduto,
    meta: {
			authenticated: true,
		}
  },
  {
    path: '/relatorio',
    name: 'relatorio',
    component: Relatorio,
    meta: {
			authenticated: true,
		}
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach( Authentication );
// var defaultService = new DefaultService(this.$http, 'api/usuario')
  
// var defaultService = 'api/usuario'
// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if (defaultService.getAll() == null) {
//         next({
//             path: '/login',
//             params: { nextUrl: to.fullPath }
//         })
//     } else {
//         next()
//     }
// } 
// })


export default router

