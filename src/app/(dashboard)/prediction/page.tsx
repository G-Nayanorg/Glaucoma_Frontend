/**
 * Prediction Page
 * Upload and analyze retinal images for glaucoma detection
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/common/Button';
import { Loader } from '@/components/common/Loader';
import { hasPermission } from '@/utils/rbac';
import {
  makePrediction,
  makeBatchPrediction,
  getRiskLevelColor,
  getPredictionLabelColor,
} from '@/modules/prediction/services/predictionService';
import { getPatientById } from '@/modules/patient/services/patientService';
import type { UserRole } from '@/modules/auth/types';
import type { PredictionResult, BatchPredictionResult, BatchPredictionItem } from '@/modules/prediction/types';
import type { Patient } from '@/modules/patient/types';

/**
 * Prediction Page Component
 */
export default function PredictionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, role, accessToken } = useAuthStore();

  const queryPatientId = searchParams?.get('patient_id');

  const [patientId, setPatientId] = useState<string>(queryPatientId || '');
  const [patient, setPatient] = useState<Patient | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PredictionResult | BatchPredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [useCache, setUseCache] = useState(true);

  const userRole = (role as UserRole) || 'no_role';
  const canPredict = hasPermission(userRole, 'prediction:create');

  // Check authentication and permissions
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (!canPredict) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, canPredict, router]);

  // Load patient info if patient_id is provided
  useEffect(() => {
    if (patientId && accessToken && patientId.trim()) {
      loadPatient(patientId);
    } else {
      setPatient(null);
    }
  }, [patientId, accessToken]);

  const loadPatient = async (id: string) => {
    try {
      const patientData = await getPatientById(id);
      setPatient(patientData);
      setError(null);
    } catch (err) {
      console.error('Error loading patient:', err);
      setPatient(null);
      // Don't set error here - patient ID might just not exist yet
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length > 20) {
      setError('Maximum 20 images allowed');
      return;
    }

    // Validate file types
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const invalidFiles = files.filter((file) => !validTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      setError('Only JPEG and PNG images are allowed');
      return;
    }

    setSelectedFiles(files);
    setError(null);
    setResults(null);

    // Create previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  // Handle prediction
  const handlePredict = async () => {
    if (!patientId || !patientId.trim()) {
      setError('Please enter a Patient ID');
      return;
    }

    if (selectedFiles.length === 0) {
      setError('Please select at least one image');
      return;
    }

    if (!accessToken) {
      setError('Authentication token not found');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (selectedFiles.length === 1) {
        // Single prediction
        const result = await makePrediction(selectedFiles[0], patientId, accessToken, { use_cache: useCache });
        setResults(result);
      } else {
        // Batch prediction
        const result = await makeBatchPrediction(selectedFiles, patientId, accessToken, { use_cache: useCache });
        setResults(result);
      }
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err instanceof Error ? err.message : 'Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  // Clear selection
  const handleClear = () => {
    setSelectedFiles([]);
    setPreviews([]);
    setResults(null);
    setError(null);
  };

  // Navigate back
  const handleBack = () => {
    if (queryPatientId) {
      router.push(`/patients`);
    } else {
      router.push('/dashboard');
    }
  };

  if (!isAuthenticated || !canPredict) {
    return <Loader />;
  }

  const isBatchResult = results && 'results' in results;

  return (
    <div className="container-custom py-8">
      {/* Page Header */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-secondary-600 hover:text-secondary-900 mb-4 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h1 className="text-3xl font-bold text-secondary-900">Glaucoma Detection</h1>
        <p className="text-secondary-600 mt-1">Upload retinal images for AI-powered analysis</p>
      </div>

      {/* Patient ID Input */}
      <div className="bg-white rounded-lg shadow-soft p-6 mb-6">
        <label htmlFor="patient_id" className="block text-sm font-medium text-secondary-700 mb-2">
          Patient ID <span className="text-error-600">*</span>
        </label>
        <input
          type="text"
          id="patient_id"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          placeholder="Enter Patient ID (e.g., PAT_123)"
          className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors"
          required
        />
        <p className="text-xs text-secondary-500 mt-1">
          Enter the Patient ID to associate predictions with the patient record
        </p>
      </div>

      {/* Patient Info */}
      {patient && (
          <div className="bg-white rounded-lg shadow-soft p-4 mb-6 border-l-4 border-primary-600">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-700 font-medium">
                  {patient.first_name.charAt(0)}
                  {patient.last_name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-secondary-900">
                  {patient.first_name} {patient.last_name}
                </h3>
                <p className="text-sm text-secondary-500">Patient ID: {patient.patient_id}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-soft p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Upload Images</h2>

            {/* File Input */}
            <div className="mb-4">
              <label className="block w-full">
                <div className="border-2 border-dashed border-secondary-300 rounded-lg p-8 text-center hover:border-primary-500 transition-colors cursor-pointer">
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
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-2 text-sm text-secondary-600">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-secondary-500 mt-1">
                    PNG or JPEG (Max 20 images)
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Image Previews */}
            {previews.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-secondary-700 mb-2">
                  Selected Images ({previews.length})
                </h3>
                <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="object-cover rounded-lg border border-secondary-200"
                        fill
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Options */}
            <div className="mb-4">
              <label className="flex items-center gap-2 text-sm text-secondary-700">
                <input
                  type="checkbox"
                  checked={useCache}
                  onChange={(e) => setUseCache(e.target.checked)}
                  className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                />
                Use cached results (faster)
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 bg-error-50 border border-error-200 text-error-700 rounded-lg p-3 text-sm">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={handlePredict}
                disabled={loading || selectedFiles.length === 0 || !patientId.trim()}
                className="flex-1"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
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
                    Analyzing...
                  </>
                ) : (
                  'Analyze'
                )}
              </Button>
              {selectedFiles.length > 0 && (
                <Button variant="outline" onClick={handleClear} disabled={loading}>
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-lg shadow-soft p-6">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">Results</h2>

            {!results && (
              <div className="text-center py-12 text-secondary-500">
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
                <p className="mt-2">Upload images and click Analyze to see results</p>
              </div>
            )}

            {results && !isBatchResult && (
              <SinglePredictionResult result={results as PredictionResult} />
            )}

            {results && isBatchResult && (
              <BatchPredictionResults result={results as BatchPredictionResult} />
            )}
          </div>
        </div>
    </div>
  );
}

/**
 * Single Prediction Result Component
 */
function SinglePredictionResult({ result }: { result: PredictionResult }) {
  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto">
      {/* Status & Prediction Label */}
      <div className="text-center">
        <div className="mb-2">
          <span className="text-xs font-medium text-secondary-600">
            Status: <span className="text-success-700">{result.status}</span>
          </span>
        </div>
        <div
          className={`inline-block px-6 py-3 rounded-lg text-2xl font-bold ${getPredictionLabelColor(
            result.label
          )}`}
        >
          {result.label}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-secondary-50 rounded-lg p-3">
          <p className="text-xs text-secondary-600">Prediction</p>
          <p className="text-xl font-bold text-secondary-900">{result.prediction}</p>
        </div>
        <div className="bg-secondary-50 rounded-lg p-3">
          <p className="text-xs text-secondary-600">Probability</p>
          <p className="text-xl font-bold text-secondary-900">{result.probability?.toFixed(4) || 'N/A'}</p>
        </div>
        <div className="bg-secondary-50 rounded-lg p-3">
          <p className="text-xs text-secondary-600">Confidence</p>
          <p className="text-xl font-bold text-secondary-900">{result.confidence?.toFixed(4) || 'N/A'}</p>
        </div>
        <div className="bg-secondary-50 rounded-lg p-3">
          <p className="text-xs text-secondary-600">Processing Time</p>
          <p className="text-xl font-bold text-secondary-900">{result.processing_time_ms}ms</p>
        </div>
      </div>

      {/* Risk Level */}
      <div>
        <p className="text-sm font-medium text-secondary-700 mb-2">Risk Level</p>
        <div
          className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold border ${getRiskLevelColor(
            result.risk_level
          )}`}
        >
          {result.risk_level.toUpperCase()}
        </div>
      </div>

      {/* Recommendations */}
      {result.recommendations && result.recommendations.length > 0 && (
        <div>
          <p className="text-sm font-medium text-secondary-700 mb-2">Recommendations</p>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-secondary-700">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Metadata */}
      <div className="text-xs text-secondary-500 pt-4 border-t border-secondary-200 space-y-1">
        <div className="flex justify-between">
          <span>Timestamp:</span>
          <span className="font-mono">{new Date(result.timestamp).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Cached:</span>
          <span className={result.cached ? 'text-success-600' : 'text-secondary-600'}>
            {result.cached ? 'Yes' : 'No'}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Batch Prediction Results Component
 */
function BatchPredictionResults({ result }: { result: BatchPredictionResult }) {
  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-secondary-50 rounded-lg p-3 text-center">
          <p className="text-xs text-secondary-600">Total</p>
          <p className="text-xl font-bold text-secondary-900">{result.total_images}</p>
        </div>
        <div className="bg-success-50 rounded-lg p-3 text-center">
          <p className="text-xs text-success-600">Success</p>
          <p className="text-xl font-bold text-success-900">{result.successful}</p>
        </div>
        <div className="bg-error-50 rounded-lg p-3 text-center">
          <p className="text-xs text-error-600">Failed</p>
          <p className="text-xl font-bold text-error-900">{result.failed}</p>
        </div>
      </div>

      {/* Results List */}
      <div className="max-h-96 overflow-y-auto space-y-2">
        {result.results.map((item, index) => (
          <BatchResultItem key={index} item={item} />
        ))}
      </div>

      {/* Processing Time */}
      <div className="text-xs text-secondary-500 text-center pt-4 border-t border-secondary-200">
        Batch processed in {result.processing_time_ms}ms
        {result.cache_hit_rate > 0 && ` (${(result.cache_hit_rate * 100).toFixed(1)}% cache hits)`}
      </div>
    </div>
  );
}

/**
 * Batch Result Item Component
 */
function BatchResultItem({ item }: { item: BatchPredictionItem }) {
  if (item.status !== 'success') {
    return (
      <div className="bg-error-50 border border-error-200 rounded-lg p-3">
        <p className="text-sm font-medium text-error-900">{item.filename}</p>
        <p className="text-xs text-error-700">{item.error || 'Failed'}</p>
      </div>
    );
  }

  return (
    <div className="bg-secondary-50 border border-secondary-200 rounded-lg p-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-secondary-900 truncate">{item.filename}</p>
          <p className="text-xs text-secondary-500">Index: {item.index}</p>
        </div>
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ml-2 ${getPredictionLabelColor(
            item.label || ''
          )}`}
        >
          {item.label}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <div className="text-xs">
          <span className="text-secondary-600">Prediction: </span>
          <span className="font-semibold text-secondary-900">{item.prediction}</span>
        </div>
        <div className="text-xs">
          <span className="text-secondary-600">Probability: </span>
          <span className="font-semibold text-secondary-900">
            {item.probability ? item.probability.toFixed(4) : 'N/A'}
          </span>
        </div>
        <div className="text-xs">
          <span className="text-secondary-600">Confidence: </span>
          <span className="font-semibold text-secondary-900">
            {item.confidence ? item.confidence.toFixed(4) : 'N/A'}
          </span>
        </div>
        <div className="text-xs flex items-center gap-1">
          <span className="text-secondary-600">Risk: </span>
          <span
            className={`px-1.5 py-0.5 rounded border text-xs font-semibold ${getRiskLevelColor(
              item.risk_level || 'low'
            )}`}
          >
            {item.risk_level?.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Recommendations */}
      {item.recommendations && item.recommendations.length > 0 && (
        <div className="mt-2 pt-2 border-t border-secondary-300">
          <p className="text-xs font-medium text-secondary-700 mb-1">Recommendations:</p>
          <ul className="space-y-0.5">
            {item.recommendations.map((rec, idx) => (
              <li key={idx} className="text-xs text-secondary-600 flex items-start gap-1">
                <span className="text-primary-600">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cached indicator */}
      {item.cached && (
        <div className="mt-2 text-xs text-success-600 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Cached</span>
        </div>
      )}
    </div>
  );
}
