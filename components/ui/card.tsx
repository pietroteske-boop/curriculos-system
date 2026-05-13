import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return <div className={cn('rounded-3xl border border-slate-800 bg-slate-900/90 shadow-soft', className)} {...props} />;
}
