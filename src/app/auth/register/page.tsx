/**
 * Register Page
 * User registration page
 */

import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Card } from '@/components/common/Card';
import { RegisterForm } from '@/modules/auth/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Create a new account',
};

/**
 * Register Page Component
 */
export default function RegisterPage() {
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
            Create an account
          </h2>
          <p className="mt-2 text-medical-gray-600">
            Get started with your free account
          </p>
        </div>

        {/* Register Card */}
        <Card>
          <RegisterForm />

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-medical-gray-600">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="font-medium text-primary-600 hover:text-primary-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
