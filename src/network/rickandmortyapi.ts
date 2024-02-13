import axios, { AxiosResponse } from 'axios';
import { CaracterModel, CaracterResponseModel, GetCaracterFilterModel } from 'src/models/CaracterModels';
import { EpisodeModel, EpisodeResponseModel } from 'src/models/EpidodeModels';


const getCaracters = (
  filter: GetCaracterFilterModel) =>

  axios.get<CaracterResponseModel>(
    'https://rickandmortyapi.com/api/character',
    {
      params: filter,
    })

const getEpisodes = (currentPage: number) => axios.get<EpisodeResponseModel>(
  'https://rickandmortyapi.com/api/episode',
  {
    params: {
      page: currentPage,
    },
  }
)

const getEpisodesByIds = (ids: (number | string)[]) => axios.get<EpisodeModel | EpisodeModel[]>(
  `https://rickandmortyapi.com/api/episode/${ids.join(',')}`
)

export const rickAndMortyApi = {
  getCaracters,
  getEpisodes,
  getEpisodesByIds
}
