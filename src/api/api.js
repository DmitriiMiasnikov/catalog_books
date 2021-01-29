import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/'
})

export const getAnimationListApi = async (page) => {
  const res = await instance.get(`animation/list/${page}`);
  return res;
}

export const getAnimationApi = async (animeId) => {
  const res = await instance.get(`animation/id/${animeId}`);
  return res.data.selectedAnimation;
}