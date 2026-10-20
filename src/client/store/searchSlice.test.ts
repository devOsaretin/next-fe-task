import { describe, expect, it } from "vitest";
import { song } from "../test/fixtures.ts";
import { searchReducer, showMore } from "./searchSlice.ts";
import { searchItunes } from "./searchThunks.ts";

const songs = Array.from({ length: 12 }, (_, index) => song(index + 1));

describe("searchReducer", () => {
  it("opens a successful search at the first 10 results", () => {
    const loading = searchReducer(
      undefined,
      searchItunes.pending("current", "adele"),
    );

    const state = searchReducer(
      loading,
      searchItunes.fulfilled(
        { resultCount: songs.length, results: songs },
        "current",
        "adele",
      ),
    );

    expect(state.status).toBe("succeeded");
    expect(state.visibleResultsCount).toBe(10);
    expect(state.hasMore).toBe(true);
    expect(state.results).toHaveLength(12);
  });

  it("reveals the remaining results and then stops", () => {
    const loaded = searchReducer(
      searchReducer(undefined, searchItunes.pending("current", "adele")),
      searchItunes.fulfilled(
        { resultCount: songs.length, results: songs },
        "current",
        "adele",
      ),
    );

    const state = searchReducer(loaded, showMore());

    expect(state.visibleResultsCount).toBe(12);
    expect(state.hasMore).toBe(false);
  });

  it("records an empty result set", () => {
    const state = searchReducer(
      searchReducer(undefined, searchItunes.pending("current", "zzzz")),
      searchItunes.fulfilled(
        { resultCount: 0, results: [] },
        "current",
        "zzzz",
      ),
    );

    expect(state.status).toBe("succeeded");
    expect(state.results).toEqual([]);
    expect(state.visibleResultsCount).toBe(0);
    expect(state.hasMore).toBe(false);
  });

  it("ignores a result from an older search", () => {
    const current = searchReducer(
      undefined,
      searchItunes.pending("current", "adele"),
    );
    const newer = searchReducer(
      current,
      searchItunes.pending("newer", "coldplay"),
    );

    const fulfilled = searchReducer(
      newer,
      searchItunes.fulfilled(
        { resultCount: songs.length, results: songs },
        "current",
        "adele",
      ),
    );
    const rejected = searchReducer(
      newer,
      searchItunes.rejected(new Error("failed"), "current", "adele"),
    );

    expect(fulfilled.status).toBe("loading");
    expect(fulfilled.term).toBe("coldplay");
    expect(fulfilled.results).toEqual([]);
    expect(rejected.status).toBe("loading");
    expect(rejected.results).toEqual([]);
  });
});
