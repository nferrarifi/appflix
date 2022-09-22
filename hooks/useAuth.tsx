import { useState, useEffect, useContext, createContext, useMemo } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth"
import { useRouter } from "next/router"
import { auth } from "../firebase"

interface AuthProviderProps {
    children: React.ReactNode
}

interface IAuth {
    user: User | null
    signUp: (email:string, password:string) => Promise<void>
    signIn: (email:string, password:string) => Promise<void>
    logout: () => Promise<void>
    error: string | null
    loading:boolean
}

const AuthContext = createContext<IAuth> ({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false
})

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User | null> (null)
    const [error, setError] = useState (null)
    const [initialLoading, setInitialLoading] = useState(true)
    const router = useRouter()

    //Persisting the user 
    useEffect (() => {
        onAuthStateChanged (auth, (user) => {
            if (user){
                //User is logged in
                setUser (user)
                setLoading (false)
            }
            else {
                //User is not logged in
                setUser (null)
                setLoading (true)
                /* router.push ("/login") */
            }
            setInitialLoading (false)
        }),
        [auth]
    })
    
    const signUp = async (email:string, password:string) => {
        setLoading (true)
        await createUserWithEmailAndPassword (auth, email, password).then ((userCredential) => {
            setUser (userCredential.user)
            router.push("/")
            setLoading(false)
        }).catch ((error) => alert (error.message))
          .finally (() => setLoading(false))
    }

    const signIn = async (email:string, password:string) => {
        setLoading (true)
        await signInWithEmailAndPassword (auth, email, password).then ((userCredential) => {
            setUser (userCredential.user)
            router.push("/")
            setLoading(false)
        }).catch ((error) => alert (error.message))
          .finally (() => setLoading(false))
    }

    const logout = async () => {
        setLoading (true)
        signOut(auth).then(() => {
            setUser(null)
            router.push ("/login")
        }).catch ((error) => alert (error.message))
          .finally (() => setLoading (false))
    }

  const memoedValue = useMemo(() => ({
    user, signIn, signUp, loading, logout, error
  }), [user, loading])

  return <AuthContext.Provider value={memoedValue}>{!initialLoading && children}</AuthContext.Provider>
}

export default function useAuth() {
    return useContext (AuthContext)
}