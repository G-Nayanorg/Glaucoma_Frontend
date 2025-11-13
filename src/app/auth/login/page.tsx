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
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6 group justify-center">
            <Image
              src="/logo.png"
              alt="Glaucoma AI Logo"
              width={72}
              height={72}
              className="w-18 h-18 object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
            <span className="font-grotesk font-bold text-2xl text-black group-hover:text-primary-600 transition-colors">Glaucoma AI</span>
          </Link>

          <h2 className="text-3xl font-bold text-black">
            Welcome back
          </h2>
          <p className="mt-2 text-medical-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Card */}
        <Card>
          <LoginForm />

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-medical-gray-600">
              Don't have an account?{' '}
              <Link
                href="/auth/register"
                className="font-medium text-primary-600 hover:text-primary-700"
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
