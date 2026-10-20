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
  artistLinkUrl?: string;
  artistViewUrl?: string;
  collectionViewUrl?: string;
  trackViewUrl?: string;
  artworkUrl100?: string;
  primaryGenreName?: string;
  trackCount?: number;
}

export interface ItunesSearchResponse {
  resultCount: number;
  results: ItunesItem[];
}
