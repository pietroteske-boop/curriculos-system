import Link from 'next/link';
import { FiHeart } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 px-4 py-8 text-sm text-slate-500 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Currículos System. Todos os direitos reservados.</p>
        <div className="flex items-center gap-2">
          <FiHeart className="h-4 w-4 text-sky-400" />
          <span>Desenvolvido com Next.js e Tailwind.</span>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="#" className="text-slate-400 hover:text-slate-100">
            Ajuda
          </Link>
          <Link href="#" className="text-slate-400 hover:text-slate-100">
            Termos
          </Link>
        </div>
      </div>
    </footer>
  );
}
