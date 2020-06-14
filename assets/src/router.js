import Main from './views/main.vue';

const routers = [
    {
        path: '/',
        redirect: '/booksManagement' ,
        component: Main,
        children: [
            { path: 'booksManagement', title: {i18n: 'booksManagement'}, name: 'booksManagement', component: resolve => { require(['./views/books/list.vue'], resolve); } },
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login - 登录' 
        },
        component: resolve => { require(['./views/login/login.vue'], resolve); }
    },
];
export default routers;
