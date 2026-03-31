import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SochiPageState {
  data: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: SochiPageState = {
  data: null,
  isLoading: false,
  error: null,
};

const sochiPageSlice = createSlice({
  name: "sochiPage",
  initialState,
  reducers: {
    setSochiPageData(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.error = null;
    },
    setSochiPageLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setSochiPageError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetSochiPageState(state) {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setSochiPageData,
  setSochiPageLoading,
  setSochiPageError,
  resetSochiPageState,
} = sochiPageSlice.actions;

export default sochiPageSlice.reducer;
