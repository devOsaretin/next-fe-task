import { act, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { song } from "../test/fixtures.ts";
import {
  createSearchState,
  renderWithProviders,
} from "../test/renderWithProviders.tsx";
import { ResultList } from "./ResultList.tsx";

class IntersectionObserverMock {
  static latest: IntersectionObserverMock | null = null;

  callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    IntersectionObserverMock.latest = this;
  }

  observe() {}

  disconnect() {}

  unobserve() {}

  takeRecords() {
    return [];
  }

  trigger(isIntersecting: boolean) {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
}

function songs(count: number) {
  return Array.from({ length: count }, (_, index) => song(index + 1));
}

describe("ResultList", () => {
  beforeEach(() => {
    IntersectionObserverMock.latest = null;
    vi.stubGlobal(
      "IntersectionObserver",
      IntersectionObserverMock as unknown as typeof IntersectionObserver,
    );
  });

  it("shows the first 10 results", () => {
    const results = songs(12);

    renderWithProviders(<ResultList />, {
      preloadedState: createSearchState({
        status: "succeeded",
        term: "adele",
        results,
        resultCount: results.length,
        visibleResultsCount: 10,
        hasMore: true,
      }),
    });

    expect(
      screen.getByRole("list", { name: "Search results for adele" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Song 1")).toBeInTheDocument();
    expect(screen.getByText("Song 10")).toBeInTheDocument();
    expect(screen.queryByText("Song 11")).not.toBeInTheDocument();
  });

  it("reveals the next results when the sentinel intersects", () => {
    const results = songs(12);

    renderWithProviders(<ResultList />, {
      preloadedState: createSearchState({
        status: "succeeded",
        term: "adele",
        results,
        resultCount: results.length,
        visibleResultsCount: 10,
        hasMore: true,
      }),
    });

    act(() => {
      IntersectionObserverMock.latest?.trigger(true);
    });

    expect(screen.getByText("Song 12")).toBeInTheDocument();
  });

  it("tells the user when a search has no results", () => {
    renderWithProviders(<ResultList />, {
      preloadedState: createSearchState({
        status: "succeeded",
        term: "adele",
      }),
    });

    expect(screen.getByRole("status")).toHaveTextContent(
      "No results for “adele”.",
    );
  });

  it("does not show the empty message while loading", () => {
    renderWithProviders(<ResultList />, {
      preloadedState: createSearchState({
        status: "loading",
        term: "adele",
      }),
    });

    expect(screen.getByRole("progressbar", { name: "Searching" })).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows an error when the search fails", () => {
    renderWithProviders(<ResultList />, {
      preloadedState: createSearchState({
        status: "failed",
        term: "adele",
      }),
    });

    expect(screen.getByRole("status")).toHaveTextContent(
      "Search failed. Try again.",
    );
  });
});
