import URLAnimation from './../assets/data.json';

export const getAnimationApi = async () => {
  // const res = await fetch(URLAnimation);
  const res = URLAnimation;
  return res;
}