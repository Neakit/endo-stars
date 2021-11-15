<template>
  <b-container class="pt-4">
    <p class="es-title-h1 my-5">Мои данные</p>

    <b-row class="mb-4">
      <b-col cols="2">
        <label for="input-fullname">Имя и фамилия:</label>
      </b-col>
      <b-col cols="6">
        <b-form-input id="input-fullname" :state="true"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label for="input-phone">Телефон</label>
      </b-col>
      <b-col cols="6">
        <b-form-input placeholder="+7 (___) __-__" v-mask="'+7 (###) ###-##-##'" id="input-phone" :state="true"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label for="input-email">Эл. почта</label>
      </b-col>
      <b-col cols="6">
        <b-form-input id="input-email" :state="true"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="background-gray py-4">
      <b-col cols="2" offset="2">
        <es-button proccess="ready" type="submit" variant="default" block>Сохранить</es-button>
      </b-col>
    </b-row> 

  </b-container>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import ESButton from '@components/es-button.vue';

export default defineComponent({
  components: {
    "es-button": ESButton
  },
  setup() {
    return {
    }
  },
})
</script>
