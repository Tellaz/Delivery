import Vue from 'vue'
import VueRouter from 'vue-router'

import ProblemsList from '../views/problems/ProblemsList.vue'
import ProblemsCrud from '../views/problems/ProblemsCrud.vue'
import PartsCrud from '../views/parts/PartsCrud.vue'
import PartsList from '../views/parts/PartsList.vue'
import SpaceShipTypeCrud from '../views/spaceshiptype/SpaceShipTypeCrud.vue'
import SpaceShipTypeList from '../views/spaceshiptype/SpaceShipTypeList.vue'
import CadastrarProduto from '../views/cadastrarproduto/CadastrarProduto.vue'
import ListaDeProduto from '../views/cadastrarproduto/ListaDeProduto.vue'
import ToolsCrud from '../views/tools/ToolsCrud.vue'
import ToolsList from '../views/tools/ToolsList.vue'
import Maintenance from '../views/maintenance/Maintenance.vue'
import MaintenanceSpaceShip from '../views/maintenancespaceship/MaintenanceSpaceShip.vue'
import TelaCliente from '../views/telacliente/TelaCliente.vue'


Vue.use(VueRouter)

const routes = [
 
  {
    path: '/',
    name: 'TelaCliente',
    component: TelaCliente
  },
  {
    path: '/problems',
    name: 'problemsList',
    component: ProblemsList
  },
  {
    path: '/problems/create',
    name: 'problemsCreate',
    component: ProblemsCrud
  },
  {
    path: '/problems/:id/edit',
    name: 'problemsEdit',
    component: ProblemsCrud
  },
  {
    path: '/problems/:id',
    name: 'problemsRead',
    component: ProblemsCrud
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
    path: '/parts/create',
    name: 'partsCreate',
    component: PartsCrud
  },
  {
    path: '/parts/:id/edit',
    name: 'partsEdit',
    component: PartsCrud
  },
  {
    path: '/parts',
    name: 'partsList',
    component: PartsList
  },
  {
    path: '/parts/:id',
    name: 'partsRead',
    component: PartsCrud
  },
  {
    path: '/spaceshiptype/create',
    name: 'spaceshiptypeCreate',
    component: SpaceShipTypeCrud
  },
  {
    path: '/spaceshiptype/:id/edit',
    name: 'spaceshiptypeEdit',
    component: SpaceShipTypeCrud
  },
  {
    path: '/spaceshiptype',
    name: 'spaceshiptypeList',
    component: SpaceShipTypeList
  },
  {
    path: '/spaceshiptype/:id',
    name: 'spaceshiptypeRead',
    component: SpaceShipTypeCrud
  },
  {
    path: '/listaprodutos',
    name: 'listaProdutos',
    component: ListaDeProduto
  },
  {
    path: '/tools/create',
    name: 'toolsCreate',
    component: ToolsCrud
  },
  {
    path: '/tools/:id',
    name: 'toolsRead',
    component: ToolsCrud
  },
  {
    path: '/tools/:id/edit',
    name: 'toolsEdit',
    component: ToolsCrud
  },
  {
    path: '/tools',
    name: 'toolsList',
    component: ToolsList
  },
  {
    path: '/maintenance',
    name: 'maintenance',
    component: Maintenance
  },
  {
    path: '/maintenancespaceship',
    name: 'maintenanceSpaceShip',
    component: MaintenanceSpaceShip
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
