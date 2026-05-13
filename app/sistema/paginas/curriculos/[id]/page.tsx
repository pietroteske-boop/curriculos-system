'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiMail, FiPhone, FiUser } from 'react-icons/fi';
import { Curriculo, getCurriculoById } from '@/lib/curriculos';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CurriculoDetailProps {
  id: string;
}

function CurriculoDetail({ id }: CurriculoDetailProps) {
  const [curriculo, setCurriculo] = useState<Curriculo | undefined>();

  useEffect(() => {
    const data = getCurriculoById(id);
    setCurriculo(data);
  }, [id]);

  if (!curriculo) {
    return (
      <section className="space-y-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-10 text-center text-slate-300">
          Currículo não encontrado.
        </div>
        <Link href="/sistema/paginas/curriculos">
          <Button variant="secondary">Voltar à lista</Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Detalhes do currículo</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">{curriculo.nome}</h1>
          <p className="mt-1 text-slate-400">{curriculo.cargo}</p>
        </div>
        <Link href="/sistema/paginas/curriculos">
          <Button variant="secondary">
            <FiArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-6">
          <Card className="border-slate-800 bg-slate-950/80 p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-300">
                <FiMail className="h-5 w-5 text-sky-300" />
                <span>{curriculo.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <FiPhone className="h-5 w-5 text-emerald-300" />
                <span>{curriculo.telefone}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <FiUser className="h-5 w-5 text-fuchsia-300" />
                <span>{curriculo.cpf}</span>
              </div>
            </div>
          </Card>

          <Card className="border-slate-800 bg-slate-950/80 p-6">
            <h2 className="text-xl font-semibold text-white">Resumo profissional</h2>
            <p className="mt-4 text-slate-300">{curriculo.resumo}</p>
          </Card>

          <Card className="border-slate-800 bg-slate-950/80 p-6">
            <h2 className="text-xl font-semibold text-white">Experiência</h2>
            <div className="mt-4 space-y-4">
              {curriculo.experiencia.map((item, index) => (
                <div key={index} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold text-slate-100">{item.empresa}</p>
                    <p className="text-sm text-slate-400">{item.cargo} • {item.periodo}</p>
                  </div>
                  <p className="mt-3 text-slate-300">{item.detalhes}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-slate-800 bg-slate-950/80 p-6">
            <h2 className="text-xl font-semibold text-white">Formação acadêmica</h2>
            <div className="mt-4 space-y-4">
              {curriculo.formacao.map((item, index) => (
                <div key={index} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
                  <p className="text-sm font-semibold text-slate-100">{item.instituicao}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.curso}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.periodo}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card className="border-slate-800 bg-slate-950/80 p-6">
            <h2 className="text-xl font-semibold text-white">Habilidades</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {curriculo.habilidades.map((skill) => (
                <Badge key={skill} className="bg-slate-800 text-slate-200">{skill}</Badge>
              ))}
            </div>
          </Card>
          <Card className="border-slate-800 bg-slate-950/80 p-6">
            <h2 className="text-xl font-semibold text-white">Sobre o candidato</h2>
            <p className="mt-4 text-slate-300">Este currículo foi carregado do localStorage para demonstração da lista e detalhes de perfil.</p>
          </Card>
        </aside>
      </div>
    </section>
  );
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return <CurriculoDetail id={params.id} />;
}
