<script setup>
import { RouterView } from 'vue-router'
import PageHeader from './components/PageHeader.vue';
import PageFooter from './components/PageFooter.vue';
</script>

<template>
  <PageHeader />
  <RouterView />
  <PageFooter />
</template>

<style lang="scss">
@use "../src/scss/abstract/reset" as *;
@use "../src/scss/elements" as *;
</style>
