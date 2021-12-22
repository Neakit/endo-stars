import { ref, reactive } from "@vue/composition-api";
const visible = ref(false);
const options = reactive({ text: "" });

export const useInfoModal = () => {
  const showModal = (text: string): void => {
    options.text = text;
    visible.value = true;
  };

  const hideModal = (): void => {
    options.text = "";
    visible.value = false;
  };

  return {
    showModal,
    hideModal,
    visible,
    options,
  };
};
