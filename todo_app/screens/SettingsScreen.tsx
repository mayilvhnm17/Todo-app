// src/screens/SettingsScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking, Switch} from 'react-native';
import { useTheme } from '../components/context';

const SettingsScreen: React.FC = () => {
   const {theme, toggleTheme} = useTheme();
  return (
    <View style={[styles.container, theme === 'dark' && styles.darkContainer]}>
      <Text style={[styles.title, theme === 'dark' && styles.darkText]}>
        Settings
      </Text>
      <View style={styles.row}>
        <Text style={[styles.text, theme === 'dark' && styles.darkText]}>
          Dark Theme
        </Text>
        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
      </View>
      <View style={styles.option} />
      {/* Placeholder for Future Settings */}
      <TouchableOpacity style={styles.option}>
        <Text style={[styles.optionText, theme === 'dark' && styles.darkText]}>
          🔄 Enable Cloud Sync (Coming Soon)
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={[styles.optionText, theme === 'dark' && styles.darkText]}>
          🔑 Account Login (Coming Soon)
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() =>
          Linking.openURL('https://github.com/mayilvhnm17/Todo-app')
        }>
        <Text style={[styles.optionText, theme === 'dark' && styles.darkText]}>
          📦 View Source Code
        </Text>
      </TouchableOpacity>

      {/* Credits */}
      {/* <Text style={styles.sectionTitle}>Credits</Text>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL('https://www.flaticon.com/free-icons/weather')
        }>
        <Text style={styles.linkText}>
          🌤 Weather icons by Freepik - Flaticon
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => Linking.openURL('https://openweathermap.org/')}>
        <Text style={styles.linkText}>🌍 Weather API by OpenWeather</Text>
      </TouchableOpacity> */}

      <Text style={styles.version}>📱 App Version: 1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, backgroundColor: '#eee'},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 10,textAlign: 'center'},
  sectionTitle: {fontSize: 18, fontWeight: 'bold', marginTop: 20},
  option: {paddingVertical: 15, borderBottomWidth: 1, borderColor: '#ddd'},
  optionText: {fontSize: 16, color: '#333'},
  linkText: {fontSize: 16, color: '#007AFF', marginTop: 10},
  version: {fontSize: 14, color: '#666', marginTop: 20},
  darkContainer: {backgroundColor: '#232323'},
  text: {fontSize: 18, color: '#000',paddingTop: 10},
  darkText: {color: '#fff'},
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SettingsScreen;
  
