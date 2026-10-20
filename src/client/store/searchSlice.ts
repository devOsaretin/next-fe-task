import { createSlice } from "@reduxjs/toolkit";
import type { SearchEntity, SearchResult, SearchStatus } from "../../types.ts";
import { searchItunes } from "./searchThunks.ts";

export interface SearchState {
  term: string;
  entity: SearchEntity;
  resultCount: number;
  results: SearchResult[];
  status: SearchStatus;
  error: string | null;
  loadMoreError: string | null;
  hasMore: boolean;
  searchId: string;
}

const initialState: SearchState = {
  term: "",
  entity: "song",
  resultCount: 0,
  results: [],
  status: "idle",
  error: null,
  loadMoreError: null,
  hasMore: false,
  searchId: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
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
      state.resultCount = action.payload.resultCount;
    });

    builder.addCase(searchItunes.rejected, (state, action) => {
      if (state.searchId !== action.meta.requestId) return;
      state.status = "failed";
    });
  },
});

export const searchReducer = searchSlice.reducer;
