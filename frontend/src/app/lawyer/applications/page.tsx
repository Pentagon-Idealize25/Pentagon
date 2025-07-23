'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Clock, 
  DollarSign, 
  Eye, 
  MessageCircle, 
  CheckCircle, 
  XCircle,
  MapPin,
  Star,
  Calendar,
  Filter,
  Search
} from 'lucide-react';

// Dummy data for applications
const dummyApplications = [
  {
    id: 1,
    applicantName: 'Sarah Johnson',
    applicantEmail: 'sarah.j@email.com',
    jobTitle: 'Corporate Legal Consultation',
    jobId: 1,
    appliedAt: '2024-01-22T10:30:00Z',
    status: 'pending',
    coverLetter: 'I have 8 years of experience in corporate law and have successfully handled over 200 corporate restructuring cases...',
    hourlyRate: '$350',
    estimatedHours: '20-25',
    experience: 'expert',
    rating: 4.9,
    completedJobs: 145,
    location: 'New York, NY',
    availability: 'Available immediately',
  },
  {
    id: 2,
    applicantName: 'Michael Chen',
    applicantEmail: 'michael.chen@email.com',
    jobTitle: 'Employment Law Case',
    jobId: 2,
    appliedAt: '2024-01-21T14:15:00Z',
    status: 'reviewed',
    coverLetter: 'As an employment law specialist with 6 years of experience, I have extensive knowledge in wrongful termination cases...',
    hourlyRate: '$275',
    estimatedHours: '15-20',
    experience: 'intermediate',
    rating: 4.7,
    completedJobs: 89,
    location: 'San Francisco, CA',
    availability: 'Available in 1 week',
  },
  {
    id: 3,
    applicantName: 'Emily Rodriguez',
    applicantEmail: 'emily.r@email.com',
    jobTitle: 'Real Estate Contract Review',
    jobId: 3,
    appliedAt: '2024-01-20T09:45:00Z',
    status: 'contacted',
    coverLetter: 'I specialize in commercial real estate law and have reviewed over 500 purchase agreements...',
    hourlyRate: '$300',
    estimatedHours: '10-15',
    experience: 'expert',
    rating: 4.8,
    completedJobs: 203,
    location: 'Los Angeles, CA',
    availability: 'Available immediately',
  },
  {
    id: 4,
    applicantName: 'David Thompson',
    applicantEmail: 'david.t@email.com',
    jobTitle: 'Criminal Defense Consultation',
    jobId: 4,
    appliedAt: '2024-01-19T16:20:00Z',
    status: 'rejected',
    coverLetter: 'With 4 years in criminal defense, I have successfully defended clients in various misdemeanor cases...',
    hourlyRate: '$250',
    estimatedHours: '25-30',
    experience: 'intermediate',
    rating: 4.5,
    completedJobs: 67,
    location: 'Chicago, IL',
    availability: 'Available in 2 weeks',
  },
  {
    id: 5,
    applicantName: 'Lisa Wang',
    applicantEmail: 'lisa.wang@email.com',
    jobTitle: 'Intellectual Property Case',
    jobId: 5,
    appliedAt: '2024-01-18T11:10:00Z',
    status: 'accepted',
    coverLetter: 'I am an IP law expert with 10+ years of experience in trademark and patent law...',
    hourlyRate: '$400',
    estimatedHours: '30-40',
    experience: 'expert',
    rating: 4.9,
    completedJobs: 178,
    location: 'Seattle, WA',
    availability: 'Available immediately',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'reviewed':
      return 'bg-blue-100 text-blue-800';
    case 'contacted':
      return 'bg-purple-100 text-purple-800';
    case 'accepted':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getExperienceLevel = (experience: string) => {
  switch (experience) {
    case 'entry':
      return 'Entry Level';
    case 'intermediate':
      return 'Intermediate';
    case 'expert':
      return 'Expert';
    default:
      return experience;
  }
};

export default function ApplicationsPage() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);

  const filteredApplications = dummyApplications.filter(app => {
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const applicationStats = {
    total: dummyApplications.length,
    pending: dummyApplications.filter(a => a.status === 'pending').length,
    reviewed: dummyApplications.filter(a => a.status === 'reviewed').length,
    accepted: dummyApplications.filter(a => a.status === 'accepted').length,
  };

  const handleStatusChange = (applicationId: number, newStatus: string) => {
    // In a real app, this would make an API call
    console.log(`Changing application ${applicationId} status to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-600">Total Applications</p>
            <p className="text-2xl font-bold text-gray-900">{applicationStats.total}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-sm font-medium text-yellow-600">Pending Review</p>
            <p className="text-2xl font-bold text-yellow-900">{applicationStats.pending}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-600">Under Review</p>
            <p className="text-2xl font-bold text-blue-900">{applicationStats.reviewed}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm font-medium text-green-600">Accepted</p>
            <p className="text-2xl font-bold text-green-900">{applicationStats.accepted}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search applicants or jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <option value="all">All Applications</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="contacted">Contacted</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <div key={application.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Application Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-lg font-medium text-white">
                        {application.applicantName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>

                    {/* Applicant Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {application.applicantName}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        Applied for: <span className="font-medium">{application.jobTitle}</span>
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{application.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{application.completedJobs} jobs completed</span>
                        <span>•</span>
                        <span>{getExperienceLevel(application.experience)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Application Details */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{application.hourlyRate}/hr</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{application.estimatedHours} hours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{application.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{application.availability}</span>
                  </div>
                </div>

                {/* Cover Letter Preview */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Cover Letter</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {application.coverLetter}
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto">
                    Read more
                  </Button>
                </div>

                {/* Applied Date and Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    Applied on {new Date(application.appliedAt).toLocaleDateString()} at {new Date(application.appliedAt).toLocaleTimeString()}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View Profile
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    
                    {application.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleStatusChange(application.id, 'accepted')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 border-red-300 hover:bg-red-50"
                          onClick={() => handleStatusChange(application.id, 'rejected')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Decline
                        </Button>
                      </>
                    )}

                    {application.status === 'reviewed' && (
                      <Button 
                        size="sm"
                        onClick={() => handleStatusChange(application.id, 'contacted')}
                      >
                        Contact Applicant
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredApplications.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedStatus !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : 'You haven\'t received any applications yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
