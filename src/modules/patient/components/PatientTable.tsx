/**
 * Patient Table Component
 * Displays patients in a table with actions
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/common/Button';
import type { Patient } from '../types';
import type { UserRole } from '@/modules/auth/types';
import { hasPermission } from '@/utils/rbac';

interface PatientTableProps {
  patients: Patient[];
  userRole: UserRole;
  onEdit?: (patient: Patient) => void;
  onDelete?: (patient: Patient) => void;
  onViewPredictions?: (patient: Patient) => void;
}

/**
 * Format date to readable string
 */
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Calculate age from date of birth
 */
function calculateAge(dateOfBirth: string | null): number | null {
  if (!dateOfBirth) return null;

  try {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  } catch {
    return null;
  }
}

/**
 * Patient Table Component
 */
export function PatientTable({
  patients,
  userRole,
  onEdit,
  onDelete,
  onViewPredictions,
}: PatientTableProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const canUpdate = hasPermission(userRole, 'patient:update');
  const canDelete = hasPermission(userRole, 'patient:delete');
  const canViewPredictions = hasPermission(userRole, 'prediction:read');

  const handleDelete = (patient: Patient) => {
    if (deleteConfirm === patient.id) {
      onDelete?.(patient);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(patient.id);
      // Auto-cancel delete confirmation after 3 seconds
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  if (patients.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-secondary-200">
        <svg
          className="mx-auto h-12 w-12 text-secondary-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-secondary-900">No patients</h3>
        <p className="mt-1 text-sm text-secondary-500">Get started by creating a new patient.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-secondary-200">
      <table className="min-w-full divide-y divide-secondary-200">
        <thead className="bg-secondary-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">
              Patient
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">
              Patient ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">
              Age
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">
              Gender
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-700 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-secondary-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-secondary-200">
          {patients.map((patient) => (
            <tr key={patient.id} className="hover:bg-secondary-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-700 font-medium text-sm">
                      {patient.first_name.charAt(0)}
                      {patient.last_name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-secondary-900">
                      {patient.first_name} {patient.last_name}
                    </div>
                    <div className="text-sm text-secondary-500">MRN: {patient.mrn}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-mono text-secondary-900">{patient.patient_id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {patient.date_of_birth ? (
                  <>
                    <div className="text-sm text-secondary-900">
                      {calculateAge(patient.date_of_birth) !== null
                        ? `${calculateAge(patient.date_of_birth)} years`
                        : 'N/A'}
                    </div>
                    <div className="text-xs text-secondary-500">{formatDate(patient.date_of_birth)}</div>
                  </>
                ) : (
                  <span className="text-sm text-secondary-400">N/A</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-secondary-100 text-secondary-800 capitalize">
                  {patient.gender}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                {patient.email && <div>{patient.email}</div>}
                {patient.phone && <div>{patient.phone}</div>}
                {!patient.email && !patient.phone && <span className="text-secondary-400">N/A</span>}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-500">
                {formatDate(patient.created_at)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                {canViewPredictions && (
                  <button
                    onClick={() => onViewPredictions?.(patient)}
                    className="text-info-600 hover:text-info-900 transition-colors"
                    title="View Predictions"
                  >
                    <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </button>
                )}
                {canUpdate && (
                  <button
                    onClick={() => onEdit?.(patient)}
                    className="text-primary-600 hover:text-primary-900 transition-colors"
                    title="Edit"
                  >
                    <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={() => handleDelete(patient)}
                    className={`transition-colors ${
                      deleteConfirm === patient.id
                        ? 'text-error-700 hover:text-error-900'
                        : 'text-error-600 hover:text-error-900'
                    }`}
                    title={deleteConfirm === patient.id ? 'Click again to confirm' : 'Delete'}
                  >
                    {deleteConfirm === patient.id ? (
                      <svg className="w-5 h-5 inline" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    )}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
