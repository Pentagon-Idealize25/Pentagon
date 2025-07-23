'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Briefcase, 
  Clock, 
  DollarSign, 
  Eye, 
  Edit, 
  Trash2,
  MapPin,
  Users,
  Calendar,
  MoreVertical
} from 'lucide-react';

// Dummy data for lawyer's jobs
const dummyJobs = [
  {
    id: 1,
    title: 'Corporate Legal Consultation',
    category: 'Corporate Law',
    description: 'Need assistance with corporate restructuring and compliance issues.',
    location: 'New York, NY',
    locationType: 'onsite',
    budget: '$5,000',
    budgetType: 'fixed',
    status: 'active',
    applications: 12,
    postedDate: '2024-01-15',
    urgency: 'medium',
    views: 45,
  },
  {
    id: 2,
    title: 'Employment Law Case',
    category: 'Employment Law',
    description: 'Wrongful termination case requiring experienced employment lawyer.',
    location: 'Remote',
    locationType: 'remote',
    budget: '$250',
    budgetType: 'hourly',
    status: 'active',
    applications: 8,
    postedDate: '2024-01-20',
    urgency: 'high',
    views: 32,
  },
  {
    id: 3,
    title: 'Real Estate Contract Review',
    category: 'Real Estate Law',
    description: 'Review and negotiate commercial real estate purchase agreement.',
    location: 'Los Angeles, CA',
    locationType: 'hybrid',
    budget: '$2,800',
    budgetType: 'fixed',
    status: 'completed',
    applications: 15,
    postedDate: '2024-01-08',
    urgency: 'low',
    views: 67,
  },
  {
    id: 4,
    title: 'Criminal Defense Consultation',
    category: 'Criminal Defense',
    description: 'Need defense attorney for misdemeanor charges.',
    location: 'Chicago, IL',
    locationType: 'onsite',
    budget: '$4,200',
    budgetType: 'fixed',
    status: 'paused',
    applications: 6,
    postedDate: '2024-01-12',
    urgency: 'high',
    views: 28,
  },
  {
    id: 5,
    title: 'Intellectual Property Case',
    category: 'Intellectual Property',
    description: 'Trademark infringement case requiring IP specialist.',
    location: 'Seattle, WA',
    locationType: 'remote',
    budget: '$350',
    budgetType: 'hourly',
    status: 'active',
    applications: 20,
    postedDate: '2024-01-18',
    urgency: 'medium',
    views: 89,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'paused':
      return 'bg-yellow-100 text-yellow-800';
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case 'high':
      return 'text-red-600';
    case 'medium':
      return 'text-yellow-600';
    case 'low':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
};

export default function JobsPage() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = dummyJobs.filter(job => {
    const matchesStatus = selectedStatus === 'all' || job.status === selectedStatus;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const jobStats = {
    total: dummyJobs.length,
    active: dummyJobs.filter(j => j.status === 'active').length,
    completed: dummyJobs.filter(j => j.status === 'completed').length,
    paused: dummyJobs.filter(j => j.status === 'paused').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
          <Button>
            <Briefcase className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600">Total Jobs</p>
            <p className="text-2xl font-bold text-gray-900">{jobStats.total}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm font-medium text-green-600">Active</p>
            <p className="text-2xl font-bold text-green-900">{jobStats.active}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-600">Completed</p>
            <p className="text-2xl font-bold text-blue-900">{jobStats.completed}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-sm font-medium text-yellow-600">Paused</p>
            <p className="text-2xl font-bold text-yellow-900">{jobStats.paused}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Jobs</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Job Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {job.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                        {job.category}
                      </span>
                      <span className={`font-medium ${getUrgencyColor(job.urgency)}`}>
                        {job.urgency.charAt(0).toUpperCase() + job.urgency.slice(1)} Priority
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Job Description */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {job.description}
                </p>

                {/* Job Details */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      {job.budget} {job.budgetType === 'hourly' ? '/hr' : 'fixed'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{job.applications} applications</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{job.views} views</span>
                  </div>
                </div>

                {/* Posted Date */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>Posted on {new Date(job.postedDate).toLocaleDateString()}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      {job.status === 'active' && (
                        <Button variant="outline" size="sm">
                          Pause
                        </Button>
                      )}
                      {job.status === 'paused' && (
                        <Button variant="outline" size="sm">
                          Resume
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || selectedStatus !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : 'You haven\'t posted any jobs yet.'}
            </p>
            <Button>
              <Briefcase className="h-4 w-4 mr-2" />
              Post Your First Job
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
