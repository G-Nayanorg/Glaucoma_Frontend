/**
 * Loader Component
 * Animated loading spinner
 */

import { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

/**
 * Loader size type
 */
type LoaderSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Loader Props
 */
export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: LoaderSize;
  color?: string;
  text?: string;
}

/**
 * Get size classes
 */
const getSizeClasses = (size: LoaderSize): string => {
  const sizes: Record<LoaderSize, string> = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
    xl: 'w-16 h-16 border-4',
  };
  return sizes[size];
};

/**
 * Loader Component
 */
export function Loader({
  size = 'md',
  color = 'border-primary-600',
  text,
  className,
  ...props
}: LoaderProps) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-3', className)}
      {...props}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-t-transparent',
          getSizeClasses(size),
          color
        )}
        role="status"
        aria-label="Loading"
      />
      {text && <p className="text-sm text-secondary-600">{text}</p>}
    </div>
  );
}

/**
 * Full Page Loader
 */
export function FullPageLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <Loader size="lg" text={text} />
    </div>
  );
}
