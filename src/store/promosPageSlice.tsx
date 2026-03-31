import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PromosPageState {
  data: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: PromosPageState = {
  data: null,
  isLoading: false,
  error: null,
};

const promosPageSlice = createSlice({
  name: "promosPage",
  initialState,
  reducers: {
    setPromosPageData(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.error = null;
    },
    setPromosPageLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPromosPageError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetPromosPageState(state) {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setPromosPageData,
  setPromosPageLoading,
  setPromosPageError,
  resetPromosPageState,
} = promosPageSlice.actions;

export default promosPageSlice.reducer;
