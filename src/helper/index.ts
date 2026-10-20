import type { ItunesItem } from "../server/type.ts";
import type { SearchResult } from "../types.ts";

export const toSearchResult = (item: ItunesItem): SearchResult | null => {
  if (
    item.wrapperType === "artist" &&
    item.artistId != null &&
    item.artistName
  ) {
    return {
      kind: "musicArtist",
      id: item.artistId,
      name: item.artistName,
      genre: item.primaryGenreName ?? null,
    };
  }

  if (
    item.wrapperType === "collection" &&
    item.collectionType === "Album" &&
    item.collectionId != null &&
    item.collectionName
  ) {
    return {
      kind: "album",
      id: item.collectionId,
      name: item.collectionName,
      artistName: item.artistName ?? "",
      artworkUrl: item.artworkUrl100 ?? null,
      genre: item.primaryGenreName ?? null,
    };
  }

  if (
    item.wrapperType === "track" &&
    item.kind === "song" &&
    item.trackId != null &&
    item.trackName
  ) {
    return {
      kind: "song",
      id: item.trackId,
      name: item.trackName,
      artistName: item.artistName ?? "",
      albumName: item.collectionName ?? null,
      artworkUrl: item.artworkUrl100 ?? null,
      genre: item.primaryGenreName ?? null,
    };
  }

  return null;
};
