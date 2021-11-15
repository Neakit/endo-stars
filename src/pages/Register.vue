<template>
  <b-container class="pt-4">
    <p class="es-title-h1 my-5">Мои данные</p>
    <!-- personal data -->
    <b-form @submit="onSubmit">
        <b-row class="mb-4">
            <b-col cols="2">
                <label for="input-fullname">Имя и фамилия:</label>
            </b-col>
            <b-col cols="6">
                <b-form-input v-model="form.fullname" id="input-fullname" :state="validation.fullname"></b-form-input>
            </b-col>
        </b-row>

        <b-row class="mb-4">
            <b-col cols="2">
                <label for="input-phone">Телефон</label>
            </b-col>
            <b-col cols="6">
                <b-form-input v-model="form.phone" placeholder="+7 (___) __-__" v-mask="'+7 (###) ###-##-##'" id="input-phone" :state="validation.phone"></b-form-input>
            </b-col>
        </b-row>

        <b-row class="mb-5">
            <b-col cols="2">
                <label for="input-email">Эл. почта</label>
            </b-col>
            <b-col cols="6">
                <b-form-input v-model="form.email" id="input-email" :state="form.email"></b-form-input>
            </b-col>
        </b-row>

        <!-- position and company -->
        <b-row class="mb-4">
            <b-col cols="2">
                <label for="input-position">Должность</label>
            </b-col>
            <b-col cols="6">
                <b-form-select v-model="form.position" :options="options.position" :state="form.position"></b-form-select>
            </b-col>
        </b-row>

        <b-row class="mb-5">
            <b-col cols="2">
                <label for="input-company">Компания</label>
            </b-col>
            <b-col cols="6">
                <b-form-select v-model="form.company" :options="options.company" :state="form.company"></b-form-select>
            </b-col>
        </b-row>
        
        <!-- auth  -->
        <b-row class="mb-4">
            <b-col cols="2">
                <label for="input-login">Логин</label>
            </b-col>
            <b-col cols="6">
                <b-form-input placeholder="Логин" id="input-login" v-model="form.login" :state="validation.login" trim></b-form-input>
            </b-col>
        </b-row>

        <b-row class="mb-4">
            <b-col cols="2">
                <label for="input-password">Эл. почта</label>
            </b-col>
            <b-col cols="6">
                <b-form-input placeholder="Пароль" id="input-password" v-model="form.password" :state="validation.password" trim></b-form-input>
            </b-col>
        </b-row>
      
        <b-row class="background-gray py-4">
            <b-col cols="2" offset="2">
                <es-button proccess="ready" type="submit" variant="default" block>Зарегистрировать</es-button>
            </b-col>
        </b-row> 
    </b-form>

  </b-container>
</template>

<script>
import { defineComponent, reactive } from '@vue/composition-api'
import ESButton from '@components/es-button.vue';

export default defineComponent({
  components: {
    "es-button": ESButton
  },
  setup() {

    const form = reactive({
        fullname: '',
        phone: '',
        email: '',

        login: '',
        password: ''
    });

    const validation = reactive({
        fullname: true,
        phone: true,
        email: true,

        login: true,
        password: true
    });

    const options = {
        position: [
            { value: null, text: 'Please select an option' },
            { value: 'a', text: 'This is First option' },
            { value: 'b', text: 'Selected Option' },
            { value: { C: '3PO' }, text: 'This is an option with object value' },
            { value: 'd', text: 'This one is disabled', disabled: true }
        ],
        company: [
            { value: null, text: 'Please select an option' },
            { value: 'a', text: 'This is First option' },
            { value: 'b', text: 'Selected Option' },
            { value: { C: '3PO' }, text: 'This is an option with object value' },
            { value: 'd', text: 'This one is disabled', disabled: true }
        ],
    };

    const onSubmit = async () => {
        // await
    };

    return {
        form,
        validation,
        options,
        onSubmit
    }
  },
})
</script>
