<script setup>
import Product from '../components/Product.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const products = ref(null)
onMounted(async () => {
  await axios
    .get("http://localhost:8000/api/products")
    .then(response => { products.value = response.data });
})

function updateProductStock(infos) {
  const productToUpdate = products.value.find(product => product.id === infos.id)
  productToUpdate.stock = infos.stock
}
function updateProductFavorite(infos) {
  const productToUpdate = products.value.find(product => product.id === infos.id)
  productToUpdate.is_favourite = infos.favoriteStatus
}
</script>

<template>
  <main class="wrapper">
    <section class="content">

      <main class="content__grid-article">
        <article v-for="product in products">
          <Product :product="product" @updatedProduct="updateProductStock"
            @updatedProductFavoriteStatus="updateProductFavorite" />
        </article>
      </main>
    </section>
  </main>
</template>


<style lang="scss" scoped>
@use "../src/scss/abstract/" as *;
@use "../src/scss/elements/" as *;

main.wrapper {
  margin-top: $headerHeight;
  margin-bottom: $footerHeight;
  padding-bottom: 20px;
  height: 100%;
  background-color: $background-secondary;

  .content {
    padding: 0 $paddingX-page;
    margin-top: 185px;
    display: flex;
    align-items: center;

    &__grid-article {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 1fr;
      gap: 20px;
    }
  }
}
</style>
