/**
 * Prediction Module Types
 * TypeScript interfaces and types for glaucoma predictions
 */

/**
 * Single prediction result
 */
export interface PredictionResult {
  status: string;
  prediction: number;
  label: string;
  probability: number;
  confidence: number;
  risk_level: string;
  recommendations: string[];
  processing_time_ms: number;
  timestamp: string;
  cached: boolean;
}

/**
 * Batch prediction individual result
 */
export interface BatchPredictionItem {
  index: number;
  filename: string;
  status: string;
  prediction?: number;
  label?: string;
  probability?: number;
  confidence?: number;
  risk_level?: string;
  recommendations?: string[];
  cached?: boolean;
  error?: string;
}

/**
 * Batch prediction response
 */
export interface BatchPredictionResult {
  status: string;
  total_images: number;
  successful: number;
  failed: number;
  cache_hits: number;
  cache_misses: number;
  cache_hit_rate: number;
  processing_time_ms: number;
  timestamp: string;
  results: BatchPredictionItem[];
}

/**
 * Prediction request options
 */
export interface PredictionOptions {
  use_cache?: boolean;
}

/**
 * Risk level types
 */
export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

/**
 * Prediction label types
 */
export type PredictionLabel = 'Normal' | 'Glaucoma';

/**
 * Saved prediction record
 */
export interface SavedPrediction {
  id: string;
  prediction_id: string;
  patient_id: string;
  patient_name?: string;
  image_url?: string;
  prediction: number;
  label: string;
  probability: number;
  confidence: number;
  risk_level: string;
  recommendations: string[];
  processing_time_ms: number;
  created_at: string;
  created_by: string;
  reviewed_by?: string;
  reviewed_at?: string;
  notes?: string;
  tenant_id: string;
}

/**
 * Prediction list response
 */
export interface PredictionListResponse {
  predictions: SavedPrediction[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
