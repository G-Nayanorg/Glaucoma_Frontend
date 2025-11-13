/**
 * 404 Not Found Page
 * Displayed when a route doesn't exist
 */

import Link from 'next/link';
import { Button } from '@/components/common/Button';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary-50">
      <div className="max-w-md w-full mx-auto p-8 text-center">
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
        </div>

        <h2 className="text-3xl font-bold text-secondary-900 mb-3">
          Page Not Found
        </h2>

        <p className="text-secondary-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link href="/">
          <Button variant="primary" size="lg">
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
