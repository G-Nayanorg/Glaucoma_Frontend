/**
 * Login Page
 * Authentication page for user login
 */

import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Card } from '@/components/common/Card';
import { LoginForm } from '@/modules/auth/components/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Sign in to your account',
};

/**
 * Login Page Component
 */
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 login-page">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-4 group justify-center">
            <Image
              src="/logo.png"
              alt="Glaucoma AI Logo"
              width={60}
              height={60}
              className="w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <span className="font-grotesk font-bold text-xl text-black group-hover:text-primary-600 transition-colors">Glaucoma AI</span>
          </Link>

          <h2 className="text-2xl font-bold text-black">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-medical-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Card */}
        <Card padding="sm">
          <LoginForm />

          {/* Footer Links */}
          <div className="mt-4 text-center">
            <p className="text-xs text-medical-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                href="/auth/register"
                className="font-medium text-primary-600 hover:text-primary-700 text-sm"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
