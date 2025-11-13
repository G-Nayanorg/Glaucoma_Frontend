/**
 * Card Component
 * Reusable card container for content
 */

import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/cn';

/**
 * Card Props
 */
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Get padding classes
 */
const getPaddingClasses = (padding: CardProps['padding']): string => {
  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  return paddings[padding || 'md'];
};

/**
 * Card Component
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, hoverable = false, padding = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'bg-white rounded-xl shadow-card',
          'transition-all duration-200',
          // Padding
          getPaddingClasses(padding),
          // Hoverable
          hoverable && 'hover:shadow-elevated cursor-pointer',
          // Custom className
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card Header Component
 */
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, title, subtitle, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('border-b border-secondary-200 pb-4 mb-4', className)}
        {...props}
      >
        {title && <h3 className="text-lg font-semibold text-secondary-900">{title}</h3>}
        {subtitle && <p className="text-sm text-secondary-600 mt-1">{subtitle}</p>}
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

/**
 * Card Body Component
 */
export const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('', className)} {...props}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

/**
 * Card Footer Component
 */
export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('border-t border-secondary-200 pt-4 mt-4', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';
