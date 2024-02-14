import axios from 'axios';
import {
  CharacterResponseModel,
  GetCharacterFilterModel,
} from 'src/models/CharacterModels';
import { EpisodeModel, EpisodeResponseModel } from 'src/models/EpidodeModels';
import { indexDb } from 'src/IndexDb/IndexedDB';

const getCharacters = async (filter: GetCharacterFilterModel) => {
  const data = await axios.get<CharacterResponseModel>(
    'https://rickandmortyapi.com/api/character',
    {
      params: filter,
    }
  );
  await indexDb.setBatch(data.data.results);
  return data;
};

const getEpisodes = (currentPage: number) =>
  axios.get<EpisodeResponseModel>('https://rickandmortyapi.com/api/episode', {
    params: {
      page: currentPage,
    },
  });

const getEpisodesByIds = (ids: (number | string)[]) =>
  axios.get<EpisodeModel | EpisodeModel[]>(
    `https://rickandmortyapi.com/api/episode/${ids.join(',')}`
  );

export const rickAndMortyApi = {
  getCharacters,
  getEpisodes,
  getEpisodesByIds,
};
