import Header from '@/src/components/Header'
import Colors from '@/src/constants/Colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { StatusBar, StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import QRCode from 'react-qr-code'

const TicketDetail = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title='E-Ticket' />
      <ScrollView style={styles.body} contentContainerStyle={{alignItems: 'center'}}>
        <View style={styles.qrcodeContainer}>
          <QRCode value='1112' />
          <Text style={styles.scancodeTxt}>Scan this QR Code at the gate before boarding pass</Text>
        </View>
        <View style={styles.bookingDetail}>
          <View style={styles.firstRow}>
            <View>
              <Text style={{fontWeight: 'bold'}}>Amtrak</Text>
              <Text style={{color: '#616161'}}>Economy</Text>
            </View>
            <View>
              <Text style={{fontWeight: 'bold'}}>XDNJWU</Text>
              <Text style={{color: '#616161'}}>Booking ID</Text>
            </View>
          </View>
          <View style={styles.secondRow}>
          <View>
            <Text style={styles.stations}>Kano</Text>
            <Text style={styles.time}>9:30 am</Text>
            <Text style={styles.date}>16 July 2024</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Image source={require('@/assets/images/one-way-icon.png')} />
            <Text style={styles.duration}>1h 30m</Text>
          </View>
          <View style={{alignItems:'flex-end'}}>
            <Text style={styles.stations}>Sokoto</Text>
            <Text style={styles.time}>11:30 am</Text>
            <Text style={styles.date}>16 July 2024</Text>
          </View>
        </View>
        <View style={styles.passengerDetail}>
          <View style={styles.row}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>Muhammad Lawal</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>+23481271637</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Passenger Type</Text>
            <Text style={styles.value}>Adult</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Seat</Text>
            <Text style={styles.value}>Carriage 2 1 / B2</Text>
          </View>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TicketDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    width: '100%',
    flex: 1,
    borderTopWidth: 1, 
    borderTopColor: '#EEE',
    padding: 10,
    backgroundColor: Colors.light.tint,
  },
  qrcodeContainer: {
    backgroundColor: '#FFF',
    padding: 15, 
    borderRadius: 16,
    borderBottomLeftRadius: -10,
    alignItems: 'center'
  },
  bookingDetail: {
    backgroundColor: '#FFF',
    padding: 15,
    marginTop: 5,
    borderRadius: 16,
    marginBottom: 20
  },
  scancodeTxt: {
    fontSize: 12, 
    marginTop: 10,
    color: '#757575'
  },
  firstRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1
  },
  secondRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 20,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1
  },
  stations: {
    // fontSize: 16,
    fontWeight: 'semibold',
    color: '#424242'
  },
  time: {
    color: '#235DFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 10
  },
  date: {
    color: '#616161'
  },
  duration: {
    fontSize: 12,
    color: '#616161',
    marginTop: 8
  },
  passengerDetail: {
    
  },
  row: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginVertical: 8
  },
  label: {
    fontSize: 16,
    color: '#616161'
  },
  value: {
    fontSize: 16,
    color: '#424242',
    fontWeight: '700'
  },
})