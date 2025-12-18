/**
 * Login Form Component
 * Form for user authentication
 */

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { useAuthStore } from '@/store/authStore';
import { login } from '../services/authService';
import { ApiError } from '@/utils/api.util';
import { isValidEmail } from '@/utils/validators';

/**
 * Login Form Component
 */
export function LoginForm() {
  const router = useRouter();
  const { login: setAuth } = useAuthStore();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string>('');

  /**
   * Validate form
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const authResponse = await login(formData);
      setAuth(authResponse);

      // Redirect based on role
      const dashboardPath = getRoleDashboardPath(authResponse.role);
      router.push(dashboardPath);
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get dashboard path based on user role
   */
  const getRoleDashboardPath = (role: string): string => {
    switch (role) {
      case 'admin':
        return '/dashboard/admin';
      case 'doctor':
        return '/dashboard/doctor';
      case 'radiologist':
        return '/dashboard/radiologist';
      case 'technician':
        return '/dashboard/technician';
      case 'viewer':
        return '/dashboard/viewer';
      default:
        return '/dashboard';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Username Field */}
      <div>
        <label htmlFor="username" className="label text-xs">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="input-field py-1.5 text-sm"
          placeholder="your-username"
          autoComplete="username"
        />
        {errors.username && (
          <p className="mt-1 text-xs text-error-600">{errors.username}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="label text-xs">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="input-field py-1.5 text-sm"
          placeholder="••••••••"
          autoComplete="current-password"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-error-600">{errors.password}</p>
        )}
      </div>

      {/* API Error */}
      {apiError && (
        <div className="bg-error-50 border border-error-200 text-error-700 px-3 py-2 rounded text-xs">
          {apiError}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        fullWidth
        isLoading={loading}
      >
        Sign In
      </Button>
    </form>
  );
}
