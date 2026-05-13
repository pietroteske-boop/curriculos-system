'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiFileText, FiPlusCircle } from 'react-icons/fi';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: FiHome },
  { href: '/sistema/paginas/curriculos', label: 'Currículos', icon: FiFileText },
  { href: '/sistema/paginas/curriculos/novo', label: 'Cadastrar', icon: FiPlusCircle }
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-300 ring-1 ring-sky-500/20">
            <FiFileText className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-100">Sistema de Currículos</p>
            <p className="text-xs text-slate-400">Gestão de talentos com UX moderna</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition',
                  active ? 'bg-slate-800 text-white shadow-sm shadow-slate-900/40' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                )}
              >
                <Icon className="h-4 w-4" /> {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
