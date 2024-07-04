import { ImageBackground, StyleSheet, Image, StatusBar, Pressable, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Text, View } from '@/components/Themed';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import Colors from '@/src/constants/Colors';
import dayjs from 'dayjs';
import SelectField from '@/src/components/SelectField';
import { Redirect } from 'expo-router';


export default function TabOneScreen() {
  const [selectedTrip, setSelectedTrip] = useState('one-way')
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")

  const data = [
    {label: 'Katsina', value: 'katsina'},
    {label: 'Kano', value: 'kano'},
    {label: 'Kaduna', value: 'Kaduna'},
    {label: 'Jigawa', value: 'Jigawa'},
    {label: 'Zamfara', value: 'Zamfara'},
    {label: 'Sokoto', value: 'Sokoto'}
  ]

  const trainClass = [
    {'label': 'All Class', value: 'All Class'},
    {'label': 'Executive', value: 'Executive'},
    {'label': 'Business', value: 'Business'},
    {'label': 'Economy', value: 'Economy'},
  ]
  const [selectedClass, setSelectedClass] = useState('All Class')

  const passengers = [
    {label: "1 Adult", value: "1 Adult"}, 
    {label: "2 Adults", value: "2 Adults"},
    {label: "3 Adults", value: "3 Adults"},
    {label: "4 Adults", value: "4 Adults"},
    {label: "5 Adults", value: "5 Adults"},
    {label: "5+ Adults", value: "5+ Adults"}
  ]
  const [selectedPassengers, setSeclectedPassengers] = useState("1 Adult")
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showDate = () => DateTimePickerAndroid.open({
    value: date,
    onChange,
    mode: 'date',
    is24Hour: true,
  });

  return <Redirect href={'/auth'} />

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollStyle}>
      {/* Header */}
      <View style={styles.header}>
        <ImageBackground source={require('@/assets/images/header-background.png')} style={styles.image} />
        <View style={styles.userInfo}>
          <Image source={require('@/assets/images/avatar.png')} />
          <View style={styles.userInfoText}>
            <Text style={styles.userInfoGreeting}>Good Morning 👋</Text>
            <Text style={styles.userInfoName}>Muhammad Lawal</Text>
          </View>
          <Ionicons name='notifications' size={20} color={'white'} style={styles.notificationIcon}/>
        </View>
      </View>


      <View style={styles.searchTicketContainer}>
        <View style={styles.searchTicket}>
          <View style={styles.tripSelector}>
            <Pressable onPress={() => setSelectedTrip('one-way')}>
              <Text style={[styles.tripType, selectedTrip == 'one-way' ? styles.tripTypeActive : null]}>One-Way</Text>
            </Pressable>
            <Pressable onPress={() => setSelectedTrip('round-trip')}>
              <Text style={[styles.tripType, selectedTrip == 'round-trip' ? styles.tripTypeActive : null]}>Round Trip</Text>
            </Pressable>
          </View>

          <SelectField 
            label='Origin'
            selectedValue={origin}
            onValueChange={setOrigin}
            items={data}
          />

          <SelectField 
            label='Destination'
            selectedValue={destination}
            onValueChange={setDestination}
            items={data}
          />
          

          <View style={styles.picker}>
            <Text style={styles.dropdownLabel}>Departure Date</Text>
            <Pressable onPress={showDate} style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <Text style={{
                marginTop: 20,
                color: 'gray',
                height: 30,
                fontSize: 16
              }}>{dayjs(date).format("dddd DD MMMM YYYY")}</Text>
              <Ionicons name='calendar' color='gray' size={24} />
            </Pressable>

          </View>

          <SelectField
            selectedValue={selectedClass}
            label='Train Class'
            onValueChange={(item) => setSelectedClass(item)}
            items={trainClass}
          />

          <SelectField
            selectedValue={selectedPassengers}
            label='Passenger'
            onValueChange={(item) => setSeclectedPassengers(item)}
            items={passengers}
          />
         
          <Pressable
            style={{
              backgroundColor: "#235DFF",
              padding: 14,
              marginTop: 30,
              alignItems: 'center',
              borderRadius: 10
            }}
          >
            <Text style={{
              color: 'white',
              fontWeight: 'bold'
            }}>Search Trains</Text>
          </Pressable>
          
        </View>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    marginTop: StatusBar.currentHeight
  },
  scrollStyle: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    alignItems: 'center',
    width: '100%',
    // height: 300,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    position: 'absolute',
    top: 0
  },
  userInfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: 'none',
    marginTop: 15,
    paddingHorizontal: 15
  }, 
  userInfoText: {
    marginLeft: 5,
    backgroundColor: 'none',
    opacity: 1
  },
  notificationIcon: {
    marginLeft: 'auto',
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    borderRadius: 50,
  },
  userInfoName: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15
  },
  userInfoGreeting: {
    color: 'white',
    fontWeight: 'light',
    marginBottom: 5
  },
  searchTicketContainer: {
    width: '100%',
    backgroundColor: 'none',
    padding: 15,
  },
  searchTicket: {
    backgroundColor: 'white',
    position: 'relative',
    marginTop: 10,
    padding: 10,
    borderRadius: 16
  },
  tripSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tripType: {
    width: 145,
    color: 'gray',
    paddingBottom: 10,
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
  },
  tripTypeActive: {
    color: Colors.light.tint,
    borderBottomWidth: 3,
    borderBottomColor: Colors.light.tint
  },
  picker: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginTop: 10,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: 'bold'
  }

});
