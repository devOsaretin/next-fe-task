import { describe, expect, it } from "vitest";
import type { ItunesItem } from "../server/type.ts";
import { toSearchResult } from "./index.ts";

describe("toSearchResult", () => {
  it("maps an artist", () => {
    const item: ItunesItem = {
      wrapperType: "artist",
      artistId: 1,
      artistName: "Adele",
      primaryGenreName: "Pop",
      artistLinkUrl: "https://www.osaretin.dev",
    };

    expect(toSearchResult(item)).toEqual({
      kind: "musicArtist",
      id: 1,
      name: "Adele",
      genre: "Pop",
      url: "https://www.osaretin.dev",
    });
  });

  it("maps an album", () => {
    const item: ItunesItem = {
      wrapperType: "collection",
      collectionType: "Album",
      collectionId: 21,
      collectionName: "21",
      artistName: "Adele",
      artworkUrl100: "https://www.osaretin.dev/album.jpg",
      primaryGenreName: "Pop",
      trackCount: 12,
      collectionViewUrl: "https://www.osaretin.dev",
    };

    expect(toSearchResult(item)).toEqual({
      kind: "album",
      id: 21,
      name: "21",
      artistName: "Adele",
      artworkUrl: "https://www.osaretin.dev/album.jpg",
      genre: "Pop",
      trackCount: 12,
      url: "https://www.osaretin.dev",
    });
  });

  it("maps a song", () => {
    const item: ItunesItem = {
      wrapperType: "track",
      kind: "song",
      trackId: 2,
      trackName: "Someone Like You",
      artistName: "Adele",
      collectionName: "21",
      artworkUrl100: "https://www.osaretin.dev/song.jpg",
      primaryGenreName: "Pop",
      trackViewUrl: "https://www.osaretin.dev",
    };

    expect(toSearchResult(item)).toEqual({
      kind: "song",
      id: 2,
      name: "Someone Like You",
      artistName: "Adele",
      albumName: "21",
      artworkUrl: "https://www.osaretin.dev/song.jpg",
      genre: "Pop",
      url: "https://www.osaretin.dev",
    });
  });

  it("drops an item that is not an artist, album, or song", () => {
    const item: ItunesItem = {
      wrapperType: "track",
      kind: "music-video",
      trackId: 9,
      trackName: "Rolling in the Deep",
    };

    expect(toSearchResult(item)).toBeNull();
  });
});
