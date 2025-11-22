<template>
    <v-app>
        <p class="h3 text-center">Laravel-12, Vue-3, Vuetify-3, VueRouter & Others Fresh Project</p>
        <v-main class="ma-2">
            <router-view />
            <vue-progress-bar />
        </v-main>
    </v-app>
</template>

<script>
export default {
    mounted() {
        console.log('Component mounted.')
    }
}
</script>
