import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/sliceuser";


const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

export default store;

