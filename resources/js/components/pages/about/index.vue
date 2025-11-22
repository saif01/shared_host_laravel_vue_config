<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">About Component</div>

                    <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>

                    <div class="card-body">
                        I'm an About component.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>