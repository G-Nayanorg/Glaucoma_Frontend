/**
 * Stats Card Component
 * Display statistical information
 */

import { Card } from '@/components/common/Card';
import { ReactNode } from 'react';

/**
 * Stats Card Props
 */
export interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info';
}

/**
 * Get color classes
 */
const getColorClasses = (color: StatsCardProps['color'] = 'primary') => {
  const colors = {
    primary: 'bg-primary-100 text-primary-600',
    success: 'bg-success-100 text-success-600',
    warning: 'bg-warning-100 text-warning-600',
    error: 'bg-error-100 text-error-600',
    info: 'bg-info-100 text-info-600',
  };
  return colors[color];
};

/**
 * Stats Card Component
 */
export function StatsCard({ title, value, icon, trend, color = 'primary' }: StatsCardProps) {
  return (
    <Card hoverable>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-secondary-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-secondary-900">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? 'text-success-600' : 'text-error-600'
                }`}
              >
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-secondary-500 ml-2">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${getColorClasses(color)}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}
