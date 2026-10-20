import { createSlice } from "@reduxjs/toolkit";
import type { SearchEntity, SearchResult, SearchStatus } from "../../types.ts";

export interface SearchState {
  term: string;
  entity: SearchEntity;
  results: SearchResult[];
  status: SearchStatus;
  error: string | null;
  loadMoreError: string | null;
  hasMore: boolean;
  searchId: number;
}

const initialState: SearchState = {
  term: "",
  entity: "song",
  results: [],
  status: "idle",
  error: null,
  loadMoreError: null,
  hasMore: false,
  searchId: 0,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
});

export const searchReducer = searchSlice.reducer;
