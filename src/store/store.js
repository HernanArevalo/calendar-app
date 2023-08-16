import { configureStore } from "@reduxjs/toolkit";

import { authSlice } from "./auth/authSlice";
import { calendarSlice } from "./calendar/calendarSlice";
import { uiSlice } from "./ui/uiSlice";



export const store = configureStore({
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    reducer: {
      auth: authSlice.reducer,
      calendar: calendarSlice.reducer,
      ui: uiSlice.reducer,
    }
})