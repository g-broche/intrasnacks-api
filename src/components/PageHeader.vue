<script setup>
import { ref, computed } from 'vue';
import { useClientStore } from '@/stores/client'
import { useRouter } from 'vue-router';

const storeClient = useClientStore()
const router = useRouter()
const emits = defineEmits(['updatedQuery']);

const query = defineProps(['query'])
const inputedQuery = ref(null)


const updatedQuery = () => {
    const updatedData = { query: inputedQuery.value };
    emits('updatedQuery', updatedData);
}


function logout() {
    storeClient.unsetUser()
    router.push({ name: 'login' })
}

const isHome = computed(() => {
    return router.currentRoute.value.name === 'home'
})
const pageTitle = computed(() => {
    let title = ""
    switch (router.currentRoute.value.name) {
        case 'login':
            title = "Connection"
            break;
        case 'home':
            title = "Catalogue produits"
            break;
        case 'history':
            title = "Historique des achats"
            break;
        default:
            title = ""
    }
    return title
})
</script>

<template>
    <header>
        <section class="banner">
            <a href="/">
                <div class="container-logo">
                    <img src="../../img/logo.webp" alt="intrasnacks-logo">
                </div>
            </a>

            <section v-if="storeClient.isUserLogged" class="user-infos">

                <p id="user-name">{{ storeClient.fullName }}</p>
                <p id="user-solde">Solde : {{ storeClient.currentSolde }} Crédits</p>
            </section>
            <a v-if="storeClient.isUserLogged" href="/logoff">
                <div class="container-logout" @click="logout()">
                    <img src="../../img/logout.webp" alt="logout-button">
                </div>
            </a>
        </section>
        <section class="content-header">
            <div v-if="isHome && storeClient.isUserLogged" class="form-search" action="/searchProducts" method="get">
                <input v-model="inputedQuery" class="form-search__field inputField" type="search" id="searchField"
                    name="query" placeholder="Rechercher">
                <button class="form-search__submit"><img src="../../img/magnifier.svg" alt=""
                        @click="updatedQuery()"></button>
            </div>
            <h1 class="title">{{ pageTitle }}</h1>
        </section>


    </header>
</template>

<style lang="scss" scoped>
@use "../src/scss/abstract/" as *;

header {
    position: fixed;
    z-index: 1;
    top: 0;
    width: 100%;

    .banner {
        height: $bannerHeight;
        width: 100%;
        padding: 0 $paddingX-page;
        background-color: $background-primary;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 15px;

        a:first-child {
            margin-right: auto;

            .container-logo {
                height: 75px;
                width: 75px;

                img {
                    width: 100%;
                    object-fit: cover;
                }
            }
        }

        .user-infos {
            text-align: right;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .container-logout {
            height: 50px;
            width: 50px;

            img {
                width: 100%;
                object-fit: cover;
            }
        }
    }

    .content-header {
        height: $pageHeaderHeight;
        width: 100%;
        padding: 0 $paddingX-page;
        background-color: $background-secondary;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .form-search {
            position: relative;
            width: fit-content;
            display: flex;

            &__field {
                height: 30px;
                width: 300px;
                padding: 0 10px;
            }

            &__submit {
                position: absolute;
                right: 0;
                height: 30px;
                width: 30px;

                img {
                    width: 80%;
                    object-fit: cover;
                }
            }
        }

        .title {
            margin-top: 15px;
        }
    }
}
</style>