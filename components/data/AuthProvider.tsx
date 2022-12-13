import {useEffect, useState} from 'react'
import { AuthContext } from './AuthContext'
import firebase from 'firebase/compat'
import { auth } from './firebaseConfig'
interface Props {
    children: React.ReactNode;
}
export const AuthProvider: React.FC<Props> = ({children}) => {
    const [user,setUser] = useState<firebase.User|null>(null)
    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((firebaseUser)=>{
            setUser(firebaseUser)
        })

        return unsubscribe;
    },[])

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}