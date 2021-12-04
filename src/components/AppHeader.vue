<template>
  <b-container>
    <b-navbar class="as-navbar" type="light">
      <router-link to="/dashboard/commercial-offer" class="mr-2">
        <img class="" src="@img/logo.svg" alt="" />
      </router-link>

      <b-navbar-nav class="d-none d-lg-flex">
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

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto d-none d-lg-flex">
        <b-nav-item-dropdown right no-caret>
          <template #button-content>
            <Avatar />
          </template>

          <b-dropdown-item
            v-for="(item, index) in navItems"
            :to="item.to"
            style="width: 208px; white-space: wrap"
            :key="index"
            @click="item.action"
          >
            <span class="es-dropdown-item-text" :class="{ 'es-dropdown-item-text--bold': item.bold }">
              {{ item.title }}
            </span>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto d-lg-none" @click="openModal">
        <Avatar />
      </b-navbar-nav>
    </b-navbar>
  </b-container>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import Avatar from "@components/Avatar.vue";
import { useAuth } from "@composition/useAuth";
import SubMenu from "./SubMenu.vue";

class NavItem {
  to: string;
  title: string;
  action: any;
  bold: boolean;

  constructor(data: any) {
    this.title = data.title || "";
    this.to = data.to || null;
    this.action = data.action || (() => undefined);
    this.bold = data.bold || false;
  }
}

export default defineComponent({
  components: {
    Avatar,
    SubMenu,
  },
  props: {
    navigationItems: {
      required: true,
      type: Array,
    },
  },
  setup(props, context) {
    const { root } = context;
    const { userRole, user, logout } = useAuth();

    const logoutHandler = () => {
      logout();
      root.$router.push("/auth/login/");
    };

    const navItems = [
      // new NavItem({ title: user.value.fullname, to: "/dashboard", bold: true }),
      new NavItem({ title: "Настроки", to: "/dashboard/profile/" }),
      new NavItem({ title: "Выход", action: logoutHandler }),
    ];

    const openModal = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      root.$FModal.show(
        { component: SubMenu },
        {
          navigationItems: navItems,
          title: "Константин  Константинопольский",
        },
      );
    };

    return {
      navItems,
      openModal,
    };
  },
});
</script>

<style scoped></style>
