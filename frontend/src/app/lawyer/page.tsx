'use client';

import { useState } from 'react'; // Keep useState if used elsewhere for state management
import DashboardStats from '@/components/lawyer/DashboardStats';
import RecentCaseUpdates from '@/components/lawyer/RecentCaseUpdates'; // Renamed
import CaseOverviewChart from '@/components/lawyer/CaseOverviewChart'; // Renamed
import QuickActions from '@/components/lawyer/QuickActions';

export default function LawyerDashboard() {
  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen"> {/* Added subtle background and padding */}
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"> {/* Added border */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, Attorney!
        </h1>
        <p className="text-gray-600 text-base">
          Here's a concise overview of your recent legal activities and key metrics.
        </p>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats />

      {/* Charts and Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Case Overview Chart */}
        <CaseOverviewChart />
        
        {/* Recent Case Updates */}
        <RecentCaseUpdates />
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
}