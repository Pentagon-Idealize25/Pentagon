'use client';

import { Plus, FileText, Users, BarChart3, Calendar, Briefcase, Handshake } from 'lucide-react'; // Added Handshake for new action
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const quickActions = [
  {
    name: 'Add Case Story', // Changed action
    description: 'Document a successful case outcome',
    icon: Handshake, // New icon
    href: '/lawyer/add-case-story', // New href
    color: 'bg-gray-900 hover:bg-gray-800', // Black/gray theme
  },
  {
    name: 'Manage Clients', // Changed action
    description: 'View and update client information',
    icon: Users,
    href: '/lawyer/clients', // New href
    color: 'bg-gray-900 hover:bg-gray-800',
  },
  {
    name: 'View Analytics', // Changed action name
    description: 'Analyze practice performance',
    icon: BarChart3,
    href: '/lawyer/analytics',
    color: 'bg-gray-900 hover:bg-gray-800',
  },
  {
    name: 'Upload Documents', // Changed action name
    description: 'Securely store case files',
    icon: FileText,
    href: '/lawyer/documents',
    color: 'bg-gray-900 hover:bg-gray-800',
  },
  {
    name: 'Schedule Consult', // Changed action name
    description: 'Book new client consultations',
    icon: Calendar,
    href: '/lawyer/schedule',
    color: 'bg-gray-900 hover:bg-gray-800',
  },
];

export default function QuickActions() {
  const router = useRouter();

  const handleAction = (href: string) => {
    router.push(href);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.name}
            onClick={() => handleAction(action.href)}
            className="group text-left p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 flex flex-col items-center text-center"
          >
            <div className={`${action.color} p-3 rounded-lg transition-colors duration-200 text-center`}>
              <action.icon className="h-6 w-6 text-white" />
            </div>

            <div className="mt-4"> {/* Increased margin-top for better spacing */}
              <h4 className="font-medium text-gray-900 group-hover:text-gray-700 text-center">
                {action.name}
              </h4>
              <p className="text-sm text-gray-500 mt-1 text-center"> {/* Darker gray for description */}
                {action.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Today's Summary - Simplified and integrated */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <h4 className="text-md font-medium text-gray-900 mb-4">Today's Brief</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-gray-800 font-medium">1 New Inquiry</p>
            <p className="text-gray-600">Pending review</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-gray-800 font-medium">1 Case Closed</p>
            <p className="text-gray-600">Awaiting feedback</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-gray-800 font-medium">1 Consultation</p>
            <p className="text-gray-600">10:00 AM</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-gray-800 font-medium">$1,500 Invoiced</p>
            <p className="text-gray-600">Last 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}