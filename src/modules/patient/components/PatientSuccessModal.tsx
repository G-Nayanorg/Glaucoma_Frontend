/**
 * Patient Success Modal Component
 * Modal shown after successfully creating a patient with option to create prediction
 */

'use client';

import { Button } from '@/components/common/Button';
import type { Patient } from '../types';
import type { UserRole } from '@/modules/auth/types';
import { hasPermission } from '@/utils/rbac';

interface PatientSuccessModalProps {
  patient: Patient;
  userRole: UserRole;
  onClose: () => void;
  onCreatePrediction: (patient: Patient) => void;
}

/**
 * Patient Success Modal Component
 */
export function PatientSuccessModal({
  patient,
  userRole,
  onClose,
  onCreatePrediction,
}: PatientSuccessModalProps) {
  const canCreatePrediction = hasPermission(userRole, 'prediction:create');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-fade-in">
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-secondary-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-secondary-900">Patient Created Successfully!</h3>
              <p className="text-sm text-secondary-500">What would you like to do next?</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-secondary-100 transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Patient Information */}
        <div className="p-6 space-y-4">
          <div className="bg-secondary-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-700 font-medium">
                  {patient.first_name.charAt(0)}
                  {patient.last_name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="font-medium text-secondary-900">
                  {patient.first_name} {patient.last_name}
                </h4>
                <p className="text-sm text-secondary-500">MRN: {patient.mrn}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-secondary-700">
              The patient has been successfully added to the system.
            </p>
            {canCreatePrediction && (
              <p className="text-sm text-secondary-600 bg-primary-50 border border-primary-200 rounded-lg p-3">
                <span className="font-medium text-primary-700">Quick Action:</span> You can now upload images to create a prediction for this patient.
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-secondary-200 bg-secondary-50">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {canCreatePrediction && (
            <Button
              variant="primary"
              onClick={() => onCreatePrediction(patient)}
              className="flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Create Prediction
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
