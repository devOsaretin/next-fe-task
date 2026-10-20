import { createSlice } from "@reduxjs/toolkit";
import type { SearchResult, SearchStatus } from "../../types.ts";
import { searchItunes } from "./searchThunks.ts";

const PAGE_SIZE = 10;

export interface SearchState {
  term: string;
  visibleResultsCount: number;
  results: SearchResult[];
  status: SearchStatus;
  hasMore: boolean;
  searchId: string;
}

const initialState: SearchState = {
  term: "",
  visibleResultsCount: 0,
  results: [],
  status: "idle",
  hasMore: false,
  searchId: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    showMore: state => {
      state.visibleResultsCount = Math.min(
        state.visibleResultsCount + PAGE_SIZE,
        state.results.length,
      );
      state.hasMore = state.visibleResultsCount < state.results.length;
    },
  },
  extraReducers: builder => {
    builder.addCase(searchItunes.pending, (state, action) => {
      state.status = "loading";
      state.term = action.meta.arg;
      state.searchId = action.meta.requestId;
    });

    builder.addCase(searchItunes.fulfilled, (state, action) => {
      if (state.searchId !== action.meta.requestId) return;
      state.status = "succeeded";
      state.results = action.payload.results;
      state.visibleResultsCount = Math.min(
        PAGE_SIZE,
        action.payload.results.length,
      );
      state.hasMore = action.payload.results.length > state.visibleResultsCount;
    });

    builder.addCase(searchItunes.rejected, (state, action) => {
      if (state.searchId !== action.meta.requestId) return;
      state.status = "failed";
    });
  },
});

export const searchReducer = searchSlice.reducer;
export const { showMore } = searchSlice.actions;
