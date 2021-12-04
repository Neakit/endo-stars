<template>
  <div class="es-avatar">
    <img src="@img/profile.svg" alt="avatar-img" />
    <div class="es-avatar__title">
      <span to="/dashboard/profile" class="es-avatar-text ml-1">{{ avatarTitle }}</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "@vue/composition-api";
import { useAuth } from "@composition/useAuth";

export default defineComponent({
  setup() {
    const { user } = useAuth();
    const avatarTitle = computed(() => {
      return user.value.first_name.substring(0, 1).toUpperCase();
    });
    return {
      avatarTitle,
    };
  },
});
</script>

<style lang="scss" scoped>
.es-avatar {
  max-width: 42px;
  position: relative;
  &__title {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
