<template>
    <v-app>
        <!-- Navigation Bar -->
        <v-app-bar color="primary" prominent>
            <v-toolbar-title>
                Laravel-12, Vue-3, Vuetify-3, VueRouter
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- Navigation Menu Items -->
            <v-btn variant="text" prepend-icon="mdi-view-dashboard" :to="{ name: 'Dashboard' }"
                :active="$route.name === 'Dashboard'">
                Dashboard
            </v-btn>

            <v-btn variant="text" prepend-icon="mdi-information" :to="{ name: 'About' }"
                :active="$route.name === 'About'">
                About
            </v-btn>
        </v-app-bar>

        <!-- Main Content Area -->
        <v-main>
            <v-container fluid class="pa-4">
                <router-view />
            </v-container>
            <vue-progress-bar />
        </v-main>

        <!-- Footer -->
        <v-footer app color="primary" class="text-center">
            <v-container>
                <div class="text-caption">
                    For Shared Hosting
                </div>
            </v-container>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    mounted() {
        console.log('App component mounted.')
    }
}
</script>
