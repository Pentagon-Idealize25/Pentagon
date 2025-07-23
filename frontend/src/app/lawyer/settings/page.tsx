'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Bell, 
  Shield, 
  CreditCard,
  FileText,
  Save,
  Camera
} from 'lucide-react';

interface ProfileData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
  };
  professionalInfo: {
    barNumber: string;
    licenseState: string;
    practiceAreas: string[];
    experience: string;
    hourlyRate: string;
    languages: string[];
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    applicationAlerts: boolean;
    marketingEmails: boolean;
  };
}

const initialData: ProfileData = {
  personalInfo: {
    firstName: 'John',
    lastName: 'Attorney',
    email: 'john.attorney@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Experienced corporate lawyer with 10+ years in the field, specializing in mergers, acquisitions, and corporate compliance.',
  },
  professionalInfo: {
    barNumber: 'NY123456789',
    licenseState: 'New York',
    practiceAreas: ['Corporate Law', 'Employment Law', 'Contract Law'],
    experience: '10+ years',
    hourlyRate: '350',
    languages: ['English', 'Spanish'],
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: false,
    applicationAlerts: true,
    marketingEmails: false,
  },
};

export default function SettingsPage() {
  const [profileData, setProfileData] = useState(initialData);
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Profile updated:', profileData);
    setIsSaving(false);
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const updateProfessionalInfo = (field: string, value: string | string[]) => {
    setProfileData(prev => ({
      ...prev,
      professionalInfo: {
        ...prev.professionalInfo,
        [field]: value
      }
    }));
  };

  const updateNotifications = (field: string, value: boolean) => {
    setProfileData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }));
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'professional', name: 'Professional Info', icon: FileText },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'billing', name: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
            <p className="text-gray-600">Manage your profile and account preferences</p>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:w-64 bg-white rounded-lg shadow-sm p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              
              {/* Profile Picture */}
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
                <div>
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-gray-600 mt-2">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <Input
                    type="text"
                    value={profileData.personalInfo.firstName}
                    onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    value={profileData.personalInfo.lastName}
                    onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={profileData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={profileData.personalInfo.phone}
                    onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <Input
                    type="text"
                    value={profileData.personalInfo.location}
                    onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Bio
                  </label>
                  <textarea
                    rows={4}
                    value={profileData.personalInfo.bio}
                    onChange={(e) => updatePersonalInfo('bio', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell clients about your experience and expertise..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Professional Info Tab */}
          {activeTab === 'professional' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Professional Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bar Number
                  </label>
                  <Input
                    type="text"
                    value={profileData.professionalInfo.barNumber}
                    onChange={(e) => updateProfessionalInfo('barNumber', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License State
                  </label>
                  <Input
                    type="text"
                    value={profileData.professionalInfo.licenseState}
                    onChange={(e) => updateProfessionalInfo('licenseState', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <select
                    value={profileData.professionalInfo.experience}
                    onChange={(e) => updateProfessionalInfo('experience', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="0-2 years">0-2 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="6-10 years">6-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hourly Rate ($)
                  </label>
                  <Input
                    type="number"
                    value={profileData.professionalInfo.hourlyRate}
                    onChange={(e) => updateProfessionalInfo('hourlyRate', e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Practice Areas (comma separated)
                  </label>
                  <Input
                    type="text"
                    value={profileData.professionalInfo.practiceAreas.join(', ')}
                    onChange={(e) => updateProfessionalInfo('practiceAreas', e.target.value.split(', '))}
                    placeholder="e.g., Corporate Law, Employment Law, Contract Law"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages (comma separated)
                  </label>
                  <Input
                    type="text"
                    value={profileData.professionalInfo.languages.join(', ')}
                    onChange={(e) => updateProfessionalInfo('languages', e.target.value.split(', '))}
                    placeholder="e.g., English, Spanish, French"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.emailNotifications}
                      onChange={(e) => updateNotifications('emailNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                    <p className="text-sm text-gray-600">Receive urgent notifications via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.smsNotifications}
                      onChange={(e) => updateNotifications('smsNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Application Alerts</h3>
                    <p className="text-sm text-gray-600">Get notified when someone applies to your jobs</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.applicationAlerts}
                      onChange={(e) => updateNotifications('applicationAlerts', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">Marketing Emails</h3>
                    <p className="text-sm text-gray-600">Receive updates about new features and tips</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.marketingEmails}
                      onChange={(e) => updateNotifications('marketingEmails', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <Input type="password" placeholder="Enter current password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <Input type="password" placeholder="Enter new password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <Input type="password" placeholder="Confirm new password" />
                    </div>
                    <Button>Update Password</Button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Billing & Payments</h2>
              
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Current Plan</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Professional Plan</p>
                      <p className="text-sm text-gray-600">$29/month • Unlimited job postings</p>
                    </div>
                    <Button variant="outline">Change Plan</Button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Payment Method</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-6 w-6 text-gray-400" />
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-600">Expires 12/2026</p>
                      </div>
                    </div>
                    <Button variant="outline">Update</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
