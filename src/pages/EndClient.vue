<template>
  <b-container class="pt-4">
    <p class="es-title-h1 my-5">Конечный заказчик</p>

    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-clientname">Конечный заказчик</label>
      </b-col>
      <b-col cols="4">
        <b-form-input id="input-clientname" v-model="form.clientname" :state="validation.clientname"></b-form-input>
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
        <label class="es-form-label" for="input-inn">Регион</label>
      </b-col>
      <b-col cols="4">
        <b-form-input id="input-inn" v-model="form.region" :state="validation.region"></b-form-input>
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col cols="2">
        <label class="es-form-label" for="input-inn">ФИО заведующего эндоскопии</label>
      </b-col>
      <b-col cols="4">
        <b-form-input id="input-inn" v-model="form.fullname" :state="validation.fullname"></b-form-input>
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
            clientname: '',
            inn: '',
            region: '',
            fullname: '',
        });

        const validation = reactive({
            clientname: true,
            inn: true,
            region: true,
            fullname: true,
        });

        const search = ref('');

         const items = [
            { client: 'ГБУЗ НСО "Бердская ЦГБ"', inn: '545117267', region: 'Новосибирск', fullname: 'Соколов Артем Николаевич' },
            { client: 'ОБУЗ ОКБ', inn: '545117267', region: 'Иваново', fullname: 'Соколов Артем Николаевич' },
            { client: 'ГБУЗ НСО "Бердская ЦГБ"', inn: '545117267', region: 'Новосибирск', fullname: 'Соколов Артем Николаевич' },
            { client: 'ОБУЗ ОКБ', inn: '545117267', region: 'Иваново', fullname: 'Соколов Артем Николаевич' },
            { client: 'ГБУЗ НСО "Бердская ЦГБ"', inn: '545117267', region: 'Новосибирск', fullname: 'Соколов Артем Николаевич' },
            { client: 'ОБУЗ ОКБ', inn: '545117267', region: 'Иваново', fullname: 'Соколов Артем Николаевич' },
            { client: 'ГБУЗ НСО "Бердская ЦГБ"', inn: '545117267', region: 'Новосибирск', fullname: 'Соколов Артем Николаевич' },
            { client: 'ОБУЗ ОКБ', inn: '545117267', region: 'Иваново', fullname: 'Соколов Артем Николаевич' },
            { client: 'ГБУЗ НСО "Бердская ЦГБ"', inn: '545117267', region: 'Новосибирск', fullname: 'Соколов Артем Николаевич' },
            { client: 'ОБУЗ ОКБ', inn: '545117267', region: 'Иваново', fullname: 'Соколов Артем Николаевич' },
        ]

        const fields = [
          {
            key: 'client',
            label: 'Конечный заказчик',
            sortable: false
          },
          {
            key: 'inn',
            label: 'ИНН',
            sortable: false
          },
          {
            key: 'region',
            label: 'Регион',
          },
          {
            key: 'fullname',
            label: 'ФИО заведующего эндоскопии',
            sortable: false
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
