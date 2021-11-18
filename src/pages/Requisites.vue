<template>
  <b-container class="pt-4">
    <p class="es-title-h1 my-5">Реквизиты компаний</p>

    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-companyname">Компания</label>
      </b-col>
      <b-col cols="4">
        <b-form-input id="input-companyname" v-model="form.companyname" :state="validation.companyname"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-inn">ИНН</label>
      </b-col>
      <b-col cols="4">
        <b-form-input id="input-inn" v-model="form.inn" :state="validation.inn"></b-form-input>
      </b-col>
    </b-row>
    
    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-address">Адрес</label>
      </b-col>
      <b-col cols="4">
        <b-form-textarea
          id="input-address"
          v-model="form.address"
          :state="validation.address"
        ></b-form-textarea>
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label for="input-phone">Телефон</label>
      </b-col>
      <b-col cols="4">
        <b-form-input 
          placeholder="+7 (___) __-__" 
          v-mask="'+7 (###) ###-##-##'" 
          id="input-phone" 
          :state="validation.phone"
          v-model="form.phone"
        ></b-form-input>
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label for="input-email">Эл. почта</label>
      </b-col>
      <b-col cols="4">
        <b-form-input id="input-email" :state="validation.mail" v-model="form.mail"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="background-gray py-4">
      <b-col cols="2" offset="2">
        <es-button proccess="ready" variant="default" block>Сохранить</es-button>
      </b-col>
    </b-row> 

    <b-row class="mt-5 mb-5">
        <b-col cols="7">
            <es-input-search v-model="search" placeholder="Поиск" />
        </b-col>
    </b-row> 

    <es-simple-table :items="items" :fields="fields" />

  </b-container>
</template>

<script>
import { defineComponent, reactive, ref } from '@vue/composition-api'
import ESButton from '@components/es-button.vue';
import ESInputSearch from '@components/es-input-search.vue';
import ESSimpleTable from '@components/es-simple-table.vue';

export default defineComponent({
    components: {
        "es-button": ESButton,
        "es-input-search": ESInputSearch,
        "es-simple-table": ESSimpleTable,
    },
    setup() {

        const form = reactive({
            companyname: '',
            inn: '',
            address: '',
            phone: '',
            mail: '',
        });

        const validation = reactive({
            companyname: true,
            inn: true,
            address: true,
            phone: true,
            mail: true,
        });

        const search = ref('');

         const items = [
            { 
              company: 'Эндо Сервис',
              inn: '545117267',
              address: 'Россия, г.Новосибирск, ул. Депутатская, 46, оф. 1173',
              phone: '+7 (923) 226-97-86',
              mail: 'julburdukova@gmail.com' 
            },
            { 
              company: 'Эндо Сервис',
              inn: '545117267',
              address: 'Россия, г.Новосибирск, ул. Депутатская, 46, оф. 1173',
              phone: '+7 (923) 226-97-86',
              mail: 'julburdukova@gmail.com' 
            },
        ]

        const fields = [
          {
            key: 'company',
            label: 'Компания',
          },
          {
            key: 'inn',
            label: 'ИНН',
          },
          {
            key: 'address',
            label: 'Адрес',
          },
          {
            key: 'phone',
            label: 'Телефон',
          },
          {
            key: 'mail',
            label: 'Эл. почта',
          },
        ];

        return {
            form,
            validation,
            search,
            items,
            fields
        }
    },
})
</script>
