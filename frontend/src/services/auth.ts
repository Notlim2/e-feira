import httpClient from '../http-client';

const signIn = async (email: string, password: string) => {
  return (await httpClient.post(`/user/auth`, { email, password })).data;
};

export { signIn };
