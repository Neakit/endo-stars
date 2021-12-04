<template>
  <div class="es-slider-menu">
    <div class="es-slider-menu__item" v-for="(item, index) in navigationItems" :to="item.to" :key="index">
      <router-link v-if="!item.children" :to="item.to">{{ item.title }}</router-link>
      <a v-else @click="openSubMenu(item)">{{ item.title }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import SubMenu from "./SubMenu.vue";

export default defineComponent({
  components: {
    SubMenu,
  },
  props: {
    navigationItems: {
      required: true,
      type: Array,
    },
  },

  setup(props, { root }) {
    const openSubMenu = (item: any) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      root.$FModal.show(
        { component: SubMenu },
        {
          navigationItems: item.children,
          title: item.title,
        },
      );
    };
    return {
      openSubMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
.es-slider-menu {
  overflow: auto;
  white-space: nowrap;
}

.es-slider-menu__item {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px;
  text-decoration: none;
  a {
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    /* line-height: 19px; */
    color: #000000;
  }
}
</style>
