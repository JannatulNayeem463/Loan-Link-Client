import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword ,GoogleAuthProvider,onAuthStateChanged,signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import {auth} from '../../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
  
  const [user,setUser] = useState(null);
  const [loading, setLoading] = useState(true);

   

    const registerUser = async (email, password, displayName, photoURL) => {
      try {
        setLoading(true);
        const res = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(res.user, { displayName, photoURL });
        console.log(res.user);
        setUser({ ...res.user });
        return res.user
      } catch (error) {
        console.error("Signup Error:", error.code, error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    // Login 
  const signInuser = async (email, password) => {
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      setUser(res.user);
      return res.user;
    } catch (error) {
      console.error("Login Error:", error.code, error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

     const signInGoogle = () =>{
      setLoading(true) ;
       return signInWithPopup(auth, googleProvider )
     }
 // Logout 
 const logOut = async () => {
  try {
    await signOut(auth);
    setUser(null);
  } catch (error) {
    console.error("Logout Error:", error.code, error.message);
  }
};
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
//observe user state
     useEffect(() => {
          const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
          setUser(currentUser);
          setLoading(false) ;
          })
          return () =>{
            unSubscribe();
          }
     }, [])


    const authInfo ={
      user,
      loading,
      registerUser,
       signInuser,
       signInGoogle,
       logOut,
       updateUserProfile
    }
  return (

    <AuthContext.Provider  value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
