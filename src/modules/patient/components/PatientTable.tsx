/**
 * Patient Table Component
 * Displays patients in a table with actions
 */

'use client';

import { useState } from 'react';
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
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const canUpdate = hasPermission(userRole, 'patient:update');
  const canDelete = hasPermission(userRole, 'patient:delete');
  const canViewPredictions = hasPermission(userRole, 'prediction:read');

  const handleDeleteClick = (patient: Patient) => {
    setPatientToDelete(patient);
    setDeleteError(null); // Reset any previous errors
  };

  const handleDeleteConfirm = async () => {
    if (!patientToDelete) return;

    try {
      setIsDeleting(true);
      setDeleteError(null);
      await onDelete?.(patientToDelete);
      // Only close modal if deletion was successful
      setPatientToDelete(null);
    } catch (err) {
      console.error('Error deleting patient:', err);
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete patient');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setPatientToDelete(null);
    setDeleteError(null);
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
            <tr key={patient.patient_id} className="hover:bg-secondary-50 transition-colors">
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
                    title="Update Patient"
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
                    onClick={() => handleDeleteClick(patient)}
                    className="text-error-600 hover:text-error-900 transition-colors"
                    title="Delete Patient"
                  >
                    <svg className="w-5 h-5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {patientToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-secondary-200">
              <h3 className="text-lg font-semibold text-secondary-900">Confirm Delete</h3>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg
                    className="w-12 h-12 text-error-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-secondary-900 mb-2">
                    Are you sure you want to delete this patient?
                  </p>
                  <div className="bg-secondary-50 rounded-lg p-3 mb-2">
                    <p className="text-sm font-medium text-secondary-900">
                      {patientToDelete.first_name} {patientToDelete.last_name}
                    </p>
                    <p className="text-xs text-secondary-600">Patient ID: {patientToDelete.patient_id}</p>
                    <p className="text-xs text-secondary-600">MRN: {patientToDelete.mrn}</p>
                  </div>
                  <p className="text-xs text-error-600 font-medium">
                    This action cannot be undone. All patient data and associated predictions will be permanently deleted.
                  </p>

                  {/* Error Message */}
                  {deleteError && (
                    <div className="mt-3 bg-error-50 border border-error-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-error-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-error-700">{deleteError}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-secondary-200 flex justify-end gap-3">
              <button
                onClick={handleDeleteCancel}
                disabled={isDeleting}
                className="px-4 py-2 border border-secondary-300 text-secondary-700 rounded-lg hover:bg-secondary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-4 py-2 bg-error-600 text-white rounded-lg hover:bg-error-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Deleting...
                  </>
                ) : (
                  'Delete Patient'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
