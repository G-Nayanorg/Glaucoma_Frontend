/**
 * Patients Page
 * Manage patients with RBAC permissions
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/common/Button';
import { PatientTable } from '@/modules/patient/components/PatientTable';
import { PatientForm } from '@/modules/patient/components/PatientForm';
import { PatientSuccessModal } from '@/modules/patient/components/PatientSuccessModal';
import { Loader } from '@/components/common/Loader';
import { hasPermission } from '@/utils/rbac';
import {
  getPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from '@/modules/patient/services/patientService';
import type { Patient, CreatePatientData, UpdatePatientData } from '@/modules/patient/types';
import type { UserRole } from '@/modules/auth/types';

/**
 * Patients Page Component
 */
export default function PatientsPage() {
  const router = useRouter();
  const { isAuthenticated, role, isInitialized } = useAuthStore();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [successPatient, setSuccessPatient] = useState<Patient | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const userRole = (role as UserRole) || 'no_role';
  const canCreate = hasPermission(userRole, 'patient:create');
  const canRead = hasPermission(userRole, 'patient:read');

  // Redirect if no read permission
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

  // Load patients
  const loadPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPatients({
        page: currentPage,
        page_size: 10,
        search: searchQuery || undefined,
      });
      setPatients(response.patients || []);
      setTotalPages(response.total_pages || 1);
    } catch (err) {
      console.error('Error loading patients:', err);
      setError(err instanceof Error ? err.message : 'Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (canRead) {
      loadPatients();
    }
  }, [currentPage, searchQuery, canRead]);

  // Handle create patient
  const handleCreatePatient = async (data: CreatePatientData) => {
    try {
      setFormLoading(true);
      const newPatient = await createPatient(data);
      setShowForm(false);
      setSuccessPatient(newPatient);
      loadPatients();
    } catch (err) {
      console.error('Error creating patient:', err);
      alert(err instanceof Error ? err.message : 'Failed to create patient');
    } finally {
      setFormLoading(false);
    }
  };

  // Handle update patient
  const handleUpdatePatient = async (data: UpdatePatientData) => {
    if (!editingPatient) return;

    try {
      setFormLoading(true);
      await updatePatient(editingPatient.patient_id, data);
      setShowForm(false);
      setEditingPatient(null);
      loadPatients();
    } catch (err) {
      console.error('Error updating patient:', err);
      alert(err instanceof Error ? err.message : 'Failed to update patient');
    } finally {
      setFormLoading(false);
    }
  };

  // Handle delete patient
  const handleDeletePatient = async (patient: Patient) => {
    try {
      await deletePatient(patient.patient_id);

      // Remove patient from local state immediately for instant UI update
      setPatients((prevPatients) => prevPatients.filter((p) => p.patient_id !== patient.patient_id));

      // Also reload from server to ensure consistency
      loadPatients();
    } catch (err) {
      console.error('Error deleting patient:', err);
      alert(err instanceof Error ? err.message : 'Failed to delete patient');
      throw err; // Re-throw to let the table component know deletion failed
    }
  };

  // Handle edit button click
  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  // Handle create prediction
  const handleCreatePrediction = (patient: Patient) => {
    router.push(`/prediction?patient_id=${patient.patient_id}`);
  };

  // Handle view predictions
  const handleViewPredictions = (patient: Patient) => {
    router.push(`/analysis?patient_id=${patient.patient_id}`);
  };

  // Handle form cancel
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingPatient(null);
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  if (!isAuthenticated || !canRead) {
    return <Loader />;
  }

  return (
    <div className="container-custom py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-secondary-900">Patients</h1>
        <p className="text-secondary-600 mt-1">Manage patient records and information</p>
      </div>

        {/* Search and Create */}
        <div className="bg-white rounded-lg shadow-soft p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search patients by name or ID..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            {canCreate && !showForm && (
              <Button variant="primary" onClick={() => setShowForm(true)} className="w-full sm:w-auto">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Patient
              </Button>
            )}
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] sm:max-h-[85vh] flex flex-col my-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-secondary-200 flex-shrink-0">
                <h2 className="text-lg sm:text-xl font-semibold text-secondary-900">
                  {editingPatient ? 'Update Patient' : 'Create New Patient'}
                </h2>
                <button
                  onClick={handleFormCancel}
                  className="p-2 rounded-lg hover:bg-secondary-100 transition-colors flex-shrink-0 ml-2"
                  aria-label="Close"
                  disabled={formLoading}
                >
                  <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1 overscroll-contain">
                <PatientForm
                  patient={editingPatient}
                  onSubmit={editingPatient ? handleUpdatePatient : handleCreatePatient}
                  onCancel={handleFormCancel}
                  isLoading={formLoading}
                />
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {successPatient && (
          <PatientSuccessModal
            patient={successPatient}
            userRole={userRole}
            onClose={() => setSuccessPatient(null)}
            onCreatePrediction={handleCreatePrediction}
          />
        )}

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
            {/* Patient Table */}
            <PatientTable
              patients={patients}
              userRole={userRole}
              onEdit={handleEdit}
              onDelete={handleDeletePatient}
              onViewPredictions={handleViewPredictions}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-secondary-600">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
    </div>
  );
}
