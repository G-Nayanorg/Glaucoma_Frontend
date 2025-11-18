/**
 * Patient Form Component
 * Form for creating and editing patients
 */

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/common/Button';
import type { Patient, CreatePatientData, UpdatePatientData } from '../types';

interface PatientFormProps {
  patient?: Patient | null;
  onSubmit: (data: CreatePatientData | UpdatePatientData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

/**
 * Patient Form Component
 */
export function PatientForm({ patient, onSubmit, onCancel, isLoading }: PatientFormProps) {
  const [formData, setFormData] = useState<any>({
    first_name: '',
    last_name: '',
    mrn: '',
    date_of_birth: '',
    gender: 'male',
    email: '',
    phone: '',
    address: '',
    medical_history: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when editing
  useEffect(() => {
    if (patient) {
      setFormData({
        first_name: patient.first_name,
        last_name: patient.last_name,
        mrn: patient.mrn,
        date_of_birth: patient.date_of_birth || '',
        gender: patient.gender || 'male',
        email: patient.email || '',
        phone: patient.phone || '',
        address: patient.address || '',
        medical_history: typeof patient.medical_history === 'string'
          ? patient.medical_history
          : JSON.stringify(patient.medical_history || {}, null, 2),
      });
    }
  }, [patient]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    }

    if (!patient && !formData.mrn.trim()) {
      newErrors.mrn = 'Medical Record Number (MRN) is required';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      // Format data for submission
      const submitData: any = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        date_of_birth: formData.date_of_birth || undefined,
        gender: formData.gender || undefined,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        address: formData.address || undefined,
      };

      // Add MRN only for new patients
      if (!patient) {
        submitData.mrn = formData.mrn;
      }

      // Parse medical_history as JSON object if it's a string
      if (formData.medical_history) {
        try {
          submitData.medical_history = typeof formData.medical_history === 'string'
            ? JSON.parse(formData.medical_history)
            : formData.medical_history;
        } catch {
          // If JSON parse fails, store as object with notes key
          submitData.medical_history = { notes: formData.medical_history };
        }
      }

      await onSubmit(submitData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-secondary-700 mb-1">
            First Name <span className="text-error-600">*</span>
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors ${
              errors.first_name ? 'border-error-500' : 'border-secondary-300'
            }`}
            disabled={isLoading}
          />
          {errors.first_name && <p className="mt-1 text-sm text-error-600">{errors.first_name}</p>}
        </div>

        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-secondary-700 mb-1">
            Last Name <span className="text-error-600">*</span>
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors ${
              errors.last_name ? 'border-error-500' : 'border-secondary-300'
            }`}
            disabled={isLoading}
          />
          {errors.last_name && <p className="mt-1 text-sm text-error-600">{errors.last_name}</p>}
        </div>
      </div>

      {/* MRN Field - Only show for new patients */}
      {!patient && (
        <div>
          <label htmlFor="mrn" className="block text-sm font-medium text-secondary-700 mb-1">
            Medical Record Number (MRN) <span className="text-error-600">*</span>
          </label>
          <input
            type="text"
            id="mrn"
            name="mrn"
            value={formData.mrn}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors ${
              errors.mrn ? 'border-error-500' : 'border-secondary-300'
            }`}
            placeholder="Enter unique medical record number"
            disabled={isLoading}
          />
          {errors.mrn && <p className="mt-1 text-sm text-error-600">{errors.mrn}</p>}
          <p className="mt-1 text-xs text-secondary-500">This will be used to uniquely identify the patient</p>
        </div>
      )}

      {/* Date of Birth and Gender */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date_of_birth" className="block text-sm font-medium text-secondary-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="date_of_birth"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors ${
              errors.date_of_birth ? 'border-error-500' : 'border-secondary-300'
            }`}
            disabled={isLoading}
          />
          {errors.date_of_birth && <p className="mt-1 text-sm text-error-600">{errors.date_of_birth}</p>}
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-secondary-700 mb-1">
            Gender <span className="text-error-600">*</span>
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
            disabled={isLoading}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors ${
              errors.email ? 'border-error-500' : 'border-secondary-300'
            }`}
            disabled={isLoading}
          />
          {errors.email && <p className="mt-1 text-sm text-error-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors ${
              errors.phone ? 'border-error-500' : 'border-secondary-300'
            }`}
            disabled={isLoading}
          />
          {errors.phone && <p className="mt-1 text-sm text-error-600">{errors.phone}</p>}
        </div>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-secondary-700 mb-1">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
          disabled={isLoading}
        />
      </div>

      {/* Medical History */}
      <div>
        <label htmlFor="medical_history" className="block text-sm font-medium text-secondary-700 mb-1">
          Medical History
        </label>
        <textarea
          id="medical_history"
          name="medical_history"
          value={formData.medical_history}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors resize-none"
          placeholder="Enter relevant medical history..."
          disabled={isLoading}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-secondary-200">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? 'Saving...' : patient ? 'Update Patient' : 'Create Patient'}
        </Button>
      </div>
    </form>
  );
}
