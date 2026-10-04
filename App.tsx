import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import ControlScreen from './src/screens/ControlScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import CustomCycleScreen from './src/screens/CustomCycleScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#F8FAFC' },
          headerTintColor: '#0F172A',
          headerTitleStyle: { fontWeight: '700' },
          headerTitleAlign: 'center',
          contentStyle: { backgroundColor: '#F8FAFC' },
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={ControlScreen} 
          options={{ title: 'Painel da Válvula' }} 
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ title: 'Configurações' }} 
        />

        <Stack.Screen 
          name="CustomCycle" 
          component={CustomCycleScreen} 
          options={{ title: 'Novo Ciclo' }}
        />

        <Stack.Screen 
          name="History" 
          component={HistoryScreen} 
          options={{ title: 'Histórico de Ciclos' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}