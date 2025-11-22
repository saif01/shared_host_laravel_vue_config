import {
    createRouter,
    createWebHistory
} from 'vue-router'


// All Routs define
const routes = [

    {
        path: '',
        component: () => import('./components/pages/dashboard.vue'),
        name: 'Dashboard',
        meta: {
            title: 'Dashboard',
        },
    },

    {
        path: '/about',
        component: () => import('./components/pages/about/index.vue'),
        name: 'About',
        meta: {
            title: 'About',
        },
    },














    {
        path: '/:pathMatch(.*)*',
        component: () => import('./components/pages/dashboard.vue'),
        name: 'Error',
        meta: {
            title: 'Error',
        },
    }



];

const router = createRouter({
    history: createWebHistory(),
    //history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});


// Run brfore every route request
router.beforeEach((to, from, next) => {

    let appName = 'CPB-IT Test';
    let title = to.meta && to.meta.title ? to.meta.title : '';
    // set current title
    document.title = `${appName} ${title}`;

    next();
});



export default router;
