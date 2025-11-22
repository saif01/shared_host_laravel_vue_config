<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Dashboard Component</div>

                    <router-link :to="{ name: 'About' }">About</router-link>

                    <v-container>
                        <v-btn size="x-large" color="success" class="mr-2" @click="result++" icon="mdi-plus-box">

                        </v-btn>
                        <v-btn size="x-large" color="success" class="float-right" @click="result--"
                            icon="mdi-minus-box"></v-btn>
                        <br />

                        <div class="row h1 justify-content-center">{{ result }}</div>
                    </v-container>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            result: 0,
        }
    },

    created() {
        this.$Progress.start();

        this.$Progress.finish();
    }

}


</script>