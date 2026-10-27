import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import { appointments, doctors, healthSummary, quickActions } from './src/data/mockData';
import { theme } from './src/theme';

const tabs = ['Home', 'Doctors', 'Appointments', 'Profile'] as const;
type Tab = (typeof tabs)[number];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Doctors':
        return <DoctorsScreen />;
      case 'Appointments':
        return <AppointmentScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>{renderScreen()}</ScrollView>
        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.8}
              onPress={() => setActiveTab(tab)}
              style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}>
              <Text style={[styles.tabLabel, activeTab === tab && styles.activeTabLabel]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

function HomeScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.eyebrow}>Welcome back</Text>
          <Text style={styles.title}>Nandi Patel</Text>
        </View>
        <TouchableOpacity style={styles.avatarButton}>
          <Text style={styles.avatarText}>NP</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.heroCard}>
        <View style={styles.heroRow}>
          <View>
            <Text style={styles.heroLabel}>Next check-up</Text>
            <Text style={styles.heroDate}>Today, 4:30 PM</Text>
          </View>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryText}>Join</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.heroSubtext}>Dr. Aisha Khan · Cardiology consult</Text>
      </View>

      <View style={styles.summaryGrid}>
        {healthSummary.map((item) => (
          <View key={item.label} style={styles.metricCard}>
            <Text style={styles.metricLabel}>{item.label}</Text>
            <Text style={styles.metricValue}>{item.value}</Text>
            <Text style={styles.metricStatus}>{item.status}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Quick actions</Text>
        <Text style={styles.linkText}>View all</Text>
      </View>

      <View style={styles.actionGrid}>
        {quickActions.map((action) => (
          <TouchableOpacity key={action.title} style={styles.actionCard}>
            <Text style={styles.actionIcon}>{action.icon}</Text>
            <Text style={styles.actionTitle}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionHeaderRow}>
        <Text style={styles.sectionTitle}>Upcoming care</Text>
      </View>

      <View style={styles.upcomingCard}>
        <View style={styles.timePill}>
          <Text style={styles.timePillText}>Thu</Text>
        </View>
        <View style={styles.upcomingInfo}>
          <Text style={styles.cardTitle}>Follow-up consultation</Text>
          <Text style={styles.cardMeta}>Dr. Aisha Khan · Cardiology</Text>
          <Text style={styles.cardMeta}>12:30 PM · Wellness Center</Text>
        </View>
      </View>
    </View>
  );
}

function DoctorsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Doctors</Text>
      {doctors.map((doctor) => (
        <View key={doctor.name} style={styles.doctorCard}>
          <View style={styles.doctorAvatar}>
            <Text style={styles.doctorInitial}>{doctor.name.charAt(0)}</Text>
          </View>
          <View style={styles.doctorInfo}>
            <Text style={styles.cardTitle}>{doctor.name}</Text>
            <Text style={styles.cardMeta}>{doctor.specialty}</Text>
            <Text style={styles.ratingText}>{doctor.rating} rating · {doctor.experience} yrs exp</Text>
          </View>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryText}>Book</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

function AppointmentScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Appointments</Text>
      {appointments.map((appointment) => (
        <View key={appointment.id} style={styles.appointmentCard}>
          <View style={styles.dateBlock}>
            <Text style={styles.dateMonth}>{appointment.month}</Text>
            <Text style={styles.dateDay}>{appointment.day}</Text>
          </View>
          <View style={styles.appointmentInfo}>
            <Text style={styles.cardTitle}>{appointment.title}</Text>
            <Text style={styles.cardMeta}>{appointment.doctor}</Text>
            <Text style={styles.cardMeta}>{appointment.time} · {appointment.location}</Text>
          </View>
          <View style={[styles.statusBadge, appointment.status === 'Confirmed' ? styles.confirmed : styles.pending]}>
            <Text style={styles.statusText}>{appointment.status}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarLargeText}>NP</Text>
        </View>
        <View>
          <Text style={styles.title}>Nandi Patel</Text>
          <Text style={styles.cardMeta}>Patient ID: HLR-2089</Text>
        </View>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Health overview</Text>
        <Text style={styles.profileItem}>Blood pressure: 118/76</Text>
        <Text style={styles.profileItem}>Heart rate: 72 bpm</Text>
        <Text style={styles.profileItem}>Last blood test: 2 weeks ago</Text>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Care preferences</Text>
        <Text style={styles.profileItem}>• Push notifications enabled</Text>
        <Text style={styles.profileItem}>• Preferred contact: SMS</Text>
        <Text style={styles.profileItem}>• Emergency contact: Sia Patel</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 110,
  },
  screen: {
    gap: 18,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  eyebrow: {
    fontSize: 12,
    color: theme.colors.muted,
    marginBottom: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: theme.colors.text,
  },
  avatarButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  heroCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 4,
  },
  heroRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 6,
  },
  heroDate: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  heroSubtext: {
    marginTop: 16,
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  primaryText: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  metricLabel: {
    fontSize: 12,
    color: theme.colors.muted,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginTop: 8,
  },
  metricStatus: {
    marginTop: 6,
    fontSize: 12,
    color: theme.colors.success,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  linkText: {
    fontSize: 13,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionCard: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  actionIcon: {
    fontSize: 26,
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 13,
    color: theme.colors.text,
    textAlign: 'center',
    fontWeight: '600',
  },
  upcomingCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  timePill: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  timePillText: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  upcomingInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 13,
    color: theme.colors.muted,
    marginBottom: 2,
  },
  doctorCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorAvatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  doctorInitial: {
    color: theme.colors.primary,
    fontWeight: '700',
    fontSize: 18,
  },
  doctorInfo: {
    flex: 1,
  },
  ratingText: {
    fontSize: 12,
    color: theme.colors.muted,
    marginTop: 4,
  },
  secondaryButton: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 12,
  },
  secondaryText: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateBlock: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  dateMonth: {
    fontSize: 11,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  dateDay: {
    fontSize: 22,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  appointmentInfo: {
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginLeft: 8,
  },
  confirmed: {
    backgroundColor: '#E8F8EE',
  },
  pending: {
    backgroundColor: '#FFF6DB',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: theme.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarLargeText: {
    fontSize: 24,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  profileItem: {
    color: theme.colors.text,
    fontSize: 14,
    marginTop: 8,
  },
  tabBar: {
    position: 'absolute',
    left: 18,
    right: 18,
    bottom: 18,
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
    elevation: 6,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: theme.colors.primaryLight,
  },
  tabLabel: {
    color: theme.colors.muted,
    fontWeight: '600',
    fontSize: 12,
  },
  activeTabLabel: {
    color: theme.colors.primary,
  },
});
