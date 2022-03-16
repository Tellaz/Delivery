import Vue from 'vue'
import VueRouter from 'vue-router'


import CadastrarProduto from '../views/cadastrarproduto/CadastrarProduto.vue'
import ListaDeProduto from '../views/cadastrarproduto/ListaDeProduto.vue'

import TelaCliente from '../views/telacliente/TelaCliente.vue'
import Relatorio from '../views/report/Report.vue'


Vue.use(VueRouter)

const routes = [
 
  {
    path: '/',
    name: 'TelaCliente',
    component: TelaCliente
  },
  
  {
    path: '/cadastrarproduto',
    name: 'produtoCreate',
    component: CadastrarProduto
  },
  {
    path: '/produto/:id/edit',
    name: 'produtoEdit',
    component: CadastrarProduto
  },
 
  {
    path: '/listaprodutos',
    name: 'listaProdutos',
    component: ListaDeProduto
  },
  {
    path: '/relatorio',
    name: 'relatorio',
    component: Relatorio
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
