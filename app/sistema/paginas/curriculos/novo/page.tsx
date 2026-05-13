'use client';

import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputMask from 'react-input-mask-next';
import { toast, Toaster } from 'sonner';
import { FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { addCurriculo } from '@/lib/curriculos';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const schema = yup.object({
  nome: yup.string().required('Nome é obrigatório').min(3, 'Nome deve ter pelo menos 3 caracteres'),
  cargo: yup.string().required('Cargo desejado é obrigatório').min(3, 'Cargo deve ter pelo menos 3 caracteres'),
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  telefone: yup.string().required('Telefone é obrigatório').min(14, 'Telefone incompleto'),
  cpf: yup.string().required('CPF é obrigatório').min(14, 'CPF incompleto'),
  resumo: yup.string().required('Resumo profissional é obrigatório').min(30, 'Resumo deve ter pelo menos 30 caracteres'),
  experiencia: yup.array().of(
    yup.object({
      empresa: yup.string().required('Empresa é obrigatória'),
      cargo: yup.string().required('Cargo é obrigatório'),
      periodo: yup.string().required('Período é obrigatório'),
      detalhes: yup.string().required('Detalhes são obrigatórios').min(15, 'Detalhes devem ter pelo menos 15 caracteres')
    })
  ),
  formacao: yup.array().of(
    yup.object({
      instituicao: yup.string().required('Instituição é obrigatória'),
      curso: yup.string().required('Curso é obrigatório'),
      periodo: yup.string().required('Período é obrigatório')
    })
  ),
  habilidades: yup.string().required('Habilidades são obrigatórias').min(5, 'Informe ao menos uma habilidade')
});

type FormValues = yup.InferType<typeof schema>;

export default function NovoCurriculoPage() {
  const [uploadName, setUploadName] = useState('Nenhum arquivo selecionado');
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: '',
      cargo: '',
      email: '',
      telefone: '',
      cpf: '',
      resumo: '',
      experiencia: [{ empresa: '', cargo: '', periodo: '', detalhes: '' }],
      formacao: [{ instituicao: '', curso: '', periodo: '' }],
      habilidades: ''
    },
    mode: 'onTouched'
  });

  const experiencia = useFieldArray({ control, name: 'experiencia' });
  const formacao = useFieldArray({ control, name: 'formacao' });

  useEffect(() => {
    if (!isValid) return;
  }, [isValid]);

  const onSubmit = async (data: FormValues) => {
    try {
      const id = String(Date.now());
      addCurriculo({
        id,
        nome: data.nome,
        cargo: data.cargo,
        email: data.email,
        telefone: data.telefone,
        cpf: data.cpf,
        resumo: data.resumo,
        experiencia: data.experiencia ?? [],
        formacao: data.formacao ?? [],
        habilidades: data.habilidades.split(',').map((item) => item.trim()).filter(Boolean),
        imageUrl: '/avatar-placeholder.svg'
      });
      toast.success('Currículo salvo com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar currículo. Verifique os dados.');
    }
  };

  const onError = (errors: any) => {
    const firstError = (Object.values(errors)[0] as { message?: string })?.message;
    if (firstError) {
      toast.error(firstError);
    } else {
      toast.error('Verifique os campos obrigatórios.');
    }
  };

  return (
    <section className="space-y-8">
      <Toaster position="top-right" richColors />
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h1 className="text-3xl font-semibold text-white">Novo currículo</h1>
        <p className="mt-3 text-slate-400">Preencha o formulário abaixo. Campos dinâmicos permitem múltiplas experiências e formações.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card className="border-slate-800 bg-slate-950/80 p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="nome">Nome completo</Label>
                <Input id="nome" {...register('nome')} />
                {errors.nome && <p className="mt-2 text-sm text-rose-400">{errors.nome.message}</p>}
              </div>
              <div>
                <Label htmlFor="cargo">Cargo desejado</Label>
                <Input id="cargo" {...register('cargo')} />
                {errors.cargo && <p className="mt-2 text-sm text-rose-400">{errors.cargo.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && <p className="mt-2 text-sm text-rose-400">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <InputMask
                  mask="(99) 99999-9999"
                  className="flex h-11 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 text-sm text-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                  id="telefone"
                  {...register('telefone')}
                />
                {errors.telefone && <p className="mt-2 text-sm text-rose-400">{errors.telefone.message}</p>}
              </div>
              <div>
                <Label htmlFor="cpf">CPF</Label>
                <InputMask
                  mask="999.999.999-99"
                  className="flex h-11 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 text-sm text-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
                  id="cpf"
                  {...register('cpf')}
                />
                {errors.cpf && <p className="mt-2 text-sm text-rose-400">{errors.cpf.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="resumo">Resumo profissional</Label>
                <Textarea id="resumo" {...register('resumo')} />
                {errors.resumo && <p className="mt-2 text-sm text-rose-400">{errors.resumo.message}</p>}
              </div>
            </div>
          </Card>

          <Card className="border-slate-800 bg-slate-950/80 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">Experiência profissional</h2>
                <p className="text-sm text-slate-400">Adicione uma ou mais experiências.</p>
              </div>
              <Button type="button" variant="secondary" size="sm" onClick={() => experiencia.append({ empresa: '', cargo: '', periodo: '', detalhes: '' })}>
                <FiPlusCircle className="mr-2 h-4 w-4" /> Adicionar
              </Button>
            </div>
            <div className="mt-6 space-y-6">
              {experiencia.fields.map((field, index) => (
                <div key={field.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-200">Experiência {index + 1}</p>
                    <Button type="button" variant="ghost" size="sm" onClick={() => experiencia.remove(index)}>
                      <FiTrash2 className="mr-2 h-4 w-4" /> Remover
                    </Button>
                  </div>
                  <div className="mt-4 grid gap-6 sm:grid-cols-2">
                    <div>
                      <Label htmlFor={`experiencia.${index}.empresa`}>Empresa</Label>
                      <Input id={`experiencia.${index}.empresa`} {...register(`experiencia.${index}.empresa` as const)} />
                    </div>
                    <div>
                      <Label htmlFor={`experiencia.${index}.cargo`}>Cargo</Label>
                      <Input id={`experiencia.${index}.cargo`} {...register(`experiencia.${index}.cargo` as const)} />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor={`experiencia.${index}.periodo`}>Período</Label>
                      <Input id={`experiencia.${index}.periodo`} {...register(`experiencia.${index}.periodo` as const)} placeholder="Ex: 2020 - 2022" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor={`experiencia.${index}.detalhes`}>Detalhes</Label>
                      <Textarea id={`experiencia.${index}.detalhes`} {...register(`experiencia.${index}.detalhes` as const)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-slate-800 bg-slate-950/80 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-white">Formação acadêmica</h2>
                <p className="text-sm text-slate-400">Adicione uma ou mais formações.</p>
              </div>
              <Button type="button" variant="secondary" size="sm" onClick={() => formacao.append({ instituicao: '', curso: '', periodo: '' })}>
                <FiPlusCircle className="mr-2 h-4 w-4" /> Adicionar
              </Button>
            </div>
            <div className="mt-6 space-y-6">
              {formacao.fields.map((field, index) => (
                <div key={field.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-200">Formação {index + 1}</p>
                    <Button type="button" variant="ghost" size="sm" onClick={() => formacao.remove(index)}>
                      <FiTrash2 className="mr-2 h-4 w-4" /> Remover
                    </Button>
                  </div>
                  <div className="mt-4 grid gap-6 sm:grid-cols-2">
                    <div>
                      <Label htmlFor={`formacao.${index}.instituicao`}>Instituição</Label>
                      <Input id={`formacao.${index}.instituicao`} {...register(`formacao.${index}.instituicao` as const)} />
                    </div>
                    <div>
                      <Label htmlFor={`formacao.${index}.curso`}>Curso</Label>
                      <Input id={`formacao.${index}.curso`} {...register(`formacao.${index}.curso` as const)} />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor={`formacao.${index}.periodo`}>Período</Label>
                      <Input id={`formacao.${index}.periodo`} {...register(`formacao.${index}.periodo` as const)} placeholder="Ex: 2018 - 2022" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-slate-800 bg-slate-950/80 p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="habilidades">Habilidades</Label>
                <Input id="habilidades" placeholder="React, Tailwind, comunicação" {...register('habilidades')} />
                {errors.habilidades && <p className="mt-2 text-sm text-rose-400">{errors.habilidades.message}</p>}
              </div>
              <div>
                <Label htmlFor="foto">Upload fake de imagem</Label>
                <input
                  id="foto"
                  type="file"
                  accept="image/*"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-slate-100 file:rounded-full file:border-0 file:bg-slate-800 file:px-4 file:py-2 file:text-slate-100"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    setUploadName(file ? file.name : 'Nenhum arquivo selecionado');
                  }}
                />
                <p className="mt-2 text-sm text-slate-400">{uploadName}</p>
              </div>
            </div>
          </Card>
        </div>
        <aside className="space-y-6">
          <Card className="border-slate-800 bg-slate-950/80 p-6">
            <h2 className="text-xl font-semibold text-white">Dicas para cadastro</h2>
            <ul className="mt-4 space-y-3 text-slate-400">
              <li>• Use vírgulas para separar habilidades.</li>
              <li>• Preencha ao menos uma experiência e uma formação.</li>
              <li>• O upload de imagem é simulado, o perfil exibirá placeholder.</li>
              <li>• Campos obrigatórios disparam erro via toast quando enviados incorretamente.</li>
            </ul>
          </Card>
          <Card className="border-slate-800 bg-slate-950/80 p-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Salvar currículo</h2>
              <p className="text-slate-400">
                Ao submeter o formulário, o currículo será persistido no localStorage e ficará disponível na lista.
              </p>
              <Button type="submit" disabled={isSubmitting || !isValid} className="w-full">
                Cadastrar currículo
              </Button>
            </div>
          </Card>
        </aside>
      </form>
    </section>
  );
}
