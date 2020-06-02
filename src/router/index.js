import Vue from "vue";
import Router from 'vue-router';
Vue.use(Router);

export default new Router({
    mode:'hash',
    routes:[
        {
            path:'/',
            redirect:'/clip'
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
        {
            path:'/progress',
            component:()=> import( '@/views/progress.vue')
        },
        {
            path:'/canvans',
            component:()=> import( '@/views/canvans.vue'),
            name:'canvans'
        },
        {
            path:'/clip',
            component:()=> import( '@/views/clip-image.vue'),
            name:'clip'
        }
    ]
})