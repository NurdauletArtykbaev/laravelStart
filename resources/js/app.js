/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

// import ExampleComponent from './components/ExampleComponent.vue'
require('./bootstrap');
window.Vue = require('vue');
import Gate from "./Gate";
import moment from 'moment';
import {Form, HasError, AlertError} from 'vform'
import VueProgressBar from 'vue-progressbar'
import swal from 'sweetalert2'

//Gate доступ через ссылка
Vue.prototype.$gate = new Gate(window.user);
//Passport

window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
Vue.component('not-found', require('./components/NotFound.vue').default);

Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);
Vue.component('pagination', require('laravel-vue-pagination')).default;


Vue.filter('UpText', function(text){
    return text.charAt(0).toUpperCase() + text.slice(1)
});

Vue.filter('myDate', function (created) {

    return moment(created).format('YY-MM-DD')
});

// Events
window.eventHub  = new Vue();

const options = {
    color: '#bffaf3',
    failedColor: 'red',
    thickness: '5px',
    height: '3px',
};
// типа Loader
Vue.use(VueProgressBar, options);

window.swal = swal;

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
});
window.toast = toast;


import VueRouter from 'vue-router'
Vue.use(VueRouter);

let routes = [
    { path: '/dashboard', component: require('./components/Dashoard.vue').default },
    { path: '/developer', component: require('./components/Developer').default },
    { path: '/profile', component: require('./components/Profile.vue').default },
    { path: '/users', component: require('./components/Users.vue').default },
    { path: '/power', component: require('./components/Power.vue').default },
    { path: '/*', component: require('./components/NotFound.vue').default }
];
const router = new VueRouter({
    mode: 'history',
    routes // сокращённая запись для `routes: routes`
});
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
Vue.component('example-component', require('./components/ExampleComponent.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    router,
    data:{
        search:''
    },
    methods:{
        searchit: _.debounce(()=>{
            eventHub.$emit('searching');
        }, 1000),
        //     (){
        //     eventHub.$emit('searching');
        // }
        printme(){
            window.print();
        }
    }
});
