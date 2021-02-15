import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/'
})

export const getListApi = async (listName, page, counter, sort, filter, search, userId, userFilter) => {
  const res = await instance.get(`list/${page}?listName=${listName}&counter=${counter}&sort=${sort}&filter=${filter}&search=${search}&userId=${userId}&userFilter=${userFilter}`);
  return res;
}
export const getDescriptionApi = async (listName, id, userId) => {
  const res = await instance.get(`list/id/${id}?listName=${listName}&userId=${userId}`);
  return res.data.selectedDescription;
}
export const getRandomOneApi = async () => {
  const res = await instance.get(`list/randomItems/id`);
  return res.data.randomItems;
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

export const getUserListItemsApi = async (userId) => {
  const res = await instance.get(`users/id/listItems/${userId}`);
  return res;
}

export const getLastViewedListApi = async (userId) => {
  const res = await instance.get(`users/id/lastViewed/${userId}`);
  return res;
}

export const setUserInfoListsApi = async (userId, list, id, type) => {
  const res = await instance.put(`users/userList/id/${userId}?list=${list}&id=${id}&type=${type}`);
  return res;
}
export const setUserFavoritesApi = async (userId, list, id, rating) => {
  const res = await instance.put(`users/favorites/id/${userId}?list=${list}&id=${id}&rating=${rating}`);
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