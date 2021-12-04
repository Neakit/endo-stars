<template>
  <div class="es-sub-menu">
    <div class="d-flex justify-content-between es-sub-menu__header">
      <span class="es-sub-menu__title">{{ title }}</span>
      <b-icon @click="closeSubMenu" class="search-icon" scale="1.5" icon="x"></b-icon>
    </div>
    <div v-for="(item, index) in navigationItems" :key="index">
      <router-link v-if="item.to" class="es-sub-menu__link" :to="item.to"> {{ item.title }} </router-link>

      <a class="es-sub-menu__link" v-else-if="item.action" @click="handlerAction(item.action)"> {{ item.title }} </a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    navigationItems: {
      type: Array,
    },
    title: {
      type: String,
    },
  },
  setup(props, { root }) {
    console.log("ewew0", props);
    const closeSubMenu = () => {
      root.$FModal.hide();
    };

    const handlerAction = (action) => {
      closeSubMenu();
      action();
    };
    return { closeSubMenu, handlerAction };
  },
});
</script>

<style lang="scss" scoped>
.es-sub-menu {
  padding-top: 16px;
  padding-bottom: 16px;
}

.es-sub-menu__header {
  margin-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
}

.es-sub-menu__title {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 30px;
  color: #000000;
}

.es-sub-menu__link {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 37px;
  color: #000000;
  display: block;
  padding-left: 16px;
  padding-right: 16px;
  text-decoration: none;
  &:active {
    background: #eaeaea;
  }
}
</style>
