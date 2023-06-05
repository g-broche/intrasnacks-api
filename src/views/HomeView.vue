<script setup>
import Product from '../components/Product.vue';
import PageHeader from '../components/PageHeader.vue';
import PageFooter from '../components/PageFooter.vue';
import axios from 'axios';
import { ref, onMounted, computed, onUpdated } from 'vue';

const products = ref(null)
onMounted(async () => {
  await axios
    .get("http://localhost:8000/api/products")
    .then(response => {
      products.value = response.data
      isDataFetched.value = true
    });
})
const isDisplayEmpty = ref(true)
const isDataFetched = ref(false)

const mustDisplay = ref(
  {
    favoriteOnly: false,
    query: ""
  }
)

function updateProductStock(infos) {
  const productToUpdate = products.value.find(product => product.id === infos.id)
  productToUpdate.stock = infos.stock
}
function updateProductFavorite(infos) {
  const productToUpdate = products.value.find(product => product.id === infos.id)
  productToUpdate.is_favourite = infos.favoriteStatus
}


const filteredList = computed(() => {
  let toDisplay = []
  if (isDataFetched.value) {
    mustDisplay.value.query = (mustDisplay.value.query == null ? "" : mustDisplay.value.query)
    toDisplay = (mustDisplay.value.favoriteOnly
      ? products.value.filter((product) => product.is_favourite && product.name.includes(mustDisplay.value.query))
      : products.value.filter((product) => product.name.includes(mustDisplay.value.query)))
  }
  if (toDisplay.length != []) {
    isDisplayEmpty.value = false
    return toDisplay
  } else {
    isDisplayEmpty.value = true
  }

})

function updateQuery(value) {
  mustDisplay.value.query = value.query
}
</script>
<template>
  <PageHeader @updatedQuery="updateQuery" />
  <main class="wrapper">
    <section class="content">
      <span v-if="isDisplayEmpty" class="content__warning">Aucun article ne correspond a votre recherche</span>
      <main class="content__grid-article">
        <article v-for="product in filteredList">
          <Product :product="product" @updatedProduct="updateProductStock"
            @updatedProductFavoriteStatus="updateProductFavorite" />
        </article>
      </main>
    </section>
  </main>
  <PageFooter :favStatus="mustDisplay.favoriteOnly"
    @toggleFavorites="(newValue) => { mustDisplay.favoriteOnly = newValue.mustDisplayFav }" />
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

    &__warning {
      font-size: $font-medium;
    }

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
