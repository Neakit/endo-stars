<template>
  <b-container fluid class="h-vh-100 d-flex justify-content-center flex-column">
    <b-row>
      <b-col offset-md="4" md="4">
        <div class="d-flex justify-content-center mb-5">
          <img class="login-page-logo" src="@img/logo.svg" alt="">
        </div>

        <b-form @submit="onSubmit">
          <b-form-group
            id="fieldset-1"
            label-for="input-login"
            :invalid-feedback="invalidFeedback.login"
          >
            <b-form-input placeholder="Логин" id="input-login" v-model="form.login" :state="validation.login" trim></b-form-input>
          </b-form-group>

          <b-form-group
            id="fieldset-1"
            label-for="input-password"
            :invalid-feedback="invalidFeedback.password"
          >
            <b-form-input placeholder="Пароль" id="input-password" v-model="form.password" :state="validation.password" trim></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="default" block>Войти</b-button>
          
          <p class="px-5 mt-3 text-center">
            <b-link class="text-gray" href="#foo">Если забыли пароль, <br/> обратитесь к администратору</b-link>
          </p>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  setup() {
    
    const form = reactive({
      login: "",
      password: ""
    });

    const validation = reactive({
      login: true,
      password: true,
    });

    const invalidFeedback = reactive({
      login: "",
      password: ""
    });

    const onSubmit = async (event) => {
      event.preventDefault()
      // fetch api
    };

    return {
      form,
      validation,
      invalidFeedback,
      onSubmit
    }
  }
})
</script>

<style scoped>
  .login-page-logo {
    width: 100%;
    max-width: 198px;
  }
</style>