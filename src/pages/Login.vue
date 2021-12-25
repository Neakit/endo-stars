<template>
  <b-container fluid class="h-vh-100 d-flex justify-content-center flex-column">
    <b-row>
      <b-col offset-md="4" md="4">
        <div class="d-flex justify-content-center mb-5">
          <img class="login-page-logo" src="@img/logo.svg" alt="" />
        </div>

        <b-form-group id="fieldset-1" label-for="input-username" :invalid-feedback="invalidFeedback.username">
          <b-form-input
            placeholder="Логин"
            id="input-username"
            v-model="form.username"
            :state="validation.username"
            trim
          ></b-form-input>
        </b-form-group>

        <b-form-group id="fieldset-1" label-for="input-password" :invalid-feedback="invalidFeedback.password">
          <b-form-input type="password" placeholder="Пароль" id="input-password" v-model="form.password" trim />
          <b-form-invalid-feedback :state="false" id="input-password">
            <!--  -->
          </b-form-invalid-feedback>
        </b-form-group>

        <es-button @click="loginHandler" variant="default" block>Войти</es-button>

        <p class="px-5 mt-4 text-center login-forgot-password">
          Если забыли пароль, <br />
          обратитесь к администратору
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
    const managerUser = {
      username: "manager@example.com",
      password: "managerpassword",
    };

    const directorUser = {
      username: "director@example.com",
      password: "directorpassword",
    };

    const adminUser = {
      username: "testadmin@example.com",
      password: "adminpassword",
    };

    const adminSuperUser = {
      username: "admin@mail.com",
      password: "adminadmin",
    };
    console.log(directorUser, adminUser, adminSuperUser);

    const form = reactive({ ...directorUser });

    const validation = reactive({
      username: true,
      password: true,
    });

    const invalidFeedback = reactive({
      username: "",
      password: "",
    });

    const { login } = useAuth();

    const handlerError = (err) => {
      console.log(err);
      // for (const key in err) {
      // console.log(err[key], key);
      // validation[key] = false;
      // }
    };

    const loginHandler = async () => {
      try {
        // button loading true
        await login(form);

        root.$router.push("/dashboard/commercial-offer/");
      } catch (e) {
        console.log(e.response.data);
        if (e.response.data) {
          handlerError(e.response.data);
        }
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
.login-forgot-password {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #acacac;
}
</style>
