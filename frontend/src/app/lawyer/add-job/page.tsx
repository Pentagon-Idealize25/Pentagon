'use client'

import AddJobForm from '@/components/lawyer/AddJobForm';

export default function AddJobPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Post New Legal Job
        </h1>
        <p className="text-gray-600">
          Create a new job posting for your legal services.
        </p>
      </div>

      {/* Add Job Form */}
      <AddJobForm />
    </div>
  );
}
