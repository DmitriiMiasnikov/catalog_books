import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/'
})

export const getAnimationListApi = async (page, counter, sort, filter, search) => {
  const res = await instance.get(`animation/list/${page}?counter=${counter}&sort=${sort}&filter=${filter}&search=${search}`);
  return res;
}

export const getAnimationApi = async (animeId) => {
  const res = await instance.get(`animation/id/${animeId}`);
  return res.data.selectedAnimation;
}

export const getUserApi = async (userId) => {
  const res = await instance.get(`users/id/${userId}`);
  return res;
}

export const getUsersAnimationListApi = async (userId) => {
  const res = await instance.get(`users/animation/${userId}`);
  return res;
}