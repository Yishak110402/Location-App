import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export function AuthProvider({children}){
    const localIp = "http://192.168.0.110:6969" 
    const [signUpData, setSignUpData] = useState({
        name:"",
        email:"",
        password:"",
        username:"",
        gender:""

    })
    const [error, setError] = useState([])

    const testApi = async()=>{
        const res = await fetch(localIp)
        const data = await res.json()
        console.log(data);        
    }

    const signUp = async(email, password, name, gender, username,)=>{

    }

    useEffect(()=>{
        testApi()
    })

    const value = {
        signUpData,
        setSignUpData,
        signUp
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}