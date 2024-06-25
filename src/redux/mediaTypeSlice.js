import { createSlice } from "@reduxjs/toolkit";

const mediaTypeSlice = createSlice({
  name: "mediaType",
  initialState: {
    type: "movies",
  },
  reducers: {
    changeMediaType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { changeMediaType } = mediaTypeSlice.actions;

export default mediaTypeSlice.reducer;
