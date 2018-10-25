import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home.vue'),
            redirect:'task',
            children:[
                {
                    path: 'help',
                    name: 'help',
                    component: () => import('./views/Help.vue')
                },
                {
                    path: 'task',
                    name: 'task',
                    component: () => import('./views/Task.vue')
                },
                {
                    path: 'taskAdd',
                    name: 'taskAdd',
                    component: () => import('./views/TaskInput.vue')
                },
                {
                    path: 'taskView',
                    name: 'taskView',
                    component: () => import('./views/TaskView.vue')
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue')
        }

    ]
})
