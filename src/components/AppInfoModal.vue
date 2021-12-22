<template>
  <b-modal :visible="visible" centered hide-footer hide-header size="sm">
    <div class="d-flex justify-content-end">
      <i slot="extra" class="es-modal__close icon mdi mdi-close" @click="hideModal"></i>
    </div>
    <div class="d-flex justify-content-center mb-3">
      <div class="es-modal d-flex justify-content-center align-items-center">
        <i slot="extra" class="es-modal__icon icon mdi mdi-check"></i>
      </div>
    </div>
    <p class="text-center es-modal__message">{{ options.text }}</p>
  </b-modal>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { useInfoModal } from "@composition/useInfoModal";

export default defineComponent({
  setup() {
    const { visible, hideModal, options } = useInfoModal();
    return {
      visible,
      hideModal,
      options,
    };
  },
});
</script>

<style scoped lang="scss">
.es-modal__close {
  font-size: 18px;
  cursor: pointer;
  color: #acacac;
}
.es-modal {
  background: #ffe600;
  width: 62px;
  height: 62px;
  border-radius: 50%;

  &__icon {
    font-size: 32px;
    color: #000000;
  }
}
.es-modal__message {
  font-family: "Roboto";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #000000;
}
</style>
