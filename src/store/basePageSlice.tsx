import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface BasePageState {
  data: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: BasePageState = {
  data: null,
  isLoading: false,
  error: null,
};

const basePageSlice = createSlice({
  name: "basePage",
  initialState,
  reducers: {
    setBasePageData(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.error = null;
    },
    setBasePageLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setBasePageError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetBasePageState(state) {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setBasePageData,
  setBasePageLoading,
  setBasePageError,
  resetBasePageState,
} = basePageSlice.actions;

export default basePageSlice.reducer;
