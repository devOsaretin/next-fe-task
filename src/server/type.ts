export interface ItunesItem {
  wrapperType?: string;
  kind?: string;
  collectionType?: string;
  artistId?: number;
  collectionId?: number;
  trackId?: number;
  artistName?: string;
  collectionName?: string;
  trackName?: string;
  artworkUrl100?: string;
  primaryGenreName?: string;
}

export interface ItunesSearchResponse {
  results: ItunesItem[];
}
