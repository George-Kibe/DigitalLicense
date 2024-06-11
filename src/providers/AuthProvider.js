/* eslint-disable react/react-in-jsx-scope */
import {createContext, useContext, useEffect, useState} from 'react';
import {getCurrentUser, fetchAuthSession} from 'aws-amplify/auth';

const AuthContext = createContext({});

export function AuthProvider({children}) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  const getUserDetails = async () => {
    try {
      const currentUser = await getCurrentUser();
      const authSession = await fetchAuthSession();
      setSession(authSession);
      setUser(currentUser);
      const {userSub} = authSession;
      console.log('userSub', userSub);
    } catch (error) {
      console.log('Error', error.message);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        session,
        setSession,
        user,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthProvider = () => useContext(AuthContext);
