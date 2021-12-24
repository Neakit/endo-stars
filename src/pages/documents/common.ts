import { reactive, ref } from "@vue/composition-api";
import RequestManager from "@services/RequestManager";
import debounce from "lodash/debounce";

export const productTableConfig = {
  columns: [
    {
      alwaysExpanded: true,
      headline: "Артикул",
      breakpoint: "md",
    },
    {
      headline: "Наименование",
      alwaysExpanded: true,
      breakpoint: "md",
    },
    {
      alwaysExpanded: true,
      headline: " ",
      breakpoint: "md",
    },
  ],
  select: false,
};

export const useActions = () => {
  //
};

export const useOfferAsyncSelect = () => {
  const offerState = reactive({
    query: "",
    list: [],
    selected: null,
  });

  const getOfferList = async () => {
    try {
      const { orig } = await RequestManager.CommercialOffer.getOfferList({ search: offerState.query });
      offerState.list = orig.results;
    } catch (e) {
      console.error("getOfferList error", { e });
    }
  };
  const selectOffer = (e: any) => (offerState.selected = e);
  return {
    offerState,
    getOfferList,
    selectOffer,
  };
};

export const useProductAsyncSelect = () => {
  const productState = reactive({
    query: "",
    list: [],
    selected: null,
  });

  const getProductList = debounce(async () => {
    try {
      const { orig } = await RequestManager.Product.getProductList({ search: productState.query });
      productState.list = orig.results;
    } catch (e) {
      console.error("getProductList error:", { e });
    }
  }, 500);

  const selectProduct = (e: any) => (productState.selected = e);

  return {
    productState,
    getProductList,
    selectProduct,
  };
};
