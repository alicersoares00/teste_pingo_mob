import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

export default function HistoryScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ciclo Rápido</Text>
          <Text style={styles.cardSub}>Executado em: Hoje, 14:30</Text>
          <Text style={styles.cardDetail}>Água reusada: ~12 Litros</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ciclo Completo</Text>
          <Text style={styles.cardSub}>Executado em: Ontem, 09:15</Text>
          <Text style={styles.cardDetail}>Água reusada: ~35 Litros</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8FAFC' 
  },
  content: { 
    padding: 20 
  },
  card: { 
    backgroundColor: '#FFFFFF', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: '#E2E8F0' 
  },
  cardTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#0F172A' 
  },
  cardSub: { 
    fontSize: 13, 
    color: '#64748B', 
    marginTop: 4 
  },
  cardDetail: { 
    fontSize: 13, 
    color: '#0284C7', 
    fontWeight: '600', 
    marginTop: 6 
  },
});