/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MedicalRecord,
  NotificationItem,
  ScreenId,
  FilterOptions,
} from './types';
import { INITIAL_RECORDS, INITIAL_NOTIFICATIONS } from './data/mockData';
import { BottomNav } from './components/common/BottomNav';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { DeviceFrame } from './components/layout/DeviceFrame';
import { OfflineIndicator } from './components/common/OfflineIndicator';

// Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { MedicalRecordsScreen } from './components/screens/MedicalRecordsScreen';
import { DetailRecordScreen } from './components/screens/DetailRecordScreen';
import { MonitoringScreen } from './components/screens/MonitoringScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { ReportsScreen } from './components/screens/ReportsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { SearchScreen } from './components/screens/SearchScreen';
import { FilterBottomSheet } from './components/screens/FilterBottomSheet';
import { EmptyStatesScreen } from './components/screens/EmptyStatesScreen';
import { LoadingErrorScreen } from './components/screens/LoadingErrorScreen';
import { DesignSystemScreen } from './components/screens/DesignSystemScreen';
import { AddRecordModal } from './components/screens/AddRecordModal';
import { WardReturnPortalScreen } from './components/screens/WardReturnPortalScreen';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('home');
  const [records, setRecords] = useState<MedicalRecord[]>(INITIAL_RECORDS);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord>(INITIAL_RECORDS[0]);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    statusKelengkapan: 'all',
    statusPengembalian: 'all',
    serviceUnit: 'all',
    dateRange: 'all',
  });

  // Toast Helpers
  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, description?: string) => {
    const newToast: ToastMessage = {
      id: `toast-${Date.now()}-${Math.random()}`,
      type,
      title,
      description,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Record Handlers
  const handleSelectRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
    setActiveScreen('detail');
  };

  const handleUpdateRecord = (updatedRecord: MedicalRecord) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === updatedRecord.id ? updatedRecord : r))
    );
    setSelectedRecord(updatedRecord);
    addToast(
      'success',
      'Status & Lokasi Berkas Diperbarui',
      `No. RM ${updatedRecord.noRm} (${updatedRecord.patientName}) · Lokasi: ${updatedRecord.lokasiBerkas}`
    );
  };

  const handleAddRecord = (newRecord: MedicalRecord) => {
    setRecords((prev) => [newRecord, ...prev]);
    addToast(
      'success',
      'Rekam Medis Berhasil Ditambahkan',
      `No. RM: ${newRecord.noRm} - ${newRecord.patientName}`
    );
    setSelectedRecord(newRecord);
    setActiveScreen('records');
  };

  // Notification Handlers
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('info', 'Semua notifikasi telah ditandai dibaca');
  };

  const handleNotificationClick = (notif: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    if (notif.targetRmId) {
      const match = records.find((r) => r.id === notif.targetRmId);
      if (match) {
        handleSelectRecord(match);
        return;
      }
    }
  };

  // Export Handler
  const handleExport = (type: 'pdf' | 'excel') => {
    const ext = type.toUpperCase();
    addToast(
      'success',
      `Laporan ${ext} Berhasil Diunduh`,
      `File SIMON_KPMK_RSUD_Muara_Enim.${type === 'pdf' ? 'pdf' : 'xlsx'} siap dicetak.`
    );
  };

  const handleResetData = () => {
    setRecords(INITIAL_RECORDS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setSelectedRecord(INITIAL_RECORDS[0]);
    setFilterOptions({
      statusKelengkapan: 'all',
      statusPengembalian: 'all',
      serviceUnit: 'all',
      dateRange: 'all',
    });
    addToast('info', 'Data aplikasi telah direset ke setelan awal');
  };

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const showBottomNav =
    activeScreen === 'home' ||
    activeScreen === 'records' ||
    activeScreen === 'monitoring' ||
    activeScreen === 'notifications' ||
    activeScreen === 'return_portal' ||
    activeScreen === 'profile';

  return (
    <DeviceFrame
      activeScreen={activeScreen}
      onScreenChange={setActiveScreen}
      onResetData={handleResetData}
    >
      {/* Global Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Offline Connectivity Indicator */}
      <OfflineIndicator />

      {/* Screen Routing */}
      {activeScreen === 'splash' && (
        <SplashScreen onContinue={() => setActiveScreen('login')} />
      )}

      {activeScreen === 'login' && (
        <LoginScreen
          onLoginSuccess={() => {
            setActiveScreen('home');
            addToast('success', 'Selamat Datang, Hengki Aditya Saputra, A.Md.RMIK!', 'Akses Instalasi Rekam Medis RSUD Muara Enim aktif.');
          }}
          onForgotPassword={() => {
            addToast('info', 'Hubungi Administrator SIMRS RSUD Muara Enim untuk reset kata sandi.');
          }}
        />
      )}

      {activeScreen === 'home' && (
        <HomeScreen
          records={records}
          onNavigate={setActiveScreen}
          onSelectRecord={handleSelectRecord}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          unreadCount={unreadNotifCount}
        />
      )}

      {activeScreen === 'records' && (
        <MedicalRecordsScreen
          records={records}
          onSelectRecord={handleSelectRecord}
          onOpenFilter={() => setIsFilterOpen(true)}
          onOpenAddModal={() => setIsAddModalOpen(true)}
          activeFilterOptions={filterOptions}
          onUpdateRecord={handleUpdateRecord}
        />
      )}

      {activeScreen === 'detail' && (
        <DetailRecordScreen
          record={selectedRecord}
          onBack={() => setActiveScreen('records')}
          onUpdateRecord={handleUpdateRecord}
        />
      )}

      {activeScreen === 'monitoring' && (
        <MonitoringScreen
          records={records}
          onSelectRecord={handleSelectRecord}
          onNavigate={setActiveScreen}
        />
      )}

      {activeScreen === 'notifications' && (
        <NotificationsScreen
          notifications={notifications}
          onMarkAllAsRead={handleMarkAllAsRead}
          onNotificationClick={handleNotificationClick}
        />
      )}

      {activeScreen === 'reports' && (
        <ReportsScreen records={records} onExport={handleExport} />
      )}

      {activeScreen === 'profile' && (
        <ProfileScreen
          onLogout={() => {
            setActiveScreen('login');
            addToast('info', 'Anda telah berhasil keluar dari akun.');
          }}
          onOpenHelp={() => {
            addToast(
              'info',
              'Bantuan SIMON KPMK',
              'Standar pengisian mengikuti PMK No. 24 Tahun 2022 tentang Rekam Medis.'
            );
          }}
          onOpenAbout={() => {
            setActiveScreen('design_system');
          }}
        />
      )}

      {activeScreen === 'search' && (
        <SearchScreen
          records={records}
          onBack={() => setActiveScreen('home')}
          onSelectRecord={handleSelectRecord}
        />
      )}

      {activeScreen === 'return_portal' && (
        <WardReturnPortalScreen
          records={records}
          onUpdateRecord={handleUpdateRecord}
          onSelectRecord={handleSelectRecord}
        />
      )}

      {activeScreen === 'empty_states' && (
        <EmptyStatesScreen
          onBack={() => setActiveScreen('home')}
          onAction={(type) => {
            if (type === 'add_record') setIsAddModalOpen(true);
            else if (type === 'view_report') setActiveScreen('reports');
            else addToast('info', 'Aksi peragaan empty state dieksekusi');
          }}
        />
      )}

      {activeScreen === 'loading_error' && (
        <LoadingErrorScreen onBack={() => setActiveScreen('home')} />
      )}

      {activeScreen === 'design_system' && (
        <DesignSystemScreen
          onBack={() => setActiveScreen('profile')}
          onTriggerToast={(type) => {
            if (type === 'success') {
              addToast('success', 'Operasi Berhasil', 'Data kelengkapan rekam medis tervalidasi.');
            } else if (type === 'warning') {
              addToast('warning', 'Peringatan Berkas', 'Berkas belum dikembalikan lebih dari 24 jam.');
            } else {
              addToast('error', 'Gagal Memproses', 'Koneksi ke server SIMRS terputus.');
            }
          }}
        />
      )}

      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        currentFilters={filterOptions}
        onApplyFilters={(newFilters) => {
          setFilterOptions(newFilters);
          addToast('info', 'Filter berhasil diterapkan');
        }}
      />

      {/* Add Record Modal */}
      <AddRecordModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddRecord={handleAddRecord}
      />

      {/* Mobile Fixed Bottom Navigation (hidden on desktop because desktop has top/sidebar navigation) */}
      {showBottomNav && (
        <div className="sticky bottom-0 left-0 right-0 z-30 md:hidden">
          <BottomNav
            activeScreen={activeScreen}
            onNavigate={setActiveScreen}
            unreadCount={unreadNotifCount}
          />
        </div>
      )}
    </DeviceFrame>
  );
}
