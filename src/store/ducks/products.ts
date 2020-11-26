import { createActions, createReducer } from 'reduxsauce';

import { IProductState } from "../../interfaces";
import product from '../../pages/product';

const INITIAL_STATE: IProductState = {
  products: []
}

const importProducts = (state = INITIAL_STATE, action: any) => {
  state.products = [];
  const arrayWithDuplicatesRemoved = [...new Map(action.value.map(product => [product.barcodeA, product])).values()];
  state.products = arrayWithDuplicatesRemoved;
  return { ...state };
}

const updateProduct = (state = INITIAL_STATE, action: any) => {
  state.products[action.index] = action.product;
  if (action.isCount) {
    state.products.splice(0, 0, state.products.splice(action.index, 1)[0]);
  } else if (action.deletedAll) {
    state.products.splice(state.products.length - 1, 0, state.products.splice(action.index, 1)[0]);
  } else {
    state.products = state.products.sort((a, b) => {
      const timestampA = a.counts[a.counts.length - 1].timestamp;
      const timestampB = b.counts[b.counts.length - 1].timestamp;
      return timestampB - timestampA;
    });
  }

  return { ...state };
}

// Making Types and Creators
export const { Types, Creators } = createActions({
  importProducts: ['value'],
  updateProduct: ['product', 'index', 'isCount', 'deletedAll']
});

// Making reducer
export default createReducer(INITIAL_STATE, {
  [Types.IMPORT_PRODUCTS]: importProducts,
  [Types.UPDATE_PRODUCT]: updateProduct,
});

const utils = {

}
