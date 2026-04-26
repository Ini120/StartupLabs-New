'use client';

import { useState } from 'react';
import { Bell, Shield, Eye, Lock, Database, LogOut, ArrowRight } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface SettingItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: 'toggle' | 'link' | 'button';
  value?: boolean;
}

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [dataCollection, setDataCollection] = useState(true);

  const settings: SettingItem[] = [
    {
      title: 'Push Notifications',
      description: 'Receive notifications about meetings and milestones',
      icon: <Bell size={24} className="text-blue-600" />,
      action: 'toggle',
      value: notifications,
    },
    {
      title: 'Email Digest',
      description: 'Get a weekly summary of your startup activities',
      icon: <Bell size={24} className="text-blue-600" />,
      action: 'toggle',
      value: emailDigest,
    },
    {
      title: 'Two-Factor Authentication',
      description: 'Add an extra layer of security to your account',
      icon: <Lock size={24} className="text-green-600" />,
      action: 'toggle',
      value: twoFactor,
    },
    {
      title: 'Data Collection',
      description: 'Allow us to collect usage data to improve the platform',
      icon: <Database size={24} className="text-purple-600" />,
      action: 'toggle',
      value: dataCollection,
    },
  ];

  const handleNotificationsToggle = () => setNotifications(!notifications);
  const handleEmailDigestToggle = () => setEmailDigest(!emailDigest);
  const handleTwoFactorToggle = () => setTwoFactor(!twoFactor);
  const handleDataCollectionToggle = () => setDataCollection(!dataCollection);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
            <h1 className="text-2xl lg:text-3xl font-bold mb-8">Settings</h1>

            {/* Profile Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="p-4 lg:p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold mb-4">Profile</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Alex Johnson"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue="alex@startuplabs.app"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      defaultValue="Passionate about building innovative startups and helping founders succeed."
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="p-4 lg:p-6">
                <h2 className="text-lg font-bold mb-6">Preferences</h2>
                <div className="space-y-4">
                  {/* Notifications */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <Bell size={20} className="text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Push Notifications
                        </p>
                        <p className="text-xs lg:text-sm text-gray-600">
                          Receive notifications about meetings and milestones
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleNotificationsToggle}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                      role="switch"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Email Digest */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <Bell size={20} className="text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Email Digest
                        </p>
                        <p className="text-xs lg:text-sm text-gray-600">
                          Get a weekly summary of your startup activities
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleEmailDigestToggle}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        emailDigest ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                      role="switch"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          emailDigest ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Two Factor */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <Lock size={20} className="text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Two-Factor Authentication
                        </p>
                        <p className="text-xs lg:text-sm text-gray-600">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleTwoFactorToggle}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        twoFactor ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                      role="switch"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          twoFactor ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Data Collection */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Database size={20} className="text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">
                          Data Collection
                        </p>
                        <p className="text-xs lg:text-sm text-gray-600">
                          Allow us to collect usage data to improve the platform
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleDataCollectionToggle}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        dataCollection ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                      role="switch"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          dataCollection ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="p-4 lg:p-6">
                <h2 className="text-lg font-bold mb-6">Security</h2>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-2">
                      <Lock size={18} className="text-blue-600" />
                      <span className="font-medium text-sm lg:text-base">
                        Change Password
                      </span>
                    </div>
                    <ArrowRight size={18} className="text-gray-400" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-2">
                      <Shield size={18} className="text-purple-600" />
                      <span className="font-medium text-sm lg:text-base">
                        Active Sessions
                      </span>
                    </div>
                    <ArrowRight size={18} className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 rounded-lg border border-red-200 p-4 lg:p-6">
              <h2 className="text-lg font-bold text-red-900 mb-4">Danger Zone</h2>
              <button className="w-full flex items-center justify-between p-3 bg-white border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
                <div className="flex items-center gap-2">
                  <LogOut size={18} className="text-red-600" />
                  <span className="font-medium text-red-600">Log Out</span>
                </div>
                <ArrowRight size={18} className="text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
