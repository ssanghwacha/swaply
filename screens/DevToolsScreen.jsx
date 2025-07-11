// DevToolsScreen.jsx
import React from 'react';
import { View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import sampleData from '../data/sampleData';

export default function DevToolsScreen() {
  // Load predefined sample data into AsyncStorage
  const loadSample = async () => {
    try {
      await AsyncStorage.setItem('exchangeData', JSON.stringify(sampleData));
      Alert.alert('Sample data loaded into AsyncStorage!');
    } catch (e) {
      console.error('Failed to load sample data:', e);
      Alert.alert('Failed to load sample data.');
    }
  };

  // Clear all AsyncStorage keys (full reset)
  const clearData = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('All AsyncStorage data cleared!');
    } catch (e) {
      console.error('Failed to clear data:', e);
      Alert.alert('Failed to clear data.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Button title="Load Sample Data" onPress={loadSample} />
      <View style={{ height: 20 }} />
      <Button title="Clear All Data" onPress={clearData} color="red" />
    </View>
  );
}