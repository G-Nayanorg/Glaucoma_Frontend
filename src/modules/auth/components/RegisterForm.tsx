/**
 * Register Form Component
 * Form for user registration
 */

'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { useAuthStore } from '@/store/authStore';
import { register } from '../services/authService';
import { ApiError } from '@/utils/api.util';
import { isValidEmail, isValidPassword } from '@/utils/validators';

/**
 * Register Form Component
 */
export function RegisterForm() {
  const router = useRouter();
  const { login: setAuth } = useAuthStore();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirmPassword: '',
    tenant_id: 'default',
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

    if (!formData.first_name) {
      newErrors.first_name = 'First name is required';
    }

    if (!formData.last_name) {
      newErrors.last_name = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const authResponse = await register(formData);
      setAuth(authResponse);

      // Redirect based on role (new users typically get 'no_role')
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Username Field */}
      <div>
        <label htmlFor="username" className="label">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="input-field"
          placeholder="johndoe"
          autoComplete="username"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-error-600">{errors.username}</p>
        )}
      </div>

      {/* First Name Field */}
      <div>
        <label htmlFor="first_name" className="label">
          First Name
        </label>
        <input
          id="first_name"
          type="text"
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          className="input-field"
          placeholder="John"
          autoComplete="given-name"
        />
        {errors.first_name && (
          <p className="mt-1 text-sm text-error-600">{errors.first_name}</p>
        )}
      </div>

      {/* Last Name Field */}
      <div>
        <label htmlFor="last_name" className="label">
          Last Name
        </label>
        <input
          id="last_name"
          type="text"
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          className="input-field"
          placeholder="Doe"
          autoComplete="family-name"
        />
        {errors.last_name && (
          <p className="mt-1 text-sm text-error-600">{errors.last_name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="label">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="input-field"
          placeholder="you@example.com"
          autoComplete="email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-error-600">{errors.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="input-field"
          placeholder="••••••••"
          autoComplete="new-password"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-error-600">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="label">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          className="input-field"
          placeholder="••••••••"
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-error-600">{errors.confirmPassword}</p>
        )}
      </div>

      {/* API Error */}
      {apiError && (
        <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg">
          {apiError}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={loading}
      >
        Create Account
      </Button>
    </form>
  );
}
