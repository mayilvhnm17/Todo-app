import React, {useState, useMemo} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../store/store';
import {toggleTodo, removeTodo} from '../store/reducers/todoReducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../components/context'; // Import theme context

const CalendarScreen: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  // Use theme context
  const {theme} = useTheme();

  // Dynamically create marked dates
  const markedDates = useMemo(() => {
    return Object.keys(todos).reduce((acc, date) => {
      if (todos[date].length > 0) {
        acc[date] = {
          marked: true,
          dotColor: theme === 'dark' ? 'white' : 'white',
        };
      }
      return acc;
    }, {} as Record<string, any>);
  }, [todos, theme]);



  const currentStyles = theme === 'dark' ? darkStyle : lightStyle;

  return (
    <View style={currentStyles.container}>
      <View style={currentStyles.calendarWrapper}>
        <Calendar
          onDayPress={day => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          theme={{
            todayTextColor: theme === 'dark' ? 'yellow' : 'blue',
            arrowColor: theme === 'dark' ? 'yellow' : 'blue',
            monthTextColor: theme === 'dark' ? 'yellow' : 'blue',
            calendarBackground: theme === 'dark' ? '#121212' : '#121212',
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
              <Text style={currentStyles.deleteText}>❌</Text>
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
    container: {flex: 1, padding: 20, backgroundColor: '#fff'},
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
    container: {flex: 1, padding: 20, backgroundColor: '#121212'},
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
