import { createContext, useContext, useEffect, useState } from "react"

interface AuthContextType {
  auth: boolean
  setAuth: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

AuthContext.displayName = 'Auth';

interface AuthProviderProps {
  children: React.ReactNode
}

/** Key name used to store the token at session storage. */
const key: string = 'access_token';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps): JSX.Element => {
  const [auth, setAuth] = useState<boolean>(sessionStorage.getItem(key) != null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export interface AuthHookProperties {
  auth: boolean
  persistToken: (access_token: string) => boolean
  getToken: () => string | null
  clearToken: () => boolean
}

/**
 * Custom Authentication hook.
 * 
 * @property auth - TRUE if user is logged, FALSE otherwise.
 * @method persistToken(access_token: string): boolean - Save the auth token on session storage.
 * @method getToken(): string|null - Retrieve the auth token from session storage.
 * @method clearToken(): boolean - Remove the auth token from session storage.
 * 
 * @returns AuthHookProperties
 */
const useAuth = (): AuthHookProperties => {
  const context = useContext(AuthContext);

  useEffect(() => {
    context?.setAuth(hasToken());
  }, [context]);

  const persistToken = (access_token: string): boolean => {
    sessionStorage.setItem(key, access_token);
    context?.setAuth(true);

    return context?.auth ?? false;
  };

  const hasToken = (): boolean => {
    return getToken() != null;
  }

  const getToken = (): string | null => {
    return sessionStorage.getItem(key);
  };

  const clearToken = (): boolean => {
    sessionStorage.removeItem(key);
    context?.setAuth(false);

    return !context?.auth;
  };

  return {
    auth: context?.auth ?? false,
    persistToken,
    getToken,
    clearToken,
  };
}

export default useAuth;
