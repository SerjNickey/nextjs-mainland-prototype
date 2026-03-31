import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./registrationSlice";
import homePageReducer from "./homePageSlice";
import basePageReducer from "./basePageSlice";
import sochiPageReducer from "./sochiPageSlice";
import promosPageReducer from "./promosPageSlice";
import { registrationApi } from "./registrationApi";
import { homePageApi } from "./homePageApi";
import { basePageApi } from "./basePageApi";
import { mainMenuApi } from "./mainMenuApi";
import { sochiPageApi } from "./sochiPageApi";
import { promosPageApi } from "./promosPageApi";
import { pokerSchoolPageApi } from "./pokerSchoolPageApi";

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    homePage: homePageReducer,
    basePage: basePageReducer,
    sochiPage: sochiPageReducer,
    promosPage: promosPageReducer,
    [registrationApi.reducerPath]: registrationApi.reducer,
    [homePageApi.reducerPath]: homePageApi.reducer,
    [basePageApi.reducerPath]: basePageApi.reducer,
    [mainMenuApi.reducerPath]: mainMenuApi.reducer,
    [sochiPageApi.reducerPath]: sochiPageApi.reducer,
    [promosPageApi.reducerPath]: promosPageApi.reducer,
    [pokerSchoolPageApi.reducerPath]: pokerSchoolPageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      registrationApi.middleware,
      homePageApi.middleware,
      basePageApi.middleware,
      mainMenuApi.middleware,
      sochiPageApi.middleware,
      promosPageApi.middleware,
      pokerSchoolPageApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
