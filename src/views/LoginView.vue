<!-- Implementation of a proper authentification for API using JWT will be in a next study project, this is just a placeholder
to simulate reception of data from the API's endpoint after attempted login. -->

<script setup>
import PageHeader from '../components/PageHeader.vue';
import { ref, reactive, computed } from 'vue';
import axios from 'axios';
import { useClientStore } from '@/stores/client'
import router from '../router';
import PageFooter from '../components/PageFooter.vue';
const storeClient = useClientStore()

const error = ref({
  lastMessage: "",
  mustDisplay: false
})

const email = ref(null);
const password = ref(null);
const passwordConfirm = ref(null);

function attemptLogin() {

  if (password.value !== null && password.value === passwordConfirm.value && email.value !== null) {
    requestLogin()
  } else {
    error.value.lastMessage = "le mot de passe et sa confirmation sont différents!"
    displayError()
  }
}

async function requestLogin() {
  let result = []
  await axios
    .post("http://localhost:8000/api/login", {
      inputedMail: email.value,
      inputedPass: password.value
    })
    .then(response => { result = response.data })
  if (result.success) {
    storeClient.setUser(result.clientInfos)
    router.push({ name: 'home' })
  } else {
    storeClient.unsetUser()
    error.value.lastMessage = result.error
    displayError()
  }
}

function displayError() {
  console.log("display function")
  console.log(error.value.lastMessage)
  error.value.mustDisplay = true;
  setTimeout(() => {
    error.value.mustDisplay = false
  }, 5000)
}

</script>


<template>
  <PageHeader :user="user" />
  <main class="wrapper">
    <section class="content">
      <section class="form-login">
        <div v-if="error.mustDisplay" class="error">{{ error.lastMessage }}</div>
        <h1>CONNECTION</h1>
        <div class="form-group">
          <label for="field-mail">Adresse email</label>
          <input v-model="email" class="inputField" id="field-mail" type="text" name=email
            placeholder="indiquez votre addresse email" required>
        </div>
        <div class="form-group">
          <label for="field-password">Mot de passe</label>
          <input v-model="password" class="inputField" id=field-password type="password"
            placeholder="indiquez votre mot de passe" required>
        </div>
        <div class="form-group">
          <label for="field-confirmation">Confirmation de mot de passe</label>
          <input v-model="passwordConfirm" class="inputField" id="field-confirmation" type="password"
            placeholder="indiquez votre addresse email" required>
        </div>
        <button class="login" @click="attemptLogin()">connection</button>
      </section>
    </section>
  </main>
  <PageFooter />
</template>

<style lang="scss" scoped>
@use "../src/scss/abstract/" as *;
@use "../src/scss/elements/" as *;

main.wrapper {
  padding: 20px 0px;
  height: 100vh;
  background-color: $background-secondary;

  .content {
    margin-top: $headerHeight;
    height: 100%;
    width: 100%;
    padding: $paddingX-page;
    background-color: $background-secondary;
    display: flex;
    flex-direction: column;

    div.error {
      position: absolute;
      top: -20px;
      color: red;
    }

    .form-login {
      position: relative;
      height: fit-content;
      width: 100%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      background-color: $background-tertiary;

      button {
        align-self: flex-end;
        width: fit-content;
        padding: 5px 15px;
      }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 5px;

      input {
        height: 24px
      }
    }
  }
}
</style>

