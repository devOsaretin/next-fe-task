export type SearchEntity = "musicArtist" | "album" | "song";

export type SearchStatus =
  | "idle"
  | "loading"
  | "loadingMore"
  | "succeeded"
  | "failed";

export interface ArtistResult {
  kind: "musicArtist";
  id: number;
  name: string;
  genre: string | null;
  url: string | null;
}

export interface AlbumResult {
  kind: "album";
  id: number;
  name: string;
  artistName: string;
  artworkUrl: string | null;
  genre: string | null;
  trackCount: number | null;
  url: string | null;
}

export interface SongResult {
  kind: "song";
  id: number;
  name: string;
  artistName: string;
  albumName: string | null;
  artworkUrl: string | null;
  genre: string | null;
  url: string | null;
}

export type SearchResult = ArtistResult | AlbumResult | SongResult;

export interface SearchResponse {
  resultCount: number;
  results: SearchResult[];
}
