import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isEditing: false,
    editedFirstName: "",
    editedLastName: "",
    email: "",
    password: "",
    rememberMe: false,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {


            state.user = {
                id: action.payload.id || null,
                firstName: action.payload.firstName || "Unknown",
                lastName: action.payload.lastName || "User",
                email: action.payload.email || "",
                token: action.payload.token || "",
            };
        },

        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
        logoutUser: (state) => {
            state.user = null;
            state.isEditing = false;
            state.editedFirstName = "";
            state.editedLastName = "";
            state.email = "";
            state.password = "";
            state.rememberMe = false;
            state.error = null;
        },
        startEditing: (state) => {
            state.isEditing = true;
            state.editedFirstName = state.user.firstName;
            state.editedLastName = state.user.lastName;
        },
        cancelEditing: (state) => {
            state.isEditing = false;
        },
        updateEditedFields: (state, action) => {
            state.editedFirstName = action.payload.firstName;
            state.editedLastName = action.payload.lastName;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setRememberMe: (state, action) => {
            state.rememberMe = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    setUser,
    updateUser,
    logoutUser,
    startEditing,
    cancelEditing,
    updateEditedFields,
    setEmail,
    setPassword,
    setRememberMe,
    setError,
} = userSlice.actions;
export default userSlice.reducer;
