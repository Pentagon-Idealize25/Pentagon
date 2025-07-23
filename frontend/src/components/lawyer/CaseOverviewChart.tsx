'use client';

// Dummy data for resolved cases over time
const resolvedCaseData = [
  { month: 'Jan', resolved: 7 },
  { month: 'Feb', resolved: 9 },
  { month: 'Mar', resolved: 6 },
  { month: 'Apr', resolved: 11 },
  { month: 'May', resolved: 14 },
  { month: 'Jun', resolved: 12 },
];

export default function CaseOverviewChart() {
  const maxValue = Math.max(...resolvedCaseData.map((d) => d.resolved));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Cases Handled</h3>
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-3 h-3 bg-blue-900 rounded-full"></div> {/* Muted color for resolved */}
          <span className="text-gray-600">Cases Resolved</span>
        </div>
      </div>

      {/* Simple Bar Chart for Resolved Cases */}
      <div className="space-y-5 py-2">
        {resolvedCaseData.map((data) => (
          <div key={data.month} className="flex items-center space-x-4">
            <div className="w-10 text-xs font-medium text-gray-500 text-right">
              {data.month}
            </div>

            <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
              <div
                className="bg-indigo-900 h-4 rounded-full flex items-center justify-end pr-2"
                style={{ width: `${(data.resolved / maxValue) * 100}%` }}
              >
                {data.resolved > 0 && (
                  <span className="text-xs font-medium text-white">
                    {data.resolved}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4 text-center"> {/* Changed to 2 columns */}
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {resolvedCaseData.reduce((sum, d) => sum + d.resolved, 0)}
            </p>
            <p className="text-sm text-gray-500">Total Resolved</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">
              {/* This might be a placeholder for a true success rate if more data exists,
                  or simply indicate high success if all recorded are successes.
                  For now, we'll just indicate "High". */}
              High
            </p>
            <p className="text-sm text-gray-500">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}