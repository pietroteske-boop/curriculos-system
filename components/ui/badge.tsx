import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function Badge({ className, ...props }: BadgeProps) {
  return <span className={cn('inline-flex rounded-full border border-slate-800 bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-200', className)} {...props} />;
}
