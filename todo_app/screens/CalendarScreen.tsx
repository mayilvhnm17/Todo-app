import React, {useState, useMemo} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store/store';
import {toggleTodo, removeTodo} from '../store/reducers/todoReducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../components/context';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const CalendarScreen: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [currentMonth, setCurrentMonth] = useState<string>(
    new Date().toISOString().split('T')[0],
  );

  // Use theme context
  const {theme} = useTheme();

  const generateDatesInMonth = (month: string): string[] => {
    // You can use a library like date-fns or moment.js to generate all dates of the current month
    const startDate = new Date(month);
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0,
    ); // Get the last date of the month

    const dates: string[] = [];
    for (let day = 1; day <= endDate.getDate(); day++) {
      const date = new Date(startDate.getFullYear(), startDate.getMonth(), day);
      dates.push(date.toISOString().split('T')[0]); // Store date as "YYYY-MM-DD"
    }

    return dates;
  };

  // Dynamically create marked dates
  const markedDates = useMemo(() => {
    return Object.keys(todos).reduce((acc, date) => {
      if (todos[date].length > 0) {
        acc[date] = {
          marked: true,
          dotColor: theme === 'dark' ? 'white' : 'white',
        };
      }
       if (date === selectedDate) {
         acc[date] = {
           ...acc[date],
           selected: true,
           selectedColor: '#454545', // Color for the selected date
           selectedTextColor: '#fff', // Text color of the selected date
         };
       }
      return acc;
    }, {} as Record<string, any>);
  }, [todos, theme,selectedDate]);

  const otherMarkedDates = useMemo(() => {
  const allDaysInMonth = generateDatesInMonth(currentMonth); // Generate dates in the current month
  const unmarkedDates = allDaysInMonth.filter(date => !todos[date]);
    console.log(unmarkedDates,currentMonth);
    return unmarkedDates.reduce((acc, date) => {
      acc[date] = {
        selected: date === selectedDate,
        selectedColor: '#454545',
        selectedTextColor: '#fff',
      };
      return acc;
    }, {} as Record<string, any>);
  }, [currentMonth, todos, selectedDate]);

const finalMarkedDates = {...markedDates, ...otherMarkedDates};



  const currentStyles = theme === 'dark' ? darkStyle : lightStyle;

  return (
    <View style={currentStyles.container}>
      <View style={currentStyles.calendarWrapper}>
        <Calendar
          onDayPress={day => setSelectedDate(day.dateString)}
          onMonthChange={month => setCurrentMonth(month.dateString)}
          markedDates={finalMarkedDates}
          theme={{
            todayTextColor: theme === 'dark' ? '#FFD700' : '#FFD700',
            arrowColor: theme === 'dark' ? '#FFD700' : '#FFD700',
            monthTextColor: theme === 'dark' ? '#FFD700' : '#FFD700',
            calendarBackground: theme === 'dark' ? '#121212' : '#676767',
            textSectionTitleColor: theme === 'dark' ? '#fff' : '#000',
            dayTextColor: theme === 'dark' ? '#fff' : '#000',
            arrowStyle: {height: 20, width: 20},
          }}
        />
      </View>
      <Text style={currentStyles.title}>Tasks for {selectedDate}</Text>

      <FlatList
        data={todos[selectedDate] || []}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={currentStyles.todoItem}>
            {/* Checkbox */}
            <TouchableOpacity
              onPress={() =>
                dispatch(toggleTodo({date: selectedDate, id: item.id}))
              }>
              <MaterialCommunityIcons
                name={
                  item.completed ? 'checkbox-marked' : 'checkbox-blank-outline'
                }
                size={24}
                color={
                  item.completed
                    ? '#007AFF'
                    : theme === 'dark'
                    ? '#bbb'
                    : '#999'
                }
              />
            </TouchableOpacity>

            {/* Task Text */}
            <Text
              style={[
                currentStyles.todoText,
                item.completed && currentStyles.completed,
              ]}>
              {item.text}
            </Text>

            {/* Delete Button */}
            <TouchableOpacity
              onPress={() => {
                dispatch(removeTodo({date: selectedDate, id: item.id}));
              }}>
              <MIcon name="delete" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={currentStyles.noTasks}>No tasks for this day.</Text>
        }
      />
    </View>
  );
};
  const lightStyle = StyleSheet.create({
    container: {flex: 1, padding: 20, backgroundColor: '#eee'},
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
      color: '#000',
    },
    calendarWrapper: {
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 20,

    },
    todoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      justifyContent: 'space-between',
    },
    todoText: {fontSize: 18, flex: 1, marginLeft: 10, color: '#000'},
    completed: {textDecorationLine: 'line-through', color: 'gray'},
    deleteText: {color: 'red', fontSize: 18},
    noTasks: {textAlign: 'center', marginTop: 20, color: 'gray'},
  });

  const darkStyle = StyleSheet.create({
    container: {flex: 1, padding: 20, backgroundColor: '#232323'},
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
      color: '#fff',
    },
    calendarWrapper: {
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 20,

    },
    todoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      justifyContent: 'space-between',
      borderBottomColor: '#333',
    },
    completed: {textDecorationLine: 'line-through', color: 'gray'},
    todoText: {fontSize: 18, flex: 1, marginLeft: 10, color: '#fff'},
    deleteText: {color: '#ff6347'}, // Tomato color for dark theme
    noTasks: {textAlign: 'center', marginTop: 20, color: '#bbb'},
  });
export default CalendarScreen;
