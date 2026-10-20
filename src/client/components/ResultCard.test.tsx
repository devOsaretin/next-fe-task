import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { album, artist, song } from "../test/fixtures.ts";
import { ResultCard } from "./ResultCard.tsx";

describe("ResultCard", () => {
  it("shows an artist name and genre without artwork", () => {
    render(<ResultCard result={artist(1, "Adele")} />);

    expect(screen.getByText("Adele")).toBeInTheDocument();
    expect(screen.getByText("Pop")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("shows a song title, artist, album, and named artwork", () => {
    render(<ResultCard result={song(2, "Someone Like You")} />);

    expect(screen.getByText("Someone Like You")).toBeInTheDocument();
    expect(screen.getByText("Adele · 21")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Someone Like You" }),
    ).toHaveAttribute("src", "https://www.osaretin.dev/song.jpg");
  });

  it("shows an album title, artist, and genre", () => {
    render(<ResultCard result={album(3, "21")} />);

    expect(screen.getByText("21")).toBeInTheDocument();
    expect(screen.getByText("Adele · Pop")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "21" })).toBeInTheDocument();
  });
});
