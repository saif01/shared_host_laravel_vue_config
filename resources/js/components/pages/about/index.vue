<template>
    <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
            <!-- About Card -->
            <v-card elevation="2" class="mb-4">
                <v-card-title class="text-h5 bg-primary text-white">
                    <v-icon start icon="mdi-information"></v-icon>
                    About Component
                </v-card-title>

                <v-card-text class="pa-6">
                    <v-row>
                        <v-col cols="12">
                            <p class="text-body-1 mb-4">
                                Welcome to the About page! This is a Vue 3 component integrated with Vuetify 3
                                and Vue Router, designed for Laravel 12 applications.
                            </p>

                            <v-divider class="my-4"></v-divider>

                            <!-- Technology Stack -->
                            <v-card variant="outlined" class="mb-4">
                                <v-card-title class="text-h6 bg-grey-lighten-4">
                                    <v-icon start icon="mdi-tech-stack"></v-icon>
                                    Technology Stack
                                </v-card-title>
                                <v-card-text>
                                    <v-list density="comfortable">
                                        <v-list-item>
                                            <template v-slot:prepend>
                                                <v-icon color="success">mdi-check-circle</v-icon>
                                            </template>
                                            <v-list-item-title>Laravel 12</v-list-item-title>
                                            <v-list-item-subtitle>Backend Framework</v-list-item-subtitle>
                                        </v-list-item>
                                        <v-list-item>
                                            <template v-slot:prepend>
                                                <v-icon color="success">mdi-check-circle</v-icon>
                                            </template>
                                            <v-list-item-title>Vue 3</v-list-item-title>
                                            <v-list-item-subtitle>Frontend Framework</v-list-item-subtitle>
                                        </v-list-item>
                                        <v-list-item>
                                            <template v-slot:prepend>
                                                <v-icon color="success">mdi-check-circle</v-icon>
                                            </template>
                                            <v-list-item-title>Vuetify 3</v-list-item-title>
                                            <v-list-item-subtitle>Material Design Components</v-list-item-subtitle>
                                        </v-list-item>
                                        <v-list-item>
                                            <template v-slot:prepend>
                                                <v-icon color="success">mdi-check-circle</v-icon>
                                            </template>
                                            <v-list-item-title>Vue Router 4</v-list-item-title>
                                            <v-list-item-subtitle>Client-side Routing</v-list-item-subtitle>
                                        </v-list-item>
                                    </v-list>
                                </v-card-text>
                            </v-card>

                            <!-- Features -->
                            <v-card variant="outlined">
                                <v-card-title class="text-h6 bg-grey-lighten-4">
                                    <v-icon start icon="mdi-star-circle"></v-icon>
                                    Features
                                </v-card-title>
                                <v-card-text>
                                    <v-chip-group>
                                        <v-chip color="primary" variant="flat">Shared Hosting Compatible</v-chip>
                                        <v-chip color="secondary" variant="flat">Material Design</v-chip>
                                        <v-chip color="success" variant="flat">Progress Bar</v-chip>
                                        <v-chip color="info" variant="flat">SweetAlert2</v-chip>
                                        <v-chip color="warning" variant="flat">Vite Build</v-chip>
                                    </v-chip-group>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <!-- Navigation Card -->
            <v-card elevation="2">
                <v-card-title class="text-h6">
                    <v-icon start icon="mdi-navigation"></v-icon>
                    Navigation
                </v-card-title>
                <v-card-text>
                    <v-btn color="primary" variant="elevated" prepend-icon="mdi-view-dashboard"
                        :to="{ name: 'Dashboard' }" size="large">
                        Go to Dashboard
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'AboutPage',
    mounted() {
        // Example: Update progress bar when component loads
        if (this.$Progress) {
            this.$Progress.start();
            setTimeout(() => {
                this.$Progress.finish();
            }, 200);
        }
    }
}
</script>