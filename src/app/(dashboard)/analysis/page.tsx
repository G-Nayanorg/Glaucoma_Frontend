/**
 * Analysis Page
 * View all patients with their predictions in cards format
 * Each patient appears only once with their prediction summary
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/common/Button';
import { Loader } from '@/components/common/Loader';
import { hasPermission } from '@/utils/rbac';
import {
  getPatientPredictions,
  getRiskLevelColor,
  getPredictionLabelColor,
} from '@/modules/prediction/services/predictionService';
import { getPatients, getPatientById } from '@/modules/patient/services/patientService';
import type { UserRole } from '@/modules/auth/types';
import type { Patient } from '@/modules/patient/types';

/**
 * Patient with predictions summary
 */
interface PatientWithPredictions {
  patient: Patient;
  totalPredictions: number;
  latestPrediction: any | null;
  glaucomaDetections: number;
  normalResults: number;
  highestRiskLevel: string;
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
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateString;
  }
}

/**
 * Analysis Page Component
 */
export default function AnalysisPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, role, isInitialized } = useAuthStore();

  const [patientsWithPredictions, setPatientsWithPredictions] = useState<PatientWithPredictions[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRiskLevel, setFilterRiskLevel] = useState<string>('all');
  const [selectedPatient, setSelectedPatient] = useState<PatientWithPredictions | null>(null);

  const userRole = (role as UserRole) || 'no_role';
  const canRead = hasPermission(userRole, 'prediction:read');
  const canCreatePrediction = hasPermission(userRole, 'prediction:create');

  // Get patient_id from URL query params
  const patientIdFromUrl = searchParams.get('patient_id');

  // Check authentication and permissions
  useEffect(() => {
    // Only redirect after auth state has been initialized from storage
    if (isInitialized) {
      if (!isAuthenticated) {
        router.push('/auth/login');
        return;
      }

      if (!canRead) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, canRead, isInitialized, router]);

  // Load all patients with their predictions
  const loadPatientsWithPredictions = async () => {
    try {
      setLoading(true);
      setError(null);

      let patients: Patient[] = [];

      // If patient_id is provided in URL, fetch only that patient
      if (patientIdFromUrl) {
        try {
          const patient = await getPatientById(patientIdFromUrl);
          patients = [patient];
        } catch (err) {
          console.error('Error loading patient:', err);
          setError(err instanceof Error ? err.message : 'Failed to load patient');
          setLoading(false);
          return;
        }
      } else {
        // Fetch all patients
        const patientsResponse = await getPatients({ page: 1, page_size: 100 });
        patients = patientsResponse.patients;
      }

      // Fetch predictions for each patient
      const patientsWithPreds: PatientWithPredictions[] = [];

      for (const patient of patients) {
        try {
          const predictionsResponse = await getPatientPredictions(patient.patient_id, 1, 100);
          const predictions = predictionsResponse.predictions || [];

          if (predictions.length > 0) {
            // Calculate stats
            const glaucomaDetections = predictions.filter(
              (p: any) => p.label.toLowerCase() === 'glaucoma'
            ).length;
            const normalResults = predictions.filter((p: any) => p.label.toLowerCase() === 'normal').length;

            // Find highest risk level
            const riskLevels = ['critical', 'high', 'moderate', 'low'];
            let highestRiskLevel = 'low';
            for (const level of riskLevels) {
              if (predictions.some((p: any) => p.risk_level?.toLowerCase() === level)) {
                highestRiskLevel = level;
                break;
              }
            }

            // Get latest prediction
            const latestPrediction = predictions[0]; // Already sorted by created_at desc

            patientsWithPreds.push({
              patient,
              totalPredictions: predictions.length,
              latestPrediction,
              glaucomaDetections,
              normalResults,
              highestRiskLevel,
            });
          }
        } catch (err) {
          // Patient has no predictions, skip
          console.debug(`No predictions for patient ${patient.patient_id}`);
        }
      }

      setPatientsWithPredictions(patientsWithPreds);
    } catch (err) {
      console.error('Error loading patients with predictions:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (canRead) {
      loadPatientsWithPredictions();
    }
  }, [canRead, patientIdFromUrl]);

  // Filter patients
  const filteredPatients = patientsWithPredictions.filter((pwp) => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const patientName = `${pwp.patient.first_name} ${pwp.patient.last_name}`.toLowerCase();
      const patientId = pwp.patient.patient_id.toLowerCase();
      const mrn = pwp.patient.mrn.toLowerCase();

      if (
        !patientName.includes(searchLower) &&
        !patientId.includes(searchLower) &&
        !mrn.includes(searchLower)
      ) {
        return false;
      }
    }

    // Risk level filter
    if (filterRiskLevel !== 'all' && pwp.highestRiskLevel !== filterRiskLevel) {
      return false;
    }

    return true;
  });

  if (!isAuthenticated || !canRead) {
    return <Loader />;
  }

  return (
    <div className="container-custom py-8">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Analysis & Predictions</h1>
            <p className="text-secondary-600 mt-1">
              {patientIdFromUrl && patientsWithPredictions.length > 0
                ? `Viewing predictions for ${patientsWithPredictions[0].patient.first_name} ${patientsWithPredictions[0].patient.last_name}`
                : 'View all patients with glaucoma detection predictions'}
            </p>
          </div>
          {patientIdFromUrl && (
            <Button variant="outline" onClick={() => router.push('/analysis')}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to All Patients
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-soft p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-secondary-700 mb-1">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, Patient ID, or MRN"
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-secondary-700 mb-1">Filter by Risk Level</label>
            <select
              value={filterRiskLevel}
              onChange={(e) => setFilterRiskLevel(e.target.value)}
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          {canCreatePrediction && (
            <div className="w-full sm:w-auto">
              <label className="block text-sm font-medium text-secondary-700 mb-1">&nbsp;</label>
              <Button variant="primary" onClick={() => router.push('/prediction')}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Prediction
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-error-50 border border-error-200 text-error-700 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader />
        </div>
      ) : (
        <>
          {/* Empty State */}
          {filteredPatients.length === 0 && (
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-secondary-900">
                {patientsWithPredictions.length === 0 ? 'No predictions found' : 'No matching patients'}
              </h3>
              <p className="mt-1 text-sm text-secondary-500">
                {patientsWithPredictions.length === 0
                  ? 'Start by creating predictions for your patients.'
                  : 'Try adjusting your search or filters.'}
              </p>
              {patientsWithPredictions.length === 0 && canCreatePrediction && (
                <div className="mt-6">
                  <Button variant="primary" onClick={() => router.push('/prediction')}>
                    Create Prediction
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Patients Grid */}
          {filteredPatients.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatients.map((pwp) => (
                <PatientPredictionCard key={pwp.patient.patient_id} data={pwp} onViewDetails={setSelectedPatient} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Prediction Details Modal */}
      {selectedPatient && (
        <PredictionDetailsModal data={selectedPatient} onClose={() => setSelectedPatient(null)} />
      )}
    </div>
  );
}

/**
 * Patient Prediction Card Component
 */
interface PatientPredictionCardProps {
  data: PatientWithPredictions;
  onViewDetails: (data: PatientWithPredictions) => void;
}

function PatientPredictionCard({ data, onViewDetails }: PatientPredictionCardProps) {
  const router = useRouter();
  const { patient, totalPredictions, latestPrediction, glaucomaDetections, normalResults, highestRiskLevel } =
    data;

  return (
    <div className="bg-white rounded-lg shadow-soft border border-secondary-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Patient Header */}
      <div className="bg-primary-50 p-4 border-b border-primary-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary-700 font-medium text-lg">
              {patient.first_name.charAt(0)}
              {patient.last_name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-secondary-900 truncate text-base">
              {patient.first_name} {patient.last_name}
            </h3>
            <p className="text-xs text-secondary-600 truncate">ID: {patient.patient_id}</p>
            <p className="text-xs text-secondary-500 truncate">MRN: {patient.mrn}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {latestPrediction ? (
          <div className="space-y-3">
            {/* Label and Risk Level */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-secondary-500 mb-1">Label</p>
                <span
                  className={`inline-block px-4 py-2 rounded-lg text-base font-bold ${getPredictionLabelColor(
                    latestPrediction.label
                  )}`}
                >
                  {latestPrediction.label}
                </span>
              </div>
              <div>
                <p className="text-xs text-secondary-500 mb-1 text-right">Risk Level</p>
                <span
                  className={`inline-block px-3 py-2 rounded-lg text-sm font-bold border ${getRiskLevelColor(
                    latestPrediction.risk_level
                  )}`}
                >
                  {latestPrediction.risk_level}
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-secondary-50 rounded-lg p-2 text-center">
                <p className="text-xs text-secondary-600 mb-1">Probability</p>
                <p className="text-sm font-bold text-secondary-900">
                  {latestPrediction.probability?.toFixed(4) || 'N/A'}
                </p>
              </div>
              <div className="bg-secondary-50 rounded-lg p-2 text-center">
                <p className="text-xs text-secondary-600 mb-1">Confidence</p>
                <p className="text-sm font-bold text-secondary-900">
                  {latestPrediction.confidence?.toFixed(4) || 'N/A'}
                </p>
              </div>
              <div className="bg-secondary-50 rounded-lg p-2 text-center">
                <p className="text-xs text-secondary-600 mb-1">Total Scans</p>
                <p className="text-sm font-bold text-secondary-900">{totalPredictions}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-sm text-secondary-400">No predictions available</p>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onViewDetails(data)}
            className="px-3 py-2 bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 rounded-lg font-medium text-sm transition-colors whitespace-nowrap"
          >
            View Details
          </button>
          <button
            onClick={() => router.push(`/prediction?patient_id=${patient.patient_id}`)}
            className="px-3 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg font-medium text-sm flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Prediction
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Prediction Details Modal Component
 */
interface PredictionDetailsModalProps {
  data: PatientWithPredictions;
  onClose: () => void;
}

function PredictionDetailsModal({ data, onClose }: PredictionDetailsModalProps) {
  const { patient, totalPredictions, latestPrediction, glaucomaDetections, normalResults, highestRiskLevel } =
    data;

  if (!latestPrediction) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-secondary-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-secondary-900">Prediction Details</h2>
            <p className="text-xs text-secondary-600 mt-0.5">
              {patient.first_name} {patient.last_name} - {patient.patient_id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-secondary-400 hover:text-secondary-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body - Single View, No Scroll */}
        <div className="p-6">
          {/* Top Row: Status, Cached, Label */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span className="text-secondary-600">Status:</span>{' '}
                <span className="text-success-700 font-semibold">Success</span>
              </div>
              {latestPrediction.cached !== undefined && (
                <div className="text-sm">
                  <span className="text-secondary-600">Cached:</span>{' '}
                  <span className={latestPrediction.cached ? 'text-success-700 font-semibold' : 'text-secondary-700 font-semibold'}>
                    {latestPrediction.cached ? 'Yes' : 'No'}
                  </span>
                </div>
              )}
            </div>
            <div
              className={`px-6 py-2 rounded-lg text-xl font-bold ${getPredictionLabelColor(
                latestPrediction.label
              )}`}
            >
              {latestPrediction.label.toUpperCase()}
            </div>
          </div>

          {/* Prediction ID */}
          <div className="mb-4 p-3 bg-secondary-50 rounded-lg">
            <p className="text-xs text-secondary-600 mb-1">Prediction ID</p>
            <p className="text-sm font-mono text-secondary-900">{latestPrediction.prediction_id}</p>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-5 gap-3 mb-4">
            <div className="bg-primary-50 rounded-lg p-3 text-center">
              <p className="text-xs text-primary-700 font-medium mb-1">Prediction</p>
              <p className="text-xl font-bold text-primary-900">{latestPrediction.prediction}</p>
            </div>
            <div className="bg-secondary-50 rounded-lg p-3 text-center">
              <p className="text-xs text-secondary-600 font-medium mb-1">Probability</p>
              <p className="text-base font-bold text-secondary-900">
                {latestPrediction.probability?.toFixed(4) || 'N/A'}
              </p>
            </div>
            <div className="bg-secondary-50 rounded-lg p-3 text-center">
              <p className="text-xs text-secondary-600 font-medium mb-1">Confidence</p>
              <p className="text-base font-bold text-secondary-900">
                {latestPrediction.confidence?.toFixed(4) || 'N/A'}
              </p>
            </div>
            <div className="bg-secondary-50 rounded-lg p-3 text-center">
              <p className="text-xs text-secondary-600 font-medium mb-1">Processing</p>
              <p className="text-base font-bold text-secondary-900">{latestPrediction.processing_time_ms}ms</p>
            </div>
            <div className={`rounded-lg p-3 text-center border-2 ${getRiskLevelColor(latestPrediction.risk_level)}`}>
              <p className="text-xs font-medium mb-1">Risk Level</p>
              <p className="text-base font-bold">{latestPrediction.risk_level?.toUpperCase()}</p>
            </div>
          </div>

          {/* Timestamp */}
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-secondary-600 font-medium">Timestamp:</span>
            <span className="text-secondary-900">{new Date(latestPrediction.created_at).toLocaleString()}</span>
          </div>

          {/* Recommendations */}
          {latestPrediction.recommendations && latestPrediction.recommendations.length > 0 && (
            <div>
              <p className="text-sm font-medium text-secondary-700 mb-2">Recommendations</p>
              <div className="bg-secondary-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {latestPrediction.recommendations.map((rec: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-primary-600 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs text-secondary-700">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-secondary-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
