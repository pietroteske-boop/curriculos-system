import Link from 'next/link';
import { FiArrowRight, FiBriefcase, FiUsers } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CurriculoCardProps {
  id: string;
  nome: string;
  cargo: string;
  resumo: string;
  habilidades: string[];
}

export function CurriculoCard({ id, nome, cargo, resumo, habilidades }: CurriculoCardProps) {
  return (
    <Card className="group flex flex-col justify-between gap-4 p-6 sm:p-7">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-slate-400">
          <FiBriefcase className="h-4 w-4" />
          <span>{cargo}</span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">{nome}</h3>
          <p className="mt-3 text-slate-300 line-clamp-3">{resumo}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {habilidades.slice(0, 4).map((skill) => (
          <Badge key={skill} className="bg-slate-800 text-slate-200">{skill}</Badge>
        ))}
      </div>
      <Link href={`/sistema/paginas/curriculos/${id}`} className="inline-flex items-center gap-2 text-sm font-medium text-sky-300 transition group-hover:text-sky-200">
        Ver detalhes <FiArrowRight className="h-4 w-4" />
      </Link>
    </Card>
  );
}
