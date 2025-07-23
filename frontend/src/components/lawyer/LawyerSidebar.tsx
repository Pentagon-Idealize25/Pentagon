'use client'

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Home, 
  Briefcase, 
  Plus, 
  Users, 
  BarChart3, 
  FileText, 
  Settings,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';

interface LawyerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/lawyer/dashboard',
    icon: Home,
  },
  {
    name: 'My Jobs',
    href: '/lawyer/jobs',
    icon: Briefcase,
  },
  {
    name: 'Add New Job',
    href: '/lawyer/add-job',
    icon: Plus,
  },
  {
    name: 'Applications',
    href: '/lawyer/applications',
    icon: Users,
  },
  
  {
    name: 'Settings',
    href: '/lawyer/settings',
    icon: Settings,
  },
];

export default function LawyerSidebar({ isOpen, onClose }: LawyerSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href: string) => {
    router.push(href);
    onClose(); // Close sidebar on mobile after navigation
  };

  return (
    <>
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-50">Lawgon</span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="md:hidden"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-10 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors duration-200",
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-amber-50 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5",
                    isActive ? "text-blue-700" : "text-gray-400"
                  )} />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          {/* <div className="p-4 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-1">
                Need Help?
              </h4>
              <p className="text-xs text-gray-600 mb-3">
                Contact our support team for assistance.
              </p>
              <Button size="sm" className="w-full">
                Get Support
              </Button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
