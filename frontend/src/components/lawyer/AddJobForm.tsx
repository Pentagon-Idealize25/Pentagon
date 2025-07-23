'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Gavel, // Changed from MapPin
  Award, // Changed from DollarSign
  BookOpen, // Changed from Clock
  Users, // Retained from Users
  Calendar, // Retained from Calendar
  Briefcase, // Changed from FileText
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

interface SuccessStoryData {
  caseTitle: string;
  legalArea: string; // Renamed from category
  description: string; // Describes the case summary
  challenges: string; // Replaced requirements
  clientType: 'individual' | 'business' | 'nonprofit';
  location: string; // Case location
  caseType: 'litigation' | 'transactional' | 'advisory' | 'other'; // Replaced locationType
  outcome: string; // Replaced budget
  impact: string; // Replaced duration
  lawyerInCharge: string; // Replaced experienceLevel
  dateOfCase: string; // Replaced urgency
  skillsUsed: string; // Replaced skills
  communicationMethod: 'email' | 'phone' | 'video' | 'inperson'; // Replaced communicationPreference
}

const initialSuccessStoryData: SuccessStoryData = {
  caseTitle: '',
  legalArea: '',
  description: '',
  challenges: '',
  clientType: 'individual',
  location: '',
  caseType: 'litigation',
  outcome: '',
  impact: '',
  lawyerInCharge: '',
  dateOfCase: '',
  skillsUsed: '',
  communicationMethod: 'email',
};

const legalPracticeAreas = [
  'Corporate Law',
  'Criminal Defense',
  'Family Law',
  'Real Estate Law',
  'Employment Law',
  'Intellectual Property',
  'Immigration Law',
  'Personal Injury',
  'Tax Law',
  'Contract Law',
  'Business Law',
  'Estate Planning',
  'Environmental Law', // Added more options
  'Bankruptcy Law',
  'Civil Rights Law',
];

export default function AddSuccessStoryForm() {
  const [formData, setFormData] = useState<SuccessStoryData>(initialSuccessStoryData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: keyof SuccessStoryData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Success story data:', formData);
    setIsSubmitting(false);
    setSubmitted(true);

    // Reset form after success
    setTimeout(() => {
      setSubmitted(false);
      setFormData(initialSuccessStoryData);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Success Story Added Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Your lawyer's success story has been recorded. It will now be visible to potential clients.
        </p>
        <Button onClick={() => setSubmitted(false)}>Add Another Story</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-8">
      {/* Case Details */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
          <Briefcase className="h-5 w-5" />
          <span>Case Details</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Case Title *
            </label>
            <Input
              type="text"
              value={formData.caseTitle}
              onChange={(e) => handleInputChange('caseTitle', e.target.value)}
              placeholder="e.g., Landmark Corporate Merger Case"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Legal Practice Area *
            </label>
            <select
              value={formData.legalArea}
              onChange={(e) => handleInputChange('legalArea', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a practice area</option>
              {legalPracticeAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Case Summary *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Provide a detailed summary of the case..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Challenges Faced
          </label>
          <textarea
            value={formData.challenges}
            onChange={(e) => handleInputChange('challenges', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the complexities or obstacles encountered..."
          />
        </div>
      </div>

      {/* Case Location & Type */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
          <Gavel className="h-5 w-5" />
          <span>Case Location & Type</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Case Location
            </label>
            <Input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="e.g., Supreme Court of California"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type of Case
            </label>
            <select
              value={formData.caseType}
              onChange={(e) =>
                handleInputChange(
                  'caseType',
                  e.target.value as 'litigation' | 'transactional' | 'advisory' | 'other'
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="litigation">Litigation</option>
              <option value="transactional">Transactional</option>
              <option value="advisory">Advisory</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Outcome & Story Details */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
          <Award className="h-5 w-5" />
          <span>Outcome & Story Details</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Case Outcome *
            </label>
            <Input
              type="text"
              value={formData.outcome}
              onChange={(e) => handleInputChange('outcome', e.target.value)}
              placeholder="e.g., Favorable ruling, Settlement reached"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Impact & Significance
            </label>
            <Input
              type="text"
              value={formData.impact}
              onChange={(e) => handleInputChange('impact', e.target.value)}
              placeholder="e.g., Set a new legal precedent, Saved client millions"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lawyer(s) in Charge
            </label>
            <Input
              type="text"
              value={formData.lawyerInCharge}
              onChange={(e) => handleInputChange('lawyerInCharge', e.target.value)}
              placeholder="e.g., Jane Doe, John Smith"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Case / Resolution
            </label>
            <Input
              type="date"
              value={formData.dateOfCase}
              onChange={(e) => handleInputChange('dateOfCase', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client Type
            </label>
            <select
              value={formData.clientType}
              onChange={(e) =>
                handleInputChange(
                  'clientType',
                  e.target.value as 'individual' | 'business' | 'nonprofit'
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="individual">Individual</option>
              <option value="business">Business</option>
              <option value="nonprofit">Nonprofit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Communication Method
            </label>
            <select
              value={formData.communicationMethod}
              onChange={(e) =>
                handleInputChange(
                  'communicationMethod',
                  e.target.value as 'email' | 'phone' | 'video' | 'inperson'
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="video">Video Call</option>
              <option value="inperson">In Person</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skills Utilized (comma separated)
          </label>
          <Input
            type="text"
            value={formData.skillsUsed}
            onChange={(e) => handleInputChange('skillsUsed', e.target.value)}
            placeholder="e.g., Litigation, Negotiation, Legal Research, Public Speaking"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <AlertCircle className="h-4 w-4" />
          <span>All fields marked with * are required</span>
        </div>

        <div className="flex space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setFormData(initialSuccessStoryData)}
          >
            Clear Form
          </Button>
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              !formData.caseTitle ||
              !formData.legalArea ||
              !formData.description ||
              !formData.outcome
            }
            className="min-w-32"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Adding...</span>
              </div>
            ) : (
              'Add Success Story'
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}