import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo, toggleTodo, removeTodo} from '../store/reducers/todoReducer';
import {RootState, AppDispatch} from '../store/store';
import {useTheme} from '../components/context';

const TodoScreen: React.FC = () => {
  const [task, setTask] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const selectedDate = date.toISOString().split('T')[0];

  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector(
    (state: RootState) => state.todos[selectedDate] || [],
  );

  const memoizedTodos = useMemo(() => todos, [todos]);

  const {theme} = useTheme(); // Use the theme context

  const themeStyles = theme === 'dark' ? darkStyles : lightStyles; // Switch styles based on theme

  return (
    <View style={[themeStyles.container]}>
      <Text style={themeStyles.title}>Tasks</Text>

      {/* Date Picker */}
      <TouchableOpacity
        style={themeStyles.datePicker}
        onPress={() => setOpen(true)}>
        <Text style={themeStyles.dateText}>{selectedDate}</Text>
        <MIcon name="calendar" size={24} color="#007AFF" />
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={selectedDate => {
          setOpen(false);
          setDate(selectedDate);
        }}
        onCancel={() => setOpen(false)}
      />

      {/* Task Input */}
      <View style={themeStyles.inputContainer}>
        <TextInput
          style={themeStyles.input}
          placeholder="Add a task..."
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#999'}
          value={task}
          multiline={true}
          scrollEnabled={true}
          textAlignVertical='top'
          onChangeText={setTask}
          numberOfLines={3}
        />
        <TouchableOpacity
          style={themeStyles.addButton}
          onPress={() => {
            if (task.trim()) {
              dispatch(addTodo({date: selectedDate, text: task}));
              setTask('');
            }
          }}>
          <MIcon name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <FlatList
        data={memoizedTodos}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={themeStyles.todoItem}>
            {/* Checkbox */}
            <TouchableOpacity
              onPress={() =>
                dispatch(toggleTodo({date: selectedDate, id: item.id}))
              }>
              <MIcon
                name={
                  item.completed ? 'checkbox-marked' : 'checkbox-blank-outline'
                }
                size={24}
                color={item.completed ? '#007AFF' : '#999'}
              />
            </TouchableOpacity>

            {/* Task Text */}
            <Text
              style={[
                themeStyles.todoText,
                item.completed && themeStyles.completed,
              ]}>
              {item.text}
            </Text>

            {/* Delete Button */}
            <TouchableOpacity
              onPress={() =>
                dispatch(removeTodo({date: selectedDate, id: item.id}))
              }>
              <MIcon name="delete" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#eee'},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 10,textAlign: 'center'},
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  dateText: {fontSize: 16, flex: 1},
  inputContainer: {flexDirection: 'row', alignItems: 'center', marginVertical: 10},
  input: {flex: 1, borderWidth: 0.5, padding: 8, color: '#121212',height: 80,borderRadius: 5},
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  addButtonText: {color: '#fff', fontSize: 24},
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  todoText: {fontSize: 18, flex: 1, marginLeft: 10},
  completed: {textDecorationLine: 'line-through', color: 'gray'},
  deleteText: {color: 'red', fontSize: 18},
});

const darkStyles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#232323'},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  dateText: {fontSize: 16, flex: 1, color: '#fff'},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 0.5,
    padding: 8,
    borderColor: '#fff',
    color: '#fff',
    height: 80,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  addButtonText: {color: '#fff', fontSize: 24},
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    borderColor: '#444',
  },
  todoText: {fontSize: 18, flex: 1, marginLeft: 10, color: '#fff'},
  completed: {textDecorationLine: 'line-through', color: '#bbb'},
  deleteText: {color: 'red', fontSize: 18},
});

export default TodoScreen;
