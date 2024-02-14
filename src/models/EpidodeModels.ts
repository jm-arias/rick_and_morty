export type EpisodeResponseModel = {
  info: Info;
  results: EpisodeModel[];
};

export type Info = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};

export type EpisodeModel = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};
