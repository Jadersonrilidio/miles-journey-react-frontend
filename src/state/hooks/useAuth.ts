import { useRecoilState } from "recoil"
import { authenticationState, userState } from "../atom"
import { REACT_APP_BASE_URL, REACT_APP_STORAGE_ACCESS_TOKEN_KEY } from "../../../globals.ts";
import http from "../../http/index.ts";
import APIResponseSchema from "../../interfaces/APIResponseSchema.ts";
import IUser from "../../interfaces/IUser.ts";

const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authenticationState);
  const [user, setUser] = useRecoilState(userState);

  const register = async (username: string, email: string, password: string, file: string | File | null): Promise<boolean> => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    };

    const formData = new FormData();
    formData.append('name', username);
    formData.append('email', email);
    formData.append('password', password);

    if (file) {
      formData.append("picture", file);
    }

    try {
      const response = await http.post<APIResponseSchema<any>>('/auth/register', formData, config);

      persistToken(response.data.data.access_token);
      getUserData();
      return true;
    } catch (error) {
      console.log(error);
    }

    return false;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const response = await http.post<APIResponseSchema<any>>('/auth/login', formData);

      persistToken(response.data.data.access_token);
      getUserData();
      return true;
    } catch (error) {
      console.log(error);
    }

    return false;
  };

  const logout = () => {
    clearToken();
    setUser(undefined);
  };

  const getUserData = () => {
    http.get<APIResponseSchema<IUser>>('/auth/me')
      .then(response => {
        setUser(response.data.data ? {
          ...response.data.data,
          picture: response.data.data.picture ? REACT_APP_BASE_URL + `/${response.data.data.picture}` : null,
        } as IUser : undefined);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const persistToken = (access_token: string): void => {
    sessionStorage.setItem(REACT_APP_STORAGE_ACCESS_TOKEN_KEY, access_token);
    setAuth(true);
  };

  const getToken = (): string | null => {
    return sessionStorage.getItem(REACT_APP_STORAGE_ACCESS_TOKEN_KEY);
  };

  const clearToken = (): void => {
    sessionStorage.removeItem(REACT_APP_STORAGE_ACCESS_TOKEN_KEY);
    setAuth(false);
  };

  return {
    auth,
    token: getToken(),
    user,
    register,
    login,
    logout,
  };
};

export default useAuth;
