import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 auth:{
  profile: null,
  auth:false
 }
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveProfile: (state, action) => {
      state.profile = action.payload.profile;
      state.auth = action.payload.auth;
    }
    ,

    resetProfile: (state) => {
      state.profile = null;
        state.auth =false
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveProfile, resetProfile } = authSlice.actions;

export default authSlice.reducer;