require('./bootstrap');
import Vue from 'vue/dist/vue';
import VueToastr from "vue-toastr";
import App from './App.vue';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import {routes} from './routes';
import VueSweetalert2 from 'vue-sweetalert2/dist/index';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueToastr, {});

const router = new VueRouter({
    mode: 'history',
    routes: routes
});

const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App),
});

new Vue({
    render: h => h(App),
    mounted() {
        this.$toastr.defaultPosition = "toast-top-left";
        // Send message to browser screen
        this.$toastr.s(
            "This Message From Toastr Plugin\n You can access this plugin : <font color='yellow'>this.$toastr</font>"
        );
    }

});
