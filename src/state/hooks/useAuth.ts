import { useRecoilState } from "recoil"
import { authenticationState } from "../atom"
import { REACT_APP_STORAGE_ACCESS_TOKEN_KEY } from "../../../globals.ts";

const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authenticationState);

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
    persistToken,
    getToken,
    clearToken,
  };
};

export default useAuth;
