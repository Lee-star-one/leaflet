import Vue from 'vue'
import Router from 'vue-router'
import Map from '../views/Map'
import Point from '../views/Point'
import ArcgisService from '../views/ArcgisService.vue'



Vue.use(Router)

export default new Router({
    // 注册应用中所有的路由
    routes: [{
            path: '/',
            component: Map
        },
        {
            path: '/Point',
            component: Point
        },
        {
            path: '/ArcgisService',
            component: ArcgisService
        },
    ]
})