import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomCycleScreen({ navigation }: any) {
  const [cycleName, setCycleName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  const handleSave = async () => {
    if (!cycleName || !duration) {
      Alert.alert('Atenção', 'Por favor, preencha o nome e a duração do ciclo.');
      return;
    }

    try {
      const newCycle = {
        id: Date.now().toString(),
        name: cycleName,
        description: description,
        duration: `${duration} min`,
      };

      const existingCyclesJson = await AsyncStorage.getItem('@pingo_custom_cycles');
      const existingCycles = existingCyclesJson ? JSON.parse(existingCyclesJson) : [];

      const updatedCycles = [...existingCycles, newCycle];

      await AsyncStorage.setItem('@pingo_custom_cycles', JSON.stringify(updatedCycles));

      Alert.alert('Sucesso', 'Novo ciclo criado com sucesso!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o ciclo.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nome do Ciclo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Enxágue Pesado"
          placeholderTextColor="#94A3B8"
          value={cycleName}
          onChangeText={setCycleName}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Capta água do 3º ciclo para lavagem de piso"
          placeholderTextColor="#94A3B8"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Duração da Valvula Aberta (em minutos)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 15"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
          value={duration}
          onChangeText={setDuration}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar Ciclo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backText: { color: '#0284C7', fontSize: 16, fontWeight: '600' },
  title: { fontSize: 17, fontWeight: 'bold', color: '#0F172A' },
  form: { padding: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  saveButton: {
    backgroundColor: '#0284C7',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 28,
  },
  saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});