import type { AlbumResult, ArtistResult, SongResult } from "../../types.ts";

export function artist(id: number, name: string): ArtistResult {
  return {
    kind: "musicArtist",
    id,
    name,
    genre: "Pop",
    url: null,
  };
}

export function album(id: number, name: string): AlbumResult {
  return {
    kind: "album",
    id,
    name,
    artistName: "Adele",
    artworkUrl: "https://www.osaretin.dev/album.jpg",
    genre: "Pop",
    trackCount: 12,
    url: null,
  };
}

export function song(id: number, name = `Song ${id}`): SongResult {
  return {
    kind: "song",
    id,
    name,
    artistName: "Adele",
    albumName: "21",
    artworkUrl: "https://www.osaretin.dev/song.jpg",
    genre: "Pop",
    url: null,
  };
}
