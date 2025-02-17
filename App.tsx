// App.tsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './todo_app/store/store';
import CalendarScreen from './todo_app/screens/CalendarScreen';
import SettingsScreen from './todo_app/screens/SettingsScreen';
import TodoScreen from './todo_app/screens/TodoScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeProvider, useTheme} from './todo_app/components/context'; // Import useTheme and ThemeProvider

const Tab = createBottomTabNavigator();

const HomeIcon = ({color}: {color: string}) => (
  <Icon name="home" size={24} color={color} />
);

const CalendarIcon = ({color}: {color: string}) => (
  <Icon name="calendar" size={24} color={color} />
);

const SettingsIcon = ({color}: {color: string}) => (
  <Icon name="settings" size={24} color={color} />
);

HomeIcon.defaultProps = {
  color: 'white',
};

CalendarIcon.defaultProps = {
  color: 'white',
};

SettingsIcon.defaultProps = {
  color: 'white',
};

const App = () => {
  return (
    <Provider store={store}>
      {/* Wrap the entire app with ThemeProvider to allow useTheme to work */}
      <ThemeProvider>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

// Tab navigator component to use the theme context
const Tabs = () => {
  const {theme} = useTheme(); // Get the current theme

  // Define styles based on the theme
  const tabBarStyle = {
    backgroundColor: theme === 'dark' ? '#121212' : '#ffffff', // Dark or light background
  };

  const tabBarLabelStyle = {
    color: theme === 'dark' ? '#fff' : '#000', // Change label color based on the theme
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'shift',
        tabBarStyle,
        tabBarLabelStyle,
      }}>
      <Tab.Screen
        name="Home"
        component={TodoScreen}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarIcon: CalendarIcon,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: SettingsIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default App;
