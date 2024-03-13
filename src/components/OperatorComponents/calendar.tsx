import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDayPress = day => {
    setSelectedDate(day.dateString);
    console.log('dia selecionado = ', day);
  };

  return (
    <View style={styles.container}>
      <Calendar
        // Customize calendar styles
        style={styles.calendar}
        // Customize header
        headerStyle={styles.header}
        // Customize header title
        headerTitleStyle={styles.headerTitle}
        // Additional calendar props
        theme={{
          textSectionTitleColor: '#b6c1cd',
          todayTextColor: '#2e78f0',
          arrowColor: '#2e78f0',
          monthTextColor: '#2e78f0',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: 'bold',
          'stylesheet.calendar.header': {
            header: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingLeft: 10,
              paddingRight: 10,
              marginTop: 6,
              alignItems: 'center',
              backgroundColor: '#dfeeff', // Light blue shade for the header
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            },
            monthText: {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#333',
            },
            arrow: {
              width: 15,
              height: 15,
              resizeMode: 'contain',
              tintColor: '#2e78f0',
            },
          },
          'stylesheet.calendar.main': {
            week: {
              marginTop: 7,
              marginBottom: 7,
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingHorizontal: 10,
            },
            monthView: {
              backgroundColor: '#fff',
            },
          },
          'stylesheet.day.basic': {
            base: {
              width: 32,
              height: 32,
              alignItems: 'center',
            },
            text: {
              fontSize: 14,
              color: '#333',
            },
          },
        }}
        markedDates={{
          [selectedDate]: {selected: true, selectedColor: '#2e78f0'},
        }}
        onDayPress={handleDayPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4', // Light gray background
  },
  calendar: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#dfeeff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    color: '#333',
  },
});

export default CalendarComponent;
