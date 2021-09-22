import httpClient from '../http-client';
import User from '../models/user';

const getMe = async () => {
  return (await httpClient.get<User>('/user')).data;
};

export { getMe };
