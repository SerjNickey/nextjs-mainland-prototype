import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface HomePageState {
  data: any;
  isLoading: boolean;
  error: string | null;
}

const initialState: HomePageState = {
  data: null,
  isLoading: false,
  error: null,
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setHomePageData(state, action: PayloadAction<any>) {
      state.data = action.payload;
      state.error = null;
    },
    setHomePageLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setHomePageError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetHomePageState(state) {
      state.data = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setHomePageData,
  setHomePageLoading,
  setHomePageError,
  resetHomePageState,
} = homePageSlice.actions;

export default homePageSlice.reducer;
