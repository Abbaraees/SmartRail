import { Session } from '@supabase/supabase-js'
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { supabase } from '../lib/supabase'
import { Tables } from '../types'


type AuthContextType = {
  session: Session | null,
  profile: Tables<'profiles'>,
  isLoading: boolean,
  isAdmin: boolean,
  setProfile: (profile: any) => void
}

const defaultProfile = {
  avatar_url: '',
  date_of_birth: '',
  encrypted_pin: '',
  full_name: '',
  id: '',
  national_id: '',
  phone_number: '',
  role: '',
  updated_at: '',
  website: '',
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  profile: defaultProfile,
  isLoading: true,
  isAdmin: false,
  setProfile: (profile: Tables<'profiles'>) => {}
})



const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Tables<'profiles'>>(defaultProfile)
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

          setProfile(data || defaultProfile)
      }

      setIsLoading(false)
    }
    
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    fetchSession()
  }, [])

  return (
    <AuthContext.Provider value={{session, profile, isLoading, isAdmin: profile?.role === 'ADMIN', setProfile}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthProvider