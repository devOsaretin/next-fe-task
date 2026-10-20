import type { ItunesSearchResponse } from "./type.ts";
import { toSearchResult } from "../helper/index.ts";
import type { SearchResponse } from "../types.ts";

const ITUNES_SEARCH_URL = "https://itunes.apple.com/search";
const ENTITIES = "musicArtist,album,song";

export async function searchItunes(query: string): Promise<SearchResponse> {
  if (!query.trim()) {
    throw new Error("Search term must not be empty");
  }
  const params = new URLSearchParams({
    term: query,
    media: "music",
    entity: ENTITIES,
  });

  try {
    const response = await fetch(`${ITUNES_SEARCH_URL}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as ItunesSearchResponse;

    const results = data.results.flatMap((item) => {
      const result = toSearchResult(item);
      return result ? [result] : [];
    });
    return {
      resultCount: results.length,
      results,
    };
  } catch (error) {
    console.error("Error searching iTunes:", error);
    throw error;
  }
}
