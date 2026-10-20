import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  createSearchState,
  renderWithProviders,
} from "../test/renderWithProviders.tsx";
import { SearchForm } from "./SearchForm.tsx";

describe("SearchForm", () => {
  it("keeps search disabled until there is a term", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    renderWithProviders(<SearchForm />);

    const button = screen.getByRole("button", { name: "Search" });
    expect(button).toBeDisabled();

    await user.type(screen.getByRole("textbox", { name: "Search music" }), "   ");

    expect(button).toBeDisabled();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("submits the trimmed term and shows a loading state", async () => {
    const user = userEvent.setup();
    let resolveSearch: (response: Response) => void = () => {};
    const fetchMock = vi.fn(
      () =>
        new Promise<Response>(resolve => {
          resolveSearch = resolve;
        }),
    );
    vi.stubGlobal("fetch", fetchMock);
    renderWithProviders(<SearchForm />);

    await user.type(
      screen.getByRole("textbox", { name: "Search music" }),
      "  adele  ",
    );
    await user.click(screen.getByRole("button", { name: "Search" }));

    expect(fetchMock).toHaveBeenCalledWith("/api/search?term=adele");
    expect(screen.getByRole("button", { name: "Searching…" })).toBeDisabled();
    expect(screen.getByRole("textbox", { name: "Search music" })).toBeDisabled();
    expect(screen.getByRole("form", { name: "Search music" })).toHaveAttribute(
      "aria-busy",
      "true",
    );

    resolveSearch({
      ok: true,
      json: async () => ({ resultCount: 0, results: [] }),
    } as Response);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Search" })).toBeEnabled();
    });
  });

  it("disables the form while a search is already loading", () => {
    renderWithProviders(<SearchForm />, {
      preloadedState: createSearchState({ status: "loading", term: "adele" }),
    });

    expect(screen.getByRole("textbox", { name: "Search music" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Searching…" })).toBeDisabled();
  });
});
