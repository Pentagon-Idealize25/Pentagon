'use client';

import { Gavel, Users, TrendingUp, DollarSign } from 'lucide-react'; // Changed icons

// Dummy data for dashboard stats
const stats = [
  {
    name: 'Total Cases Handled',
    value: '87',
    change: '+5%',
    changeType: 'increase',
    icon: Gavel, // Icon for cases
  },
  {
    name: 'Active Clients',
    value: '42',
    change: '+3%',
    changeType: 'increase',
    icon: Users, // Icon for clients
  },
  {
    name: 'Revenue Growth',
    value: '+12%',
    change: 'vs Last Quarter',
    changeType: 'increase',
    icon: DollarSign, // Icon for revenue
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow-sm p-5 border border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-md bg-gray-900"> {/* Darker background for icon */}
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center text-sm">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                stat.changeType === 'increase'
                  ? 'bg-green-50 text-green-700' // Subtle green for increase
                  : 'bg-red-50 text-red-700' // Subtle red for decrease
              }`}
            >
              <TrendingUp className="h-3 w-3 mr-1" /> {/* Consistent icon for trend */}
              {stat.change}
            </span>
            <span className="ml-2 text-gray-400">{stat.change.includes('%') ? 'last month' : ''}</span> {/* Conditional text */}
          </div>
        </div>
      ))}
    </div>
  );
}