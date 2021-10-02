import Vue from 'vue'
import VueRouter from 'vue-router'

import Destaques from './components/Destaques.vue'
import Login from './components/UsuarioLC.vue'
import AdmUsers from './components/AreaAdm/AdmUsers.vue'
import CadFilmes from './components/AreaAdm/CadFilmes.vue'
import Filmes from './components/filmes.vue'
import Produtoras from './components/Produtoras.vue'
import CadProdutoras from './components/AreaAdm/CadProdutoras.vue'
import EditProdutoras from './components/AreaAdm/EditProdutoras.vue'
import CadAval from './components/CadAval.vue'
import Aval from './components/Aval.vue'
import DelComents from './components/AreaAdm/DelComents.vue'
import EditFilmes from './components/AreaAdm/EditFilmes.vue'
import Status from './components/AreaAdm/Status.vue'
 

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Destaques},
    { path: '/login', component: Login},
    { path: '/AdmUsers', component: AdmUsers},
    { path: '/filmes', component: Filmes},
    { path: '/cadfilmes', component: CadFilmes},
    { path: '/editfilmes', component: EditFilmes},
    { path: '/AdmComents', component: DelComents},
    { path: '/produtoras', component: Produtoras},
    { path: '/editprodutoras', component: EditProdutoras},
    { path: '/Cadprodutoras', component: CadProdutoras},
    { path: '/aval', component: Aval},
    { path: '/cadavaliacao', component: CadAval},
    { path: '/status', component: Status},

]

export default new VueRouter({
    routes,
    mode: 'history'
})