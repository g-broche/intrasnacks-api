<script setup>
import { useClientStore } from '@/stores/client'
const storeClient = useClientStore()

function loggout() {
    storeClient.unsetUser()
    router.push({ name: 'login' })
}
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
                <div class="container-logout" @click="loggout()">
                    <img src="../../img/logout.webp" alt="logout-button">
                </div>
            </a>
        </section>
        <section v-if="storeClient.isUserLogged" class="content-header">
            <form class="form-search" action="/searchProducts" method="get">
                <input class="form-search__field inputField" type="search" id="searchField" name="query"
                    placeholder="Rechercher">
                <button class="form-search__submit" type="submit"><img src="../../img/magnifier.svg" alt=""></button>
            </form>
            <h1 class="title">Catalogue produits</h1>
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
        height: $headerHeight;
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
        height: 85px;
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