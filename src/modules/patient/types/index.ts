/**
 * Patient Module Types
 * TypeScript interfaces and types for patient management
 */

/**
 * Patient data
 */
export interface Patient {
  id: number;
  patient_id: string;
  tenant_id: number;
  first_name: string;
  last_name: string;
  mrn: string;
  date_of_birth: string | null;
  gender: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  medical_history?: Record<string, any>;
  risk_factors?: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

/**
 * Create patient data
 */
export interface CreatePatientData {
  first_name: string;
  last_name: string;
  mrn: string;
  date_of_birth?: string;
  gender?: string;
  email?: string;
  phone?: string;
  address?: string;
  medical_history?: Record<string, any>;
  risk_factors?: Record<string, any>;
}

/**
 * Update patient data
 */
export interface UpdatePatientData {
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  gender?: string;
  email?: string;
  phone?: string;
  address?: string;
  medical_history?: Record<string, any>;
  risk_factors?: Record<string, any>;
  is_active?: boolean;
}

/**
 * Patient list response
 */
export interface PatientListResponse {
  patients: Patient[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

/**
 * Patient filter params
 */
export interface PatientFilterParams {
  page?: number;
  page_size?: number;
  search?: string;
  gender?: string;
  created_from?: string;
  created_to?: string;
}
