import { ThemeProvider, createTheme } from "@mui/material/styles";
import { render, type RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import {
  searchReducer,
  type SearchState,
} from "../store/searchSlice.ts";

const theme = createTheme();

export function createSearchState(
  overrides: Partial<SearchState> = {},
): SearchState {
  return {
    term: "",
    visibleResultsCount: 0,
    results: [],
    status: "idle",
    hasMore: false,
    searchId: "",
    ...overrides,
  };
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    ...options
  }: { preloadedState?: SearchState } & Omit<RenderOptions, "wrapper"> = {},
) {
  const store = configureStore({
    reducer: { search: searchReducer },
    preloadedState: preloadedState ? { search: preloadedState } : undefined,
  });

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...options }) };
}
