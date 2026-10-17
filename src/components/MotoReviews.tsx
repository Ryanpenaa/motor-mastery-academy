import { useState, type FormEvent } from "react";
import { Star, MessageSquarePlus, CheckCircle2 } from "lucide-react";

type Review = { id: string; nome: string; comentario: string; foto: string };
const reviews: Review[] = [
  { id: "guilherme", nome: "Guilherme da Paz", comentario: "Curso 5 estrelas, muito bom. Voltei só para comentar porque, quando comprei, estava com muito medo de ser golpe.", foto: "https://mecanicoautomotiva.lovable.app/__l5e/assets-v1/5ad4430d-077f-40ed-a8ac-f44fa11d4f01/guilherme.webp" },
  { id: "jennifer", nome: "Jennifer S. Luz", comentario: "Recomendo muito mesmo. Realizei o curso e peguei meu certificado.", foto: "https://mecanicoautomotiva.lovable.app/__l5e/assets-v1/27556a6b-1d2f-4c61-9e0b-85fe70542fbb/jennifer.webp" },
  { id: "carlos", nome: "Carlos Gomes", comentario: "Revisei principalmente pelo material ilustrado e pelas apostilas. Muito bom o curso todo.", foto: "https://mecanicoautomotiva.lovable.app/__l5e/assets-v1/0336291c-4504-4a17-aa34-9d751c1321ab/carlos.webp" },
];

export function MotoReviews() {
  const [open,setOpen] = useState(false);
  const [nome,setNome] = useState("");
  const [comentario,setComentario] = useState("");
  const [estrelas,setEstrelas] = useState(0);
  const [done,setDone] = useState(false);
  const [error,setError] = useState("");
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    if (estrelas < 1) { setError("Escolha de 1 a 5 estrelas."); return; }
    // Apenas demonstração visual: não armazenar nem transmitir os dados.
    setDone(true); setNome(""); setComentario(""); setEstrelas(0);
  }
  return <section data-meta-section="avaliacoes" id="avaliacoes" className="bg-background py-14 md:py-20">
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <div className="mb-10 text-center">
        <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-primary">Avaliações de alunos</p>
        <h2 className="font-display text-4xl font-extrabold uppercase leading-tight md:text-5xl">O que nossos alunos estão dizendo</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">Experiências compartilhadas por alunos da formação.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map(review => <article key={review.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <img src={review.foto} alt={`Foto de ${review.nome}`} className="h-12 w-12 shrink-0 rounded-full object-cover" loading="lazy" width="48" height="48" decoding="async" />
            <div className="min-w-0"><p className="font-bold text-foreground">{review.nome}</p><p className="text-xs text-muted-foreground">Avaliação de aluno</p></div>
          </div>
          <div className="my-3 flex gap-1" aria-label="5 de 5 estrelas">{[1,2,3,4,5].map(n=><Star key={n} aria-hidden="true" className="h-4 w-4 fill-amber-400 text-amber-400" />)}</div>
          <p className="text-sm leading-relaxed text-foreground">{review.comentario}</p>
        </article>)}
      </div>
      <div className="mx-auto mt-8 max-w-xl">
        <button type="button" onClick={() => {setOpen(!open);setDone(false);setError("");}} aria-expanded={open} className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary bg-primary/10 px-5 py-3 font-bold text-foreground transition-colors hover:bg-primary/20"><MessageSquarePlus className="h-5 w-5 text-primary" />{open ? "Fechar formulário" : "Deixe sua avaliação"}</button>
        {open && <form onSubmit={handleSubmit} className="mt-4 space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
          <h3 className="text-xl font-bold">Sua avaliação</h3>
          <p className="text-xs text-muted-foreground">Formulário demonstrativo: sua avaliação não será enviada, publicada ou armazenada.</p>
          <label className="block text-sm font-semibold">Seu nome<input value={nome} onChange={e=>setNome(e.target.value)} required minLength={2} maxLength={70} autoComplete="name" placeholder="Digite seu nome" className="mt-2 w-full rounded-lg border border-border bg-background p-3 text-foreground" /></label>
          <fieldset><legend className="mb-2 text-sm font-semibold">Sua nota</legend><div className="flex items-center gap-2">{[1,2,3,4,5].map(n=><button type="button" key={n} aria-label={`${n} ${n===1?"estrela":"estrelas"}`} aria-pressed={estrelas===n} onClick={()=>{setEstrelas(n);setError("");}} className="rounded-lg p-1 focus-visible:outline-2 focus-visible:outline-primary"><Star className={`h-8 w-8 ${n<=estrelas?"fill-amber-400 text-amber-400":"text-muted-foreground/40"}`} /></button>)}<span className="text-sm text-muted-foreground">{estrelas ? `${estrelas}/5` : "Selecione"}</span></div></fieldset>
          <label className="block text-sm font-semibold">Seu comentário<textarea value={comentario} onChange={e=>setComentario(e.target.value)} required minLength={15} maxLength={1200} rows={4} placeholder="Conte sua experiência" className="mt-2 w-full rounded-lg border border-border bg-background p-3 text-foreground" /></label>
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          {done && <div role="status" className="flex gap-2 rounded-lg border border-primary/20 bg-primary/10 p-3 text-sm"><CheckCircle2 className="h-5 w-5 shrink-0 text-primary" /><span>Prévia concluída. Nenhuma avaliação foi enviada ou salva.</span></div>}
          <button type="submit" className="w-full rounded-lg bg-primary px-5 py-3 font-bold text-primary-foreground">Concluir prévia</button>
        </form>}
      </div>
    </div>
  </section>;
}
