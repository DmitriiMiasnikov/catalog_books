import * as axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/'
})

export const getAnimationListApi = async () => {
  const res = await instance.get('animation');
  return res.data.animation;
}