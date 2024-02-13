export type CaracterResponseModel = {
  info?: MetaResponseModel;
  results: CaracterModel[];
}

export type MetaResponseModel = {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export type CaracterModel = {
  id: number;
  name: string;
  status: Status;
  species: Species;
  type: string;
  gender: Gender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export type Gender =
  | 'Female'
  | 'Male'
  | 'unknown'
  | 'Genderless'


export type Location = {
  name: string;
  url: string;
}

export type Species =
  | 'Alien'
  | 'Human'


export type Status =
  | 'Alive'
  | 'Dead'
  | 'unknown'

export type GetCaracterFilterModel = {
  name?: string,
  status?: Status,
  species?: Species,
  gender?: Gender
  page?: number
}

