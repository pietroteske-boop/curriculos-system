'use client';

import { useEffect, useMemo, useState } from 'react';
import { FiPlus, FiSearch, FiUsers } from 'react-icons/fi';
import Link from 'next/link';
import { Curriculo, getInitialCurriculos } from '@/lib/curriculos';
import { CurriculoCard } from '@/components/curriculo-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function CurriculosListPage() {
  const [curriculos, setCurriculos] = useState<Curriculo[]>([]);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setCurriculos(getInitialCurriculos());
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => setSearch(query.trim()), 250);
    return () => window.clearTimeout(timeout);
  }, [query]);

  const filtered = useMemo(() => {
    if (!search) return curriculos;
    return curriculos.filter((item) => {
      return (
        item.nome.toLowerCase().includes(search.toLowerCase()) ||
        item.cargo.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [curriculos, search]);

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Lista de Currículos</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Perfis profissionais disponíveis</h1>
        </div>
        <Link href="/sistema/paginas/curriculos/novo">
          <Button>
            <FiPlus className="mr-2 h-4 w-4" /> Novo currículo
          </Button>
        </Link>
      </div>

      <Card className="border-slate-800 bg-slate-950/70 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-slate-300">
            <FiUsers className="h-5 w-5 text-sky-300" />
            <span>{filtered.length} currículos encontrados</span>
          </div>
          <div className="relative max-w-md">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nome ou cargo"
              className="pl-11"
            />
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {filtered.length > 0 ? (
          filtered.map((curriculo) => (
            <CurriculoCard key={curriculo.id} id={curriculo.id} nome={curriculo.nome} cargo={curriculo.cargo} resumo={curriculo.resumo} habilidades={curriculo.habilidades} />
          ))
        ) : (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-10 text-center text-slate-400">
            Nenhum currículo encontrado para "{search}".
          </div>
        )}
      </div>
    </section>
  );
}
