<template>
    <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
            <!-- Dashboard Card -->
            <v-card class="mb-4" elevation="2">
                <v-card-title class="text-h5 bg-primary text-white">
                    <v-icon start icon="mdi-view-dashboard"></v-icon>
                    Dashboard
                </v-card-title>

                <v-card-text class="pa-6">
                    <!-- Counter Display -->
                    <v-row justify="center" class="mb-4">
                        <v-col cols="12" class="text-center">
                            <div class="text-h1 font-weight-bold" :class="result >= 0 ? 'text-success' : 'text-error'">
                                {{ result }}
                            </div>
                            <v-chip class="mt-2" :color="result >= 0 ? 'success' : 'error'" variant="flat">
                                {{ result >= 0 ? 'Positive' : 'Negative' }}
                            </v-chip>
                        </v-col>
                    </v-row>

                    <!-- Action Buttons -->
                    <v-row justify="center" class="mt-6">
                        <v-col cols="12" class="d-flex justify-center gap-3">
                            <v-btn size="x-large" color="success" variant="elevated" icon="mdi-plus-box"
                                @click="increment" :disabled="result >= 100">
                                <v-icon>mdi-plus</v-icon>
                                <v-tooltip activator="parent" location="top">Increment</v-tooltip>
                            </v-btn>

                            <v-btn size="x-large" color="error" variant="elevated" icon="mdi-minus-box"
                                @click="decrement" :disabled="result <= -100">
                                <v-icon>mdi-minus</v-icon>
                                <v-tooltip activator="parent" location="top">Decrement</v-tooltip>
                            </v-btn>

                            <v-btn size="x-large" color="warning" variant="elevated" icon="mdi-refresh" @click="reset">
                                <v-icon>mdi-refresh</v-icon>
                                <v-tooltip activator="parent" location="top">Reset</v-tooltip>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <!-- Quick Actions Card -->
            <v-card elevation="2">
                <v-card-title class="text-h6">
                    <v-icon start icon="mdi-link-variant"></v-icon>
                    Quick Links
                </v-card-title>
                <v-card-text>
                    <v-btn color="primary" variant="outlined" prepend-icon="mdi-information" :to="{ name: 'About' }">
                        Go to About Page
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data() {
        return {
            result: 0,
        }
    },

    methods: {
        increment() {
            this.result++;
            this.showToast('Incremented!', 'success');
        },
        decrement() {
            this.result--;
            this.showToast('Decremented!', 'info');
        },
        reset() {
            this.result = 0;
            this.showToast('Counter reset!', 'warning');
        },
        showToast(message, type = 'success') {
            if (window.Toast) {
                window.Toast.fire({
                    icon: type,
                    title: message
                });
            }
        }
    },

    created() {
        this.$Progress.start();
        this.$Progress.finish();
    }
}
</script>

<style scoped>
.gap-3 {
    gap: 12px;
}
</style>