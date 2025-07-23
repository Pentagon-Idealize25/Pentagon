'use client';

import { Clock, MapPin, Tag } from 'lucide-react'; // Changed DollarSign to Tag for legal area
import { Button } from '@/components/ui/button';

// Dummy data for recent case updates
const recentCaseUpdates = [
  {
    id: 1,
    clientName: 'Sarah Johnson',
    caseTitle: 'Corporate Dispute Resolution',
    updatedAt: '2 hours ago',
    location: 'New York, NY',
    legalArea: 'Corporate Law', // Changed from budget
    status: 'pending',
    avatar: 'SJ',
  },
  {
    id: 2,
    clientName: 'Michael Chen',
    caseTitle: 'Employment Law Consultation',
    updatedAt: '5 hours ago',
    location: 'San Francisco, CA',
    legalArea: 'Employment Law',
    status: 'reviewed',
    avatar: 'MC',
  },
  {
    id: 3,
    clientName: 'Emily Rodriguez',
    caseTitle: 'Real Estate Property Transfer',
    updatedAt: '1 day ago',
    location: 'Los Angeles, CA',
    legalArea: 'Real Estate Law',
    status: 'pending',
    avatar: 'ER',
  },
  {
    id: 4,
    clientName: 'David Thompson',
    caseTitle: 'Criminal Defense Appeal',
    updatedAt: '2 days ago',
    location: 'Chicago, IL',
    legalArea: 'Criminal Defense',
    status: 'contacted',
    avatar: 'DT',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-gray-100 text-gray-700'; // Muted gray for pending
    case 'reviewed':
      return 'bg-gray-200 text-gray-800'; // Slightly darker gray for reviewed
    case 'contacted':
      return 'bg-green-50 text-green-700'; // Subtle green for contacted
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export default function RecentCaseUpdates() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Case Updates</h3>
        <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {recentCaseUpdates.map((update) => (
          <div
            key={update.id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-white">
                    {update.avatar}
                  </span>
                </div>

                {/* Case Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {update.clientName}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 truncate">
                    {update.caseTitle}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span>{update.updatedAt}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span>{update.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Tag className="h-3 w-3 text-gray-400" /> {/* Changed icon */}
                      <span>{update.legalArea}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex flex-col items-end space-y-2 ml-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    update.status
                  )}`}
                >
                  {update.status.charAt(0).toUpperCase() + update.status.slice(1)}
                </span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                    View
                  </Button>
                  <Button size="sm" className="bg-gray-900 text-white hover:bg-gray-800">
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {recentCaseUpdates.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No recent case updates.</p>
        </div>
      )}
    </div>
  );
}