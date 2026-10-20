/**
 * @vitest-environment node
 */
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./itunes.ts", () => ({
  searchItunes: vi.fn(),
}));

import { song } from "../client/test/fixtures.ts";
import type { SearchResponse } from "../types.ts";
import { app } from "./app.ts";
import { searchItunes } from "./itunes.ts";

const search = vi.mocked(searchItunes);

async function listen(): Promise<{ origin: string; close: () => Promise<void> }> {
  const server: Server = createServer(app);

  await new Promise<void>(resolve => {
    server.listen(0, "127.0.0.1", () => resolve());
  });

  const { port } = server.address() as AddressInfo;

  return {
    origin: `http://127.0.0.1:${port}`,
    close: () =>
      new Promise((resolve, reject) => {
        server.close(error => (error ? reject(error) : resolve()));
      }),
  };
}

describe("GET /api/search", () => {
  let origin = "";
  let close: () => Promise<void> = async () => {};

  beforeEach(async () => {
    search.mockReset();
    const server = await listen();
    origin = server.origin;
    close = server.close;
  });

  afterEach(async () => {
    await close();
  });

  it("rejects a missing or blank term", async () => {
    const missing = await fetch(`${origin}/api/search`);
    const blank = await fetch(`${origin}/api/search?term=%20%20`);

    expect(missing.status).toBe(400);
    expect(await missing.json()).toEqual({ error: "Search term is required" });
    expect(blank.status).toBe(400);
    expect(search).not.toHaveBeenCalled();
  });

  it("returns the mapped search response for a trimmed term", async () => {
    const body: SearchResponse = {
      resultCount: 1,
      results: [{ ...song(2, "Someone Like You"), url: "https://www.osaretin.dev" }],
    };
    search.mockResolvedValue(body);

    const response = await fetch(`${origin}/api/search?term=%20adele%20`);

    expect(search).toHaveBeenCalledWith("adele");
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(body);
  });

  it("returns 502 when iTunes search fails", async () => {
    search.mockRejectedValue(new Error("itunes down"));

    const response = await fetch(`${origin}/api/search?term=adele`);

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      error: "Search failed or service unavailable",
    });
  });
});
