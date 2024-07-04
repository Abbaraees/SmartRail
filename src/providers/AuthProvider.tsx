import { Session } from '@supabase/supabase-js'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { supabase } from '../lib/supabase'


type AuthContextType = {
  session: Session | null,
  profile: any,
  isLoading: boolean,
  isAdmin: boolean
}


const AuthContext = createContext<AuthContextType>({
  session: null,
  profile: null,
  isLoading: true,
  isAdmin: false
})


const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchSession = async () => {
      const { data: {session}, error} = await supabase.auth.getSession()

      if (session) {
        setSession(session)
        const {data} = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session?.user.id)
          .single()
          setProfile(data || null)
      }

      setIsLoading(false)
    }
    
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    fetchSession()
  }, [])

  return (
    <AuthContext.Provider value={{session, profile, isLoading, isAdmin: profile?.role === 'ADMIN'}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthProvider