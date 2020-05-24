import Vue from "vue";
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
    mode:'history',
    routes:[
        {
            path:'/',
            redirect:'/player'
        },
        {
            path:'/picker-demo',
            component:()=> import( '@/views/picker-demo.vue')
        },
        {
            path:'/button',
            component:()=> import( '@/views/button.vue')
        },
        {
            path:'/player',
            component:()=> import( '@/views/player.vue')
        },
    ]
})