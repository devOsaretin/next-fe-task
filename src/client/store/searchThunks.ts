import { createAsyncThunk } from "@reduxjs/toolkit";
import type { SearchResponse } from "../../types";

export const searchItunes = createAsyncThunk<SearchResponse, string>(
  "search/itunes",
  async (term: string) => {
    const response = await fetch(
      `/api/search?term=${encodeURIComponent(term)}`,
    );
    if (!response.ok) {
      throw new Error("Failed to search iTunes");
    }
    return response.json();
  },
);
