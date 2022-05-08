import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLaunches = createAsyncThunk(
  "launch/fetchLaunches",
  async () => {
    const response = await fetch("https://api.spacexdata.com/v3/launches").then(
      (res) => res.json()
    );
    return response;
  }
);

const launchesSlice = createSlice({
  name: "launches",
  initialState: {
    launches: [],
  },
  reducers: {
    showLaunches: (state, { payload }) => {
      state.launches.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLaunches.fulfilled, (state, action) => {
      state.launches = action.payload;
    });
  },
});

export const { showLaunches } = launchesSlice.actions;

export default launchesSlice.reducer;
