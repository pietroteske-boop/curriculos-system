import Link from 'next/link';
import { FiArrowRight, FiBriefcase, FiFileText, FiStar } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function HomePage() {
  return (
    <section className="space-y-12 pb-16">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-soft backdrop-blur-xl sm:p-12">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-4 py-2 text-sm text-sky-200">
            <FiStar className="h-4 w-4" /> Sistema de Currículos
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Gerencie talentos e currículos com rapidez e organização.
          </h1>
          <p className="text-slate-300 sm:text-lg">
            Um painel de currículos em Next.js com formulários dinâmicos, validação em Yup,
            máscaras de entrada e feedback instantâneo via Sonner.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/sistema/paginas/curriculos" className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
            Ver currículos <FiArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/sistema/paginas/curriculos/novo" className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800">
            Cadastrar novo currículo
          </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Card className="border-slate-800 bg-slate-950/80 p-5">
              <div className="flex items-center gap-3 text-sky-300">
                <FiBriefcase className="h-5 w-5" />
                <p className="font-semibold">Experiências reais</p>
              </div>
              <p className="mt-3 text-sm text-slate-400">Campos dinâmicos para cargos, empresas e datas.</p>
            </Card>
            <Card className="border-slate-800 bg-slate-950/80 p-5">
              <div className="flex items-center gap-3 text-emerald-300">
                <FiFileText className="h-5 w-5" />
                <p className="font-semibold">Validações completas</p>
              </div>
              <p className="mt-3 text-sm text-slate-400">Nome, e-mail, CPF, telefone e texto mínimo validado.</p>
            </Card>
            <Card className="border-slate-800 bg-slate-950/80 p-5">
              <div className="flex items-center gap-3 text-fuchsia-300">
                <Badge className="rounded-full bg-fuchsia-500/10 text-fuchsia-200">UI</Badge>
                <p className="font-semibold">Design responsivo</p>
              </div>
              <p className="mt-3 text-sm text-slate-400">Layout preparado para mobile, tablet e desktop.</p>
            </Card>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-slate-800 bg-slate-900/80 p-8">
          <h2 className="text-2xl font-semibold text-white">Por que este sistema?</h2>
          <p className="mt-4 text-slate-300">
            O sistema permite que você organize perfis profissionais em um só lugar, com foco em experiência do usuário,
            feedback visual e navegação clara.
          </p>
          <ul className="mt-6 space-y-4 text-slate-400">
            <li>✔ Formulário completo com validações e máscaras.</li>
            <li>✔ Lista dinâmica com filtro por nome/cargo.</li>
            <li>✔ Rota de detalhes do candidato com ações e informações completas.</li>
          </ul>
        </Card>
        <Card className="border-slate-800 bg-slate-900/80 p-8">
          <h2 className="text-2xl font-semibold text-white">Funcionalidades implementadas</h2>
          <div className="mt-6 space-y-4 text-slate-300">
            <p>• Persistência mockada com localStorage.</p>
            <p>• Upload fake de imagem do candidato.</p>
            <p>• Campos dinâmicos para experiências e formações.</p>
            <p>• Feedback de sucesso e erro exibidos com toast.</p>
          </div>
        </Card>
      </div>
    </section>
  );
}
