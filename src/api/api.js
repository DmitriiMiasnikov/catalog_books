import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/'
})

export const getAnimationListApi = async (page, counter, sort, filter, search, userId, userFilter) => {
  const res = await instance.get(`animation/list/${page}?counter=${counter}&sort=${sort}&filter=${filter}&search=${search}&userId=${userId}&userFilter=${userFilter}`);
  return res;
}

export const getAnimationApi = async (animationId) => {
  const res = await instance.get(`animation/id/${animationId}`);
  return res.data.selectedAnimation;
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