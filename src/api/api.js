import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/'
})

export const getAnimationListApi = async (page, counter, sort, filter, search, userId, userFilter) => {
  const res = await instance.get(`animation/list/${page}?counter=${counter}&sort=${sort}&filter=${filter}&search=${search}&userId=${userId}&userFilter=${userFilter}`);
  return res;
}

export const getListApi = async (listName, page, counter, sort, filter, search, userId, userFilter) => {
  const res = await instance.get(`list/${page}?listName=${listName}&counter=${counter}&sort=${sort}&filter=${filter}&search=${search}&userId=${userId}&userFilter=${userFilter}`);
  return res;
}
export const getDescriptionApi = async (listName, id, userId) => {
  const res = await instance.get(`list/id/${id}?listName=${listName}&userId=${userId}`);
  return res.data.selectedDescription;
}
export const getRandomOneApi = async () => {
  const res = await instance.get(`list/randomId`);
  return res.data.randomItems;
}

export const getAnimationApi = async (animationId, userId) => {
  const res = await instance.get(`animation/id/${animationId}?userId=${userId}`);
  return res.data.selectedAnimation;
}

export const getRandomAnimationApi = async () => {
  const res = await instance.get(`animation/randomId`);
  return res.data.randomAnimation;
}

export const getUsersListApi = async () => {
  const res = await instance.get(`users/`);
  return res;
}
export const getUsersListMenuApi = async () => {
  const res = await instance.get(`users/menu/`);
  return res;
}

export const getUserApi = async (userId) => {
  const res = await instance.get(`users/id/${userId}`);
  return res;
}

export const getUsersAnimationListApi = async (userId) => {
  const res = await instance.get(`users/id/animation/${userId}`);
  return res;
}
export const getLastViewedListApi = async (userId) => {
  const res = await instance.get(`users/id/lastViewed/${userId}`);
  return res;
}

export const setUsersAnimationApi = async (userId, animationId, type, rating) => {
  const res = await instance.put(`users/id/animation/${userId}?animationId=${animationId}&type=${type}&rating=${rating}`);
  return res;
}

export const userRegistrationApi = async (userName, password, email) => {
  const res = await instance.post(`users/registration/?userName=${userName}&password=${password}&email=${email}`);
  return res;
}

export const userAuthorizationApi = async (userName, password) => {
  const res = await instance.get(`users/authorization/?userName=${userName}&password=${password}`);
  return res;
}