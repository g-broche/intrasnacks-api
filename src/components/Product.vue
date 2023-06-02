<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import { useClientStore } from '@/stores/client'
const storeClient = useClientStore()

const emits = defineEmits(['updatedProduct', 'updatedProductFavoriteStatus']);

const updateProduct = (infos) => {
    const updatedData = { id: infos.id, stock: infos.stock };
    emits('updatedProduct', updatedData);
}
const updateProductFavoriteStatus = (infos) => {
    const updatedFavStatus = { id: infos.productId, favoriteStatus: infos.isNowFavourite };
    emits('updatedProductFavoriteStatus', updatedFavStatus)
}

defineProps(
    {
        product: {
            type: Object,
            required: true
        }
    }
)

async function order(id) {
    let result = []
    await axios
        .post("http://localhost:8000/api/product/consume", {
            userToken: 777,
            productId: id,
        })
        .then(response => { result = response.data })
    if (result.success) {
        updateProduct(result.infos.product)
        storeClient.updateSolde(result.infos.client.solde)
    }
}

async function toggleFavorite(productId, newFavoriteStatus) {
    let result = []
    await axios
        .post("http://localhost:8000/api/product/toggleFavorite", {
            userToken: 777,
            productId: productId,
            isFavourite: newFavoriteStatus
        })
        .then(response => { result = response.data })
    if (result.success) {
        updateProductFavoriteStatus(result)
    }
}


const pathToImg = ref("./img/")
</script>

<template>
    <div :class="product.stock > 0 ? 'product-wrapper' : 'product-wrapper unavailable-article'">
        <header class="image-container">
            <img :src="pathToImg + product.image_name" :alt="product.image_name">
            <div class="favoriteToggle" @click="toggleFavorite(product.id, !product.is_favourite)">
                <img :src="product.is_favourite ? pathToImg + 'star-full.webp' : pathToImg + 'star-empty.webp'">
            </div>
        </header>
        <main class="product-description">
            <h3 class="product-description__name">{{ product.name }}</h3>
            <p class="product-description__cost">{{ product.credit_cost }} crédits</p>
        </main>
        <footer>
            <button :class="product.stock > 0 ? 'order' : 'order unavailable-button'" name="productId"
                @click="order(product.id)" :disabled="product.stock <= 0">Commander</button>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
@use "../src/scss/abstract/" as *;
@use "../src/scss/elements/" as *;

.product-wrapper {
    padding: 10px;
    background-color: $background-primary;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .image-container {
        position: relative;
        width: 100%;
        height: 125px;

        img {
            object-fit: cover;
            height: 100%;
        }

        .favoriteToggle {
            position: absolute;
            top: 3px;
            right: 3px;
            width: 36px;
            height: 36px;

            img {
                object-fit: cover;
                width: 100%
            }
        }
    }

    .product-description {
        &__name {
            font-weight: 700;
        }

        &__cost {
            margin-top: 10px;
        }
    }

    footer {
        display: flex;
        justify-content: center;
        width: 100%;

        .order {
            height: 20px;
            width: 80%;
        }
    }

}

.unavailable-article {
    filter: grayscale(50%);
}

.unavailable-stock {
    color: red;
}
</style>