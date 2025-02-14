import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import axios from "axios";
import useAxiosPublic from "../Hooks/useAxiosPublic";


export const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const signUpUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email,password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    const updateProfileData = (updateDatas) => {
        setLoading(true)
        return updateProfile(auth.currentUser, updateDatas)
    }
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async currentUser => {
            setLoading(false)
            setUser(currentUser)
            // console.log(import.meta.env.VITE_API_URL);
            // console.log(localStorage.getItem("access-token"));
            
            
            if (currentUser) {

                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                        }
                        
                    })
            }
            else{
                //TODO: remove token(if token stored in the client store in the local storage, caching, in memory)
                localStorage.removeItem('access-token')
            }
        })
        return () => {
            unSubscribe()
        }

    }, [axiosPublic])

    const authInfo = {
        user,
        signUpUser,
        signInUser,
        updateProfileData,
        signOutUser
    }
    console.log(user);
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
            
        </AuthContext.Provider>
    );
};

export default AuthProvider;