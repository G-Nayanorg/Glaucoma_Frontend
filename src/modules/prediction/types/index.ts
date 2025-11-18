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
