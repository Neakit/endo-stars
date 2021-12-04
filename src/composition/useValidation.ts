import { ref, reactive } from "@vue/composition-api";

export const useValidation = (FieldsConstructor: any) => {
  const validation = reactive({ ...new FieldsConstructor() });

  const initValidation = () => {
    for (const [key] of Object.entries(validation)) {
      validation[key] = {
        state: true,
        feedback: "",
      };
    }
  };

  const clearValidation = () => {
    for (const [key] of Object.entries(validation)) {
      validation[key] = {
        state: true,
        feedback: "",
      };
    }
  };

  const handlerFormError = (e: any) => {
    const errorFields = e?.response?.data || [];
    console.log(errorFields);
    for (const [key, value] of Object.entries(errorFields)) {
      validation[key] = {
        state: false,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        feedback: value[0],
      };
    }
    console.log(validation);
  };

  return {
    validation,
    initValidation,
    clearValidation,
    handlerFormError,
  };
};
