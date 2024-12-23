import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    mainRoute: false,
    searchRoute: {
      isSearching: false,
      results: [],
    },
    profile: [],
    compHide: false,
  },
  reducers: {
    home: (state, action) => {
      state.mainRoute = action.payload;
    },
    startSearch: (state, action) => {
      state.searchRoute.isSearching = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchRoute.results = action.payload;
    },
    profile: (state, action) => {
      state.profile = action.payload;
    },
    componentHide: (state, action) => {
      state.compHide = action.payload;
    },
  },
});

export const { home, startSearch, setSearchResults, profile, componentHide } =
  configSlice.actions;
export default configSlice.reducer;
