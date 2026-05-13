import * as React from 'react';
import { cn } from '@/lib/utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
}

export function Label({ className, ...props }: LabelProps) {
  return <label className={cn('mb-2 block text-sm font-medium text-slate-200', className)} {...props} />;
}
