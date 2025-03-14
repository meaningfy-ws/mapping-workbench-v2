import { post } from '../app/index';

const STORAGE_KEY = 'users';

// NOTE: We use sessionStorage since memory storage is lost after page reload.
//  This should be replaced with a server call that returns DB persisted data.

const getPersistedUsers = () => {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
};

const persistUser = (user) => {
  try {
    const users = getPersistedUsers();
    const data = JSON.stringify([...users, user]);
    sessionStorage.setItem(STORAGE_KEY, data);
  } catch (err) {
    console.error(err);
  }
};

class AuthApi {
  async signIn(request) {
    try {
      const res = await post('/api/login', request);
      // return { accessToken: res };
      const accessToken = res;
      return { accessToken };
    } catch (err) {
      console.error('[Auth Api]: ', err.message);
      throw err
    }
  }

  async signUp(request) {
    try {
      const res = await post('/api/register', request);
      const accessToken = res;
      return { accessToken };
    } catch (err) {
      console.error('[Auth Api]: ', err.message);
    }
  }

  async me(request) {
    const { accessToken } = request;

    try {
      const res = await post('/api/me', { accessToken });
      return res;
    } catch (err) {
      console.error(err);
    }
  }
}

export const authApi = new AuthApi();
