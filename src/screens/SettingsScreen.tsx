import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Switch, ScrollView } from 'react-native';

export default function SettingsScreen({ navigation }: any) {
  const [ipAddress, setIpAddress] = useState('192.168.1.50');
  const [notifications, setNotifications] = useState(true);
  const [autoMode, setAutoMode] = useState(true);

  const handleSave = () => {
    Alert.alert('Salvo', 'Configurações atualizadas com sucesso.');
    navigation.goBack();
  };

  const handleLogout = () => {
    navigation.replace('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        
        {/* Seção: Hardware */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comunicação com o Hardware</Text>
          
          <Text style={styles.label}>Endereço IP do ESP32</Text>
          <TextInput
            style={styles.input}
            value={ipAddress}
            onChangeText={setIpAddress}
            placeholder="Ex: 192.168.0.100"
            placeholderTextColor="#94A3B8"
          />

          <View style={styles.row}>
            <View>
              <Text style={styles.rowTitle}>Modo Automático</Text>
              <Text style={styles.rowSub}>Acionar válvula pelos sensores</Text>
            </View>
            <Switch
              value={autoMode}
              onValueChange={setAutoMode}
              trackColor={{ false: '#CBD5E1', true: '#0284C7' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Text style={styles.saveButtonText}>Salvar Endereço</Text>
          </TouchableOpacity>
        </View>

        {/* Seção: Preferências do App */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências</Text>
          
          <View style={styles.row}>
            <View>
              <Text style={styles.rowTitle}>Notificações do App</Text>
              <Text style={styles.rowSub}>Alertas de reservatório cheia/ciclo</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#CBD5E1', true: '#0284C7' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Seção: Sobre o App */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o Dispositivo</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Versão do Firmware</Text>
            <Text style={styles.infoValue}>v1.0.4</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Versão do App</Text>
            <Text style={styles.infoValue}>1.0.0 (Protótipo)</Text>
          </View>
        </View>

        {/* Botão de Logout */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    padding: 20,
    gap: 16,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    backgroundColor: '#F8FAFC',
    marginBottom: 16,
    color: '#0F172A',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  rowSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  saveButton: {
    height: 48,
    backgroundColor: '#0284C7',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  logoutButton: {
    height: 48,
    backgroundColor: '#FEE2E2',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#B91C1C',
    fontWeight: '700',
    fontSize: 15,
  },
});