/**
 * Patient Service
 * API service for patient management
 */

import { API_CONFIG } from '@/config/api.config';
import type {
  Patient,
  CreatePatientData,
  UpdatePatientData,
  PatientListResponse,
  PatientFilterParams,
} from '../types';

const BASE_URL = API_CONFIG.baseURL;

/**
 * Get authentication token from localStorage
 */
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;

  // Try to get from Zustand store persistence
  const authStorage = localStorage.getItem('auth-storage');
  if (authStorage) {
    try {
      const parsed = JSON.parse(authStorage);
      return parsed.state?.accessToken || null;
    } catch (e) {
      return null;
    }
  }
  return null;
}

/**
 * Create headers with authentication
 */
function createHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Get all patients
 */
export async function getPatients(
  params?: PatientFilterParams
): Promise<PatientListResponse> {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
  if (params?.search) queryParams.append('search', params.search);
  if (params?.gender) queryParams.append('gender', params.gender);
  if (params?.created_from) queryParams.append('created_from', params.created_from);
  if (params?.created_to) queryParams.append('created_to', params.created_to);

  const url = `${BASE_URL}/api/v1/patients?${queryParams.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: createHeaders(),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to fetch patients' }));
    throw new Error(error.detail || 'Failed to fetch patients');
  }

  return response.json();
}

/**
 * Get patient by ID
 */
export async function getPatientById(id: string): Promise<Patient> {
  const response = await fetch(`${BASE_URL}/api/v1/patients/${id}`, {
    method: 'GET',
    headers: createHeaders(),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to fetch patient' }));
    throw new Error(error.detail || 'Failed to fetch patient');
  }

  return response.json();
}

/**
 * Create a new patient
 */
export async function createPatient(data: CreatePatientData): Promise<Patient> {
  const response = await fetch(`${BASE_URL}/api/v1/patients`, {
    method: 'POST',
    headers: createHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to create patient' }));
    throw new Error(error.detail || 'Failed to create patient');
  }

  return response.json();
}

/**
 * Update a patient
 */
export async function updatePatient(
  id: string,
  data: UpdatePatientData
): Promise<Patient> {
  const response = await fetch(`${BASE_URL}/api/v1/patients/${id}`, {
    method: 'PUT',
    headers: createHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to update patient' }));
    throw new Error(error.detail || 'Failed to update patient');
  }

  return response.json();
}

/**
 * Delete a patient
 */
export async function deletePatient(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/api/v1/patients/${id}`, {
    method: 'DELETE',
    headers: createHeaders(),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to delete patient' }));
    throw new Error(error.detail || 'Failed to delete patient');
  }
}
