import Header from '@/src/components/Header'
import Colors from '@/src/constants/Colors'
import { supabase } from '@/src/lib/supabase'
import { useAuth } from '@/src/providers/AuthProvider'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { router, Stack } from 'expo-router'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type ActionPropTypes = {
  name: string,
  icon: string,
  color: string,
  onClick: () => void
}

const AccountScreen = () => {
  const { profile, session } = useAuth()
  const { data: {publicUrl} } = supabase.storage
    .from('avatars')
    .getPublicUrl(profile.avatar_url ? profile.avatar_url : 'avatar.url')

  const Action = ({name, icon, color, onClick}: ActionPropTypes) => (
    <Pressable style={{flexDirection: 'row', alignItems: 'center'}} onPress={onClick}>
      <AntDesign name={`${icon}`} size={24} color={color ? color : 'black  '} />
      <Text style={{marginLeft: 15, color: color ? color : 'black  ', fontWeight: 'bold'}}>{name}</Text>
      <AntDesign style={{marginLeft: 'auto'}} name="right" size={24} color={color ? color : 'black  '} />
    </Pressable>
  )

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <SafeAreaView>
      <Header title='Account' />
      <View style={styles.body}>
        <View style={styles.profileInfo}>
          <Image 
            source={{ uri: publicUrl }}
            style={styles.profilePic}
          />
          <View style={{marginLeft: 16}}>
            <Text style={styles.fullName}>{profile.full_name}</Text>
            <Text style={styles.email}>{session?.user.email}</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>General</Text>
        <Action name={'Personal Info'} icon={'user'} color='black' onClick={() => router.navigate(`/auth/complete-profile?action=update`)}/>
        <View style={{marginTop: 'auto'}}>
          <Action name={'Logout'} icon={'logout'} color={'red'} onClick={logout}/>
        </View>
        
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    padding: 16,
    height: '85%',
    display: 'flex',
    backgroundColor: '#FFF'
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 50
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  email: {
    color: '#616161'
  },
  sectionTitle: {
    color: '#616161',
    marginVertical: 20,

  }
})

export default AccountScreen