import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type IconProps = { name: string; size: number; color: string };

type CustomCycle = {
  id: string;
  name: string;
  description?: string;
  duration: string;
};

const ScreenIcon = ({ name, size, color }: IconProps) => {
  const glyphs: Record<string, string> = {
    'person-circle-outline': '●',
    'settings-outline': '⚙',
    bell: '♢',
    'timer-outline': '◷',
    'camera-iris': '◎',
    plus: '+',
    home: '⌂',
  };

  return <Text accessibilityElementsHidden style={{ fontSize: size, color }}>{glyphs[name] ?? '•'}</Text>;
};

const Ionicons = ScreenIcon;
const Feather = ScreenIcon;
const MaterialCommunityIcons = ScreenIcon;

export default function ControlScreen({ navigation }: any) {
  const [isValveActive, setIsValveActive] = useState(true);
  const [quickCycle, setQuickCycle] = useState(true);
  const [extraCycle, setExtraCycle] = useState(false);

  const [customCycles, setCustomCycles] = useState<CustomCycle[]>([]);
  const [customSwitches, setCustomSwitches] = useState<Record<string, boolean>>({});

  // Função para carregar os ciclos do AsyncStorage
  const loadCycles = async () => {
    try {
      const savedCycles = await AsyncStorage.getItem('@pingo_custom_cycles');
      if (savedCycles) {
        setCustomCycles(JSON.parse(savedCycles));
      } else {
        setCustomCycles([]);
      }
    } catch (error) {
      console.error('Erro ao carregar ciclos:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCycles();
    }, [])
  );

  const toggleCustomSwitch = (id: string) => {
    setCustomSwitches((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Função direta de exclusão de ciclo
  const handleDeleteCycle = async (idToDelete: string) => {
    try {
      // 1. Filtra a lista removendo o ciclo selecionado
      const updatedList = customCycles.filter(
        (cycle) => String(cycle.id) !== String(idToDelete)
      );

      // 2. Atualiza o estado da tela imediatamente
      setCustomCycles(updatedList);

      // 3. Atualiza o AsyncStorage
      await AsyncStorage.setItem('@pingo_custom_cycles', JSON.stringify(updatedList));
    } catch (error) {
      console.error('Erro ao excluir ciclo:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

      {/* Barra Superior / Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="person-circle-outline" size={32} color="#0F172A" />
        </TouchableOpacity>

        <Text style={styles.title}>Pingo</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={() => navigation?.navigate('History')}
            style={styles.headerIcon}
            activeOpacity={0.7}
          >
            <Feather name="bell" size={22} color="#0F172A" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation?.navigate('Settings')}
            activeOpacity={0.7}
          >
            <Ionicons name="settings-outline" size={22} color="#0F172A" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Indicador de Estado da Válvula */}
        <TouchableOpacity
          style={[
            styles.statusBanner,
            isValveActive ? styles.statusBannerActive : styles.statusBannerInactive,
          ]}
          onPress={() => setIsValveActive(!isValveActive)}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isValveActive ? '#16A34A' : '#DC2626' },
            ]}
          />
          <Text style={styles.statusText}>
            Válvula:{' '}
            <Text style={styles.statusBold}>
              {isValveActive ? 'LIGADA' : 'DESLIGADA'}
            </Text>
          </Text>
        </TouchableOpacity>

        {/* Card: Ciclo Rápido (Padrão - Não exclui) */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardLeftGroup}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="timer-outline" size={24} color="#0F172A" />
              </View>
              <Text style={styles.cycleTitle}>Ciclo Rápido</Text>
            </View>
            <Switch
              value={quickCycle}
              onValueChange={setQuickCycle}
              trackColor={{ false: '#CBD5E1', true: '#0284C7' }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.divider} />
          <Text style={styles.cycleDescription}>Capta 1º Enxágue</Text>
        </View>

        {/* Card: Ciclo Extra (Padrão - Não exclui) */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardLeftGroup}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons name="camera-iris" size={24} color="#0F172A" />
              </View>
              <Text style={styles.cycleTitle}>Ciclo extra</Text>
            </View>
            <Switch
              value={extraCycle}
              onValueChange={setExtraCycle}
              trackColor={{ false: '#CBD5E1', true: '#0284C7' }}
              thumbColor="#FFFFFF"
            />
          </View>
          <View style={styles.divider} />
          <Text style={styles.cycleDescription}>Capta 2º Enxágue</Text>
        </View>

        {/* Ciclos Criados pelo Usuário (Exclusão Habilitada) */}
        {customCycles.map((cycle) => (
          <View key={String(cycle.id)} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardLeftGroup}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name="timer-outline" size={24} color="#0F172A" />
                </View>
                <Text style={styles.cycleTitle}>{cycle.name}</Text>
              </View>

              <View style={styles.cardRightGroup}>
                <Switch
                  value={!!customSwitches[String(cycle.id)]}
                  onValueChange={() => toggleCustomSwitch(String(cycle.id))}
                  trackColor={{ false: '#CBD5E1', true: '#0284C7' }}
                  thumbColor="#FFFFFF"
                />

                {/* Botão Vermelho de Exclusão */}
                <TouchableOpacity
                  onPress={() => handleDeleteCycle(String(cycle.id))}
                  style={styles.deleteButton}
                  activeOpacity={0.6}
                >
                  <Text style={styles.deleteText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.divider} />
            <Text style={styles.cycleDescription}>
              {cycle.description ? `${cycle.description} • ` : ''}Duração: {cycle.duration}
            </Text>
          </View>
        ))}

        {/* Botão para Customizar Novo Ciclo */}
        <TouchableOpacity
          style={styles.dashedButton}
          onPress={() => navigation?.navigate('CustomCycle')}
          activeOpacity={0.7}
        >
          <View style={styles.dashedIconBox}>
            <Feather name="plus" size={20} color="#0284C7" />
          </View>
          <Text style={styles.dashedButtonText}>Novo Ciclo</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Barra de Navegação Inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.activeTab}
          onPress={() => navigation?.navigate('Home')}
        >
          <Ionicons name="home" size={22} color="#0284C7" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation?.navigate('History')}>
          <Feather name="bell" size={22} color="#64748B" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation?.navigate('Settings')}>
          <Ionicons name="settings-outline" size={22} color="#64748B" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons name="person-circle-outline" size={26} color="#64748B" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 16,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    marginBottom: 20,
  },
  statusBannerActive: {
    backgroundColor: '#DCFCE7',
    borderColor: '#BBF7D0',
  },
  statusBannerInactive: {
    backgroundColor: '#FEE2E2',
    borderColor: '#FECACA',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  statusText: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '500',
  },
  statusBold: {
    fontWeight: '800',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: 'bold',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cycleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  cycleDescription: {
    fontSize: 14,
    color: '#475569',
    fontWeight: '600',
  },
  dashedButton: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#0284C7',
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginTop: 4,
  },
  dashedIconBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#0284C7',
    borderRadius: 6,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dashedButtonText: {
    color: '#0284C7',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomNav: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 56,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  activeTab: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
});