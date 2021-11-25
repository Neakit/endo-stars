<template>
  <b-container fluid class="h-vh-100 d-flex justify-content-center flex-column">
    <b-row>
      <b-col offset-md="4" md="4">
        <div class="d-flex justify-content-center mb-5">
          <img class="login-page-logo" src="@img/logo.svg" alt="" />
        </div>

        <b-form-group id="fieldset-1" label-for="input-email" :invalid-feedback="invalidFeedback.email">
          <b-form-input
            placeholder="Логин"
            id="input-email"
            v-model="form.email"
            :state="validation.email"
            trim
          ></b-form-input>
        </b-form-group>

        <b-form-group id="fieldset-1" label-for="input-password" :invalid-feedback="invalidFeedback.password">
          <b-form-input
            type="password"
            placeholder="Пароль"
            id="input-password"
            v-model="form.password"
            :state="validation.password"
            trim
          ></b-form-input>
        </b-form-group>
        <b-button @click="loginHandler" variant="default" block>Войти</b-button>

        <p class="px-5 mt-3 text-center">
          <b-link class="text-gray" href="#foo">
            Если забыли пароль, <br />
            обратитесь к администратору
          </b-link>
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { defineComponent, reactive } from "@vue/composition-api";
import { useAuth } from "@composition/useAuth";

export default defineComponent({
  setup(_, { root }) {
    const form = reactive({
      email: "admin@mail.com",
      password: "adminadmin",
    });

    const validation = reactive({
      email: true,
      password: true,
    });

    const invalidFeedback = reactive({
      login: "",
      password: "",
    });

    const { login } = useAuth();

    const loginHandler = async () => {
      try {
        // button loading true
        await login(form);

        root.$router.push("/dashboard/commercial-offer/");
      } catch (e) {
        // form error handler
      } finally {
        // button loading false
      }
    };

    return {
      form,
      validation,
      invalidFeedback,
      loginHandler,
    };
  },
});
</script>

<style scoped>
.login-page-logo {
  width: 100%;
  max-width: 198px;
}
</style>
