import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../lib/appwriteFunctions'
import { useNavigate } from 'react-router-dom';

const INITIAL_USER ={
    id:'',
    $id:'',
    name:'',
    tag:'',
    email:'',
    passKey:'',
    imgId: '',
    bio:'',
    imgURI:'',
}
const INITIAL_STATE ={
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: ()=>{},
    setIsAuthenticated: ()=>{},
    checkAuthUser: ()=>{}
}

const AuthContext = createContext(INITIAL_STATE);

export const AuthProviderContext = ({ children }) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  const checkAuthUser= async()=>{
      try {
           const currentUser = await getCurrentUser()

           if(currentUser){
            setUser({
              id:currentUser.id,
              $id: currentUser.$id,
              name:currentUser.name,
              tag:currentUser.tag,
              email:currentUser.email,
              bio:currentUser.bio,
              imgURI:currentUser.imageURI,
            })
            setIsAuthenticated(true)
            return true
           }
      } catch (error) {
          console.log(error)
          return false
      } finally{
          setIsLoading(false)
      }
    }
    
  useEffect(()=>{
    if(localStorage.getItem('cookieFallback' === '[]') || localStorage.getItem('cookieFallback' === 'null')){
      navigate('/Login')
    }
    checkAuthUser()
    }, [])

  const values={
    user,
    isLoading,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    checkAuthUser
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProviderContext

export const useAuthContext = () => {
  return useContext(AuthContext);
};