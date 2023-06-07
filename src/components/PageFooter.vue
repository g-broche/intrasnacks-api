<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router';
import { useClientStore } from '@/stores/client'
import { useRouter } from 'vue-router';

const storeClient = useClientStore()
const router = useRouter()

const areFavDisplayed = defineProps(['favStatus'])

const emits = defineEmits(['toggleFavorites']);

const toggle = () => {
    const updatedData = { mustDisplayFav: !areFavDisplayed.favStatus };
    emits('toggleFavorites', updatedData);
}

const isHome = computed(() => {
    return router.currentRoute.value.name === 'home'
})

function redirectToFavorites() {
    router.push({ name: 'home', query: { "favorites": true } })
}
</script>

<template>
    <footer>
        <nav v-if="storeClient.isUserLogged">
            <div class="nav-item">
                <div class="nav-item__img-container"><img src="../../img/home.webp" alt=""></div>

                <h3 class="nav-item__title">Accueil</h3>
            </div>
            <div class="nav-item">
                <div v-if="isHome" class=" nav-item__img-container"><img src="../../img/star.webp" alt=""
                        @click="() => { toggle() }">
                </div>
                <div v-else class=" nav-item__img-container"><img src="../../img/star.webp" alt=""
                        @click="() => { redirectToFavorites() }">
                </div>
                <h3 class="nav-item__title">Favoris</h3>
            </div>
            <div class="nav-item">
                <div class="nav-item__img-container"><img src="../../img/history.webp" alt=""
                        @click="() => { router.push({ name: 'history' }) }"></div>

                <h3 class="nav-item__title">Historique</h3>
            </div>
            <div class="nav-item">
                <div class="nav-item__img-container"><img src="../../img/basket.webp" alt=""></div>
                <h3 class="nav-item__title">Panier</h3>
            </div>
        </nav>

    </footer>
</template>

<style lang="scss" scoped>
@use "../src/scss/abstract/" as *;

footer {
    position: fixed;
    z-index: 1;
    bottom: 0;
    width: 100%;
    height: $footerHeight;
    background-color: $background-tertiary;
    padding: $paddingX-page;
    display: flex;
    justify-content: center;
    align-items: center;

    nav {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav-item {
        height: 75px;
        width: 75px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        &__img-container {
            height: 50px;
            width: 50px;

            img {
                width: 100%;
                object-fit: cover;
            }
        }

        &__title {
            font-weight: 700;
        }
    }
}
</style>