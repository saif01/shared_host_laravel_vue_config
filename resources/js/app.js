import './bootstrap';
import { createApp } from 'vue';
import router from './routes'


// Vuetify 
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})


// VueProgressBar
import VueProgressBar from "@aacassandra/vue3-progressbar";
const options = {
    color: '#66FE5E',
    failedColor: 'red',
    thickness: "5px",
    transition: {
        speed: "0.2s",
        opacity: "0.6s",
        termination: 300,
    },
    autoRevert: true,
    location: "top", // left, right, top, bottom
    inverse: false,
};

// VueSweetalert2
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
})
window.Swal = Swal;
window.Toast = Toast;



const app = createApp({
    data() {
        return {
            // For Preloader
            preloader: false
        }
    }
});

import IndexComponent from './components/app.vue';
app.component('index-component', IndexComponent);

app.use(router)
app.use(vuetify)
app.use(VueProgressBar, options)
app.use(VueSweetalert2)
app.mount('#app');
