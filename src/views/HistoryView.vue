<script setup>
import OrderLog from '../components/OrderLog.vue';
import { useClientStore } from '@/stores/client'
import { ref, onMounted } from 'vue';
import axios from 'axios';
import PageHeader from '../components/PageHeader.vue';
import PageFooter from '../components/PageFooter.vue';
const storeClient = useClientStore()

const isDataFetched = ref(false)
const pastOrderList = ref(null)
const errorMsg = ref(null)

onMounted(async () => {
    let result = []
    await axios
        .post("http://localhost:8000/api/history", {
            userToken: storeClient.userToken
        })
        .then(response => {
            result = response.data
            if (result.success) {
                pastOrderList.value = result.infos
                isDataFetched.value = true
                errorMsg.value = null
            } else {
                pastOrderList.value = null
                isDataFetched.value = true
                errorMsg.value = result.error
            }
        });
})

</script>


<template>
    <PageHeader />
    <main class="wrapper">
        <section class="content">
            <main class="content__log-orders">
                <article v-if="isDataFetched" v-for="order in pastOrderList ">
                    <OrderLog :order="order" />
                </article>
            </main>
        </section>
    </main>
    <PageFooter />
</template>


<style lang="scss" scoped>
@use "../src/scss/abstract/" as *;
@use "../src/scss/elements/" as *;

main.wrapper {
    margin-top: $headerHeight;
    margin-bottom: $footerHeight;
    padding-bottom: 20px;
    height: 100vh;
    background-color: $background-secondary;

    .content {
        margin-top: 185px;
        min-height: 100%;
        padding: 20px $paddingX-page;
        background-color: $background-secondary;

        &__warning {
            font-size: $font-medium;
        }

        &__log-orders {
            width: 100%;
            height: fit-content;
            padding-bottom: $footerHeight;
            display: flex;
            flex-direction: column-reverse;
            gap: 20px;
        }
    }
}
</style>