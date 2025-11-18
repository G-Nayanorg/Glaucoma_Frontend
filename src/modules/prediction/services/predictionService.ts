/**
 * Prediction Service
 * Handles all prediction-related API calls
 */

import { API_CONFIG, getApiUrl } from '@/config/api.config';
import type {
  PredictionResult,
  BatchPredictionResult,
  PredictionOptions,
} from '../types';

/**
 * Make a single prediction
 * @param file - Image file to analyze
 * @param accessToken - Authentication token
 * @param options - Prediction options (e.g., cache settings)
 * @returns Prediction result
 */
export async function makePrediction(
  file: File,
  accessToken: string,
  options: PredictionOptions = {}
): Promise<PredictionResult> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    if (options.use_cache !== undefined) {
      formData.append('use_cache', String(options.use_cache));
    }

    const response = await fetch(getApiUrl(API_CONFIG.endpoints.prediction.single), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Prediction failed');
    }

    const data: PredictionResult = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Make batch predictions (max 20 images)
 * @param files - Array of image files to analyze
 * @param accessToken - Authentication token
 * @param options - Prediction options (e.g., cache settings)
 * @returns Batch prediction results
 */
export async function makeBatchPrediction(
  files: File[],
  accessToken: string,
  options: PredictionOptions = {}
): Promise<BatchPredictionResult> {
  try {
    if (files.length > 20) {
      throw new Error('Maximum 20 images allowed per batch');
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    if (options.use_cache !== undefined) {
      formData.append('use_cache', String(options.use_cache));
    }

    const response = await fetch(getApiUrl(API_CONFIG.endpoints.prediction.batch), {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Batch prediction failed');
    }

    const data: BatchPredictionResult = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Get risk level color for UI display
 * @param riskLevel - Risk level string
 * @returns Tailwind CSS classes for risk level color
 */
export function getRiskLevelColor(riskLevel: string): string {
  const colors: Record<string, string> = {
    low: 'bg-success-100 text-success-700 border-success-300',
    moderate: 'bg-warning-100 text-warning-700 border-warning-300',
    high: 'bg-error-100 text-error-700 border-error-300',
    critical: 'bg-error-200 text-error-900 border-error-400',
  };
  return colors[riskLevel.toLowerCase()] || 'bg-secondary-100 text-secondary-700 border-secondary-300';
}

/**
 * Format confidence percentage
 * @param confidence - Confidence value (0-1)
 * @returns Formatted percentage string
 */
export function formatConfidence(confidence: number): string {
  return `${(confidence * 100).toFixed(2)}%`;
}

/**
 * Get prediction label color for UI display
 * @param label - Prediction label
 * @returns Tailwind CSS classes for label color
 */
export function getPredictionLabelColor(label: string): string {
  if (label.toLowerCase() === 'normal') {
    return 'text-success-700 bg-success-100';
  } else if (label.toLowerCase() === 'glaucoma') {
    return 'text-error-700 bg-error-100';
  }
  return 'text-secondary-700 bg-secondary-100';
}
