'use client'

import { ReactNode, useState } from 'react';
import LawyerSidebar from '@/components/lawyer/LawyerSidebar';
import LawyerHeader from '@/components/lawyer/LawyerHeader';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LawyerLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar toggle button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-white shadow-md"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Sidebar */}
      <LawyerSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-10">
        <LawyerHeader />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
