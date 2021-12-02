<template>
  <b-navbar-nav>
    <template v-for="(item, index) in navigationItems">
      <b-nav-item v-if="!item.children" class="es-nav-link" :to="item.to" :key="index">
        {{ item.title }}
      </b-nav-item>

      <b-nav-item-dropdown v-else right no-caret :key="index" class="es-nav-link">
        <template #button-content>
          <span>{{ item.title }}</span>
        </template>

        <b-dropdown-item
          v-for="(i, key) in item.children"
          :key="key + 'req'"
          :to="i.to"
          style="width: 208px; white-space: wrap"
        >
          <span class="es-dropdown-item-text" :class="{ 'es-dropdown-item-text--bold': item.bold }">
            {{ i.title }}
          </span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </template>
  </b-navbar-nav>
</template>

<script>
export default {
  props: {
    navigationItems: {
      type: Array,
    },
  },
};
</script>

<style></style>
