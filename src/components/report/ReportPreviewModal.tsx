/**
 * Report Preview Modal Component
 * Displays a preview of the glaucoma detection report with patient details and results
 * Allows downloading the report as PDF
 */

'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/common/Button';
import type { Patient } from '@/modules/patient/types';
import type { PredictionResult, BatchPredictionResult, BatchPredictionItem } from '@/modules/prediction/types';
import { getRiskLevelColor, getPredictionLabelColor } from '@/modules/prediction/services/predictionService';

interface ReportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
  result: PredictionResult | BatchPredictionResult;
  patientId: string;
}

/**
 * Format date for display
 */
function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return 'N/A';
  }
}

/**
 * Get current date formatted
 */
function getCurrentDate(): string {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Report Preview Modal Component
 */
export function ReportPreviewModal({
  isOpen,
  onClose,
  patient,
  result,
  patientId,
}: ReportPreviewModalProps) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  // Determine the type of result more robustly
  // Check if it's a batch result by looking for the 'results' array AND 'total_images' field
  const isBatchResult = 'results' in result && 'total_images' in result && Array.isArray((result as BatchPredictionResult).results);

  // For single result, check if it has the typical single prediction fields
  const hasSingleResultFields = 'prediction' in result && 'label' in result && 'probability' in result;

  const singleResult = (!isBatchResult && hasSingleResultFields) ? (result as PredictionResult) : null;
  const batchResult = isBatchResult ? (result as BatchPredictionResult) : null;

  /**
   * Handle PDF download
   */
  const handleDownload = async () => {
    if (!reportRef.current) return;

    setIsDownloading(true);
    try {
      // Dynamically import html2pdf to avoid SSR issues
      const html2pdf = (await import('html2pdf.js')).default;

      const element = reportRef.current;
      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `glaucoma-report-${patientId}-${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollY: 0,
        },
        jsPDF: {
          unit: 'mm' as const,
          format: 'a4' as const,
          orientation: 'portrait' as const
        },
        pagebreak: {
          mode: ['avoid-all', 'css', 'legacy'] as ('avoid-all' | 'css' | 'legacy')[],
          before: '.page-break-before',
          after: '.page-break-after',
          avoid: '.page-break-avoid'
        },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-secondary-200 bg-primary-50">
          <h2 className="text-xl font-semibold text-secondary-900">Report Preview</h2>
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex items-center gap-2"
            >
              {isDownloading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </>
              )}
            </Button>
            <button
              onClick={onClose}
              className="p-2 text-secondary-500 hover:text-secondary-700 hover:bg-secondary-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Report Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-secondary-50">
          {/* Report Document */}
          <div
            ref={reportRef}
            className="bg-white rounded-lg shadow-lg mx-auto"
            style={{ maxWidth: '210mm' }}
          >
            {/* Report Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <span className="text-primary-700 font-bold text-xl">G</span>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Glaucoma AI</h1>
                    <p className="text-primary-100 text-sm">AI-Powered Diagnostic System</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-primary-100 text-sm">Report Generated</p>
                  <p className="font-medium">{getCurrentDate()}</p>
                </div>
              </div>
            </div>

            {/* Report Title */}
            <div className="text-center py-6 border-b border-secondary-200">
              <h2 className="text-2xl font-bold text-secondary-900">Glaucoma Detection Report</h2>
              <p className="text-secondary-600 mt-1">Comprehensive Analysis Results</p>
            </div>

            {/* Patient Information */}
            <div className="px-8 py-6 border-b border-secondary-200">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Patient Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary-50 rounded-lg p-4">
                  <p className="text-xs text-secondary-500 uppercase tracking-wider mb-1">Patient Name</p>
                  <p className="font-medium text-secondary-900">
                    {patient ? `${patient.first_name} ${patient.last_name}` : 'N/A'}
                  </p>
                </div>
                <div className="bg-secondary-50 rounded-lg p-4">
                  <p className="text-xs text-secondary-500 uppercase tracking-wider mb-1">Patient ID</p>
                  <p className="font-medium text-secondary-900">{patientId || 'N/A'}</p>
                </div>
                <div className="bg-secondary-50 rounded-lg p-4">
                  <p className="text-xs text-secondary-500 uppercase tracking-wider mb-1">Date of Birth</p>
                  <p className="font-medium text-secondary-900">{formatDate(patient?.date_of_birth)}</p>
                </div>
                <div className="bg-secondary-50 rounded-lg p-4">
                  <p className="text-xs text-secondary-500 uppercase tracking-wider mb-1">Gender</p>
                  <p className="font-medium text-secondary-900 capitalize">{patient?.gender || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="px-8 py-6 border-b border-secondary-200">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Analysis Results
              </h3>

              {/* Single Result */}
              {singleResult && (
                <div className="space-y-4">
                  {/* Primary Diagnosis */}
                  <div className="text-center py-4">
                    <p className="text-sm text-secondary-600 mb-2">Diagnosis</p>
                    <div className={`inline-block px-8 py-3 rounded-xl text-2xl font-bold ${getPredictionLabelColor(singleResult.label)}`}>
                      {singleResult.label}
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-4 gap-3">
                    <div className="bg-secondary-50 rounded-lg p-4 text-center">
                      <p className="text-xs text-secondary-500 mb-1">Prediction Value</p>
                      <p className="text-xl font-bold text-secondary-900">{singleResult.prediction}</p>
                    </div>
                    <div className="bg-secondary-50 rounded-lg p-4 text-center">
                      <p className="text-xs text-secondary-500 mb-1">Probability</p>
                      <p className="text-xl font-bold text-secondary-900">
                        {(singleResult.probability * 100).toFixed(2)}%
                      </p>
                    </div>
                    <div className="bg-secondary-50 rounded-lg p-4 text-center">
                      <p className="text-xs text-secondary-500 mb-1">Confidence</p>
                      <p className="text-xl font-bold text-secondary-900">
                        {(singleResult.confidence * 100).toFixed(2)}%
                      </p>
                    </div>
                    <div className="bg-secondary-50 rounded-lg p-4 text-center">
                      <p className="text-xs text-secondary-500 mb-1">Risk Level</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getRiskLevelColor(singleResult.risk_level)}`}>
                        {singleResult.risk_level.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Processing Info */}
                  <div className="flex justify-center gap-6 text-sm text-secondary-500 pt-2">
                    <span>Processing Time: {singleResult.processing_time_ms}ms</span>
                    <span>•</span>
                    <span>Analyzed: {formatDate(singleResult.timestamp)}</span>
                  </div>
                </div>
              )}

              {/* Batch Results */}
              {batchResult && (
                <div className="space-y-4">
                  {/* Summary */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-secondary-50 rounded-lg p-4 text-center">
                      <p className="text-xs text-secondary-500 mb-1">Total Images</p>
                      <p className="text-2xl font-bold text-secondary-900">{batchResult.total_images}</p>
                    </div>
                    <div className="bg-success-50 rounded-lg p-4 text-center">
                      <p className="text-xs text-success-600 mb-1">Successful</p>
                      <p className="text-2xl font-bold text-success-700">{batchResult.successful}</p>
                    </div>
                    <div className="bg-error-50 rounded-lg p-4 text-center">
                      <p className="text-xs text-error-600 mb-1">Failed</p>
                      <p className="text-2xl font-bold text-error-700">{batchResult.failed}</p>
                    </div>
                  </div>

                  {/* Individual Results - Detailed */}
                  <div className="space-y-4">
                    {batchResult.results.map((item: BatchPredictionItem, index: number) => (
                      <div key={index} className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
                        {/* Header with filename and label */}
                        <div className="flex items-center justify-between mb-3 pb-3 border-b border-secondary-200">
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-secondary-500 bg-secondary-200 px-2 py-1 rounded">#{item.index + 1}</span>
                            <span className="font-medium text-secondary-900 text-sm">
                              {item.filename}
                            </span>
                          </div>
                          {item.status === 'success' ? (
                            <span className={`px-3 py-1 rounded-lg text-sm font-bold ${getPredictionLabelColor(item.label || '')}`}>
                              {item.label}
                            </span>
                          ) : (
                            <span className="text-error-600 text-sm font-medium">Failed</span>
                          )}
                        </div>

                        {item.status === 'success' && (
                          <>
                            {/* Metrics Grid */}
                            <div className="grid grid-cols-4 gap-3 mb-3">
                              <div className="bg-white rounded-lg p-3 text-center">
                                <p className="text-xs text-secondary-500 mb-1">Prediction</p>
                                <p className="text-lg font-bold text-secondary-900">{item.prediction}</p>
                              </div>
                              <div className="bg-white rounded-lg p-3 text-center">
                                <p className="text-xs text-secondary-500 mb-1">Probability</p>
                                <p className="text-lg font-bold text-secondary-900">
                                  {item.probability ? (item.probability * 100).toFixed(2) : 'N/A'}%
                                </p>
                              </div>
                              <div className="bg-white rounded-lg p-3 text-center">
                                <p className="text-xs text-secondary-500 mb-1">Confidence</p>
                                <p className="text-lg font-bold text-secondary-900">
                                  {item.confidence ? (item.confidence * 100).toFixed(2) : 'N/A'}%
                                </p>
                              </div>
                              <div className="bg-white rounded-lg p-3 text-center">
                                <p className="text-xs text-secondary-500 mb-1">Risk Level</p>
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getRiskLevelColor(item.risk_level || 'low')}`}>
                                  {item.risk_level?.toUpperCase()}
                                </span>
                              </div>
                            </div>

                            {/* Recommendations */}
                            {item.recommendations && item.recommendations.length > 0 && (
                              <div className="bg-white rounded-lg p-3">
                                <p className="text-xs font-semibold text-secondary-700 mb-2">Recommendations:</p>
                                <ul className="space-y-1">
                                  {item.recommendations.map((rec: string, idx: number) => (
                                    <li key={idx} className="flex items-start gap-2 text-xs text-secondary-600">
                                      <span className="text-primary-600 mt-0.5">•</span>
                                      <span>{rec}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recommendations */}
            {(() => {
              // Get recommendations from singleResult or directly from result
              const recommendations = singleResult?.recommendations ||
                (!isBatchResult && (result as PredictionResult).recommendations) ||
                [];

              if (recommendations.length > 0) {
                return (
                  <div className="px-8 py-6 border-b border-secondary-200">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Clinical Recommendations
                    </h3>
                    <ul className="space-y-2">
                      {recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start gap-3 text-secondary-700">
                          <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-medium">
                            {index + 1}
                          </span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return null;
            })()}

            {/* Footer */}
            <div className="px-8 py-6 bg-secondary-50">
              <div className="border-t border-secondary-200 pt-4">
                <div className="flex items-center justify-center gap-4 text-xs text-secondary-400">
                  <span>Glaucoma AI Detection System</span>
                  <span>•</span>
                  <span>Report ID: {patientId}-{Date.now()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
