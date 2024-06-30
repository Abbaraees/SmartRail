import { View, Text, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'

type SelectFieldPropType = {
  label: string,
  selectedValue: string,
  onValueChange: (item: string)  => void,
  items: item[]

}

type item = {
  label: string,
  value: string
}

const SelectField = ({ label, selectedValue, onValueChange, items }: SelectFieldPropType) => {
  return (
    <View style={styles.picker}>
      <Text style={styles.dropdownLabel}>{label}</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(item) => onValueChange(item)}
      >
        {items.map(item => <Picker.Item label={item.label} value={item.value} key={item.label} />)}
      </Picker>
    </View>
  )
}

const styles = StyleSheet.create({
  picker: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginTop: 10,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default SelectField