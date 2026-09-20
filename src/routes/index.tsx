import { createFileRoute } from "@tanstack/react-router";
import {
  Award, BookOpen, Check, ChevronRight, CircleGauge, Clock3, Cog, FileCheck2,
  Gauge, GraduationCap, Infinity, Laptop, Play, ShieldCheck, Smartphone, Sparkles,
  Star, TabletSmartphone, Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import mockup from "@/assets/formacao-mecanico-motos-mockup.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Formação Mecânico de Motos | Do Zero ao Avançado" },
    { name: "description", content: "Curso online de mecânica de motos com mais de 80 videoaulas, acesso vitalício, materiais práticos e certificado no Plano Profissional." },
    { property: "og:title", content: "Formação Mecânico de Motos | Do Zero ao Avançado" },
    { property: "og:description", content: "Aprenda motor, elétrica, injeção, freios, suspensão e diagnóstico de motos." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

const benefits = [
  [Play, "80+ videoaulas práticas", "Aprenda mecânica de motocicletas de forma simples e organizada."],
  [Gauge, "Do zero ao avançado", "Comece mesmo sem experiência anterior com motos ou mecânica."],
  [BookOpen, "Materiais de apoio", "Apostilas, guias, tabelas e checklists para acompanhar seus estudos."],
  [Infinity, "Acesso vitalício", "Estude pelo celular ou computador e reveja quando precisar."],
] as const;

const modules = [
  [Cog, "Motor de motos", "Funcionamento, principais componentes, manutenção e montagem."],
  [CircleGauge, "Sistema de alimentação", "Carburadores, alimentação e falhas no funcionamento do motor."],
  [Gauge, "Injeção eletrônica", "Sensores, atuadores e fundamentos da injeção eletrônica."],
  [Sparkles, "Sistema elétrico", "Bateria, partida, carga, ignição e identificação de falhas."],
  [ShieldCheck, "Freios", "Componentes, inspeções e procedimentos de manutenção."],
  [Wrench, "Suspensão", "Suspensão dianteira e traseira, componentes e sinais de desgaste."],
  [Cog, "Embreagem e transmissão", "Embreagem, câmbio, relação, corrente, coroa e pinhão."],
  [FileCheck2, "Manutenção preventiva", "Os principais pontos que devem ser verificados em uma revisão."],
  [CircleGauge, "Diagnóstico de defeitos", "Sintomas e possíveis causas de problemas mecânicos e elétricos."],
] as const;

const support = [
  "Apostila de Mecânica de Motos", "Tabela de Torques e Especificações", "Checklist de Revisão Preventiva",
  "Guia de Diagnóstico de Defeitos", "Manual de Ferramentas do Mecânico de Motos", "Guia de Sistema Elétrico",
  "Guia de Injeção Eletrônica", "Guia de Freios e Suspensão", "Guia de Transmissão e Relação",
];

const lessons = [
  "Aula 01 — Fundamentos da motocicleta", "Aula 08 — Funcionamento do motor", "Aula 15 — Desmontagem do motor",
  "Aula 23 — Sistema elétrico da moto", "Aula 31 — Injeção eletrônica", "Aula 39 — Sistema de freios",
  "Aula 46 — Suspensão dianteira", "Aula 55 — Embreagem e transmissão", "Aula 63 — Diagnóstico de defeitos",
  "Aula 74 — Revisão preventiva completa",
];

const bonuses = [
  ["01", "Apostila Completa de Mecânica de Motos", "Revise os principais conceitos e consulte sempre que precisar."],
  ["02", "Tabela de Torques e Especificações", "Informações úteis para estudos e procedimentos."],
  ["03", "Checklist de Revisão Preventiva", "Organize os pontos observados durante uma revisão."],
  ["04", "Guia de Diagnóstico de Defeitos", "Identifique possíveis causas de falhas mecânicas e elétricas."],
  ["05", "Manual de Ferramentas", "Conheça as ferramentas de oficina e a função de cada uma."],
  ["06", "Guia de Sistema Elétrico", "Componentes elétricos e fundamentos de diagnóstico."],
  ["07", "Guia de Injeção Eletrônica", "Sensores, atuadores e funcionamento do sistema."],
  ["08", "Manual de Freios e Suspensão", "Funcionamento, inspeção e manutenção dos sistemas."],
  ["09", "Guia de Embreagem e Transmissão", "Embreagem, câmbio, corrente, coroa e pinhão."],
  ["10", "Guia para Conseguir os Primeiros Clientes", "Orientações para transformar conhecimento em serviços."],
];

const faqs = [
  ["Preciso ter experiência para começar?", "Não. A formação foi desenvolvida para quem deseja começar do zero."],
  ["O curso é voltado somente para motos?", "Sim. O conteúdo é focado nos principais sistemas, componentes e procedimentos da mecânica de motocicletas."],
  ["Preciso ter uma moto ou comprar ferramentas?", "Não. Você pode começar pela parte teórica e pelas demonstrações, adquirindo ferramentas conforme evolui."],
  ["Como recebo o acesso?", "Após a confirmação da compra, você recebe as informações para acessar a plataforma."],
  ["Posso assistir pelo celular?", "Sim. As aulas podem ser acessadas pelo celular, tablet ou computador."],
  ["Por quanto tempo tenho acesso?", "O acesso às aulas é vitalício."],
  ["O curso possui certificado?", "Sim. O certificado de conclusão está incluso no Plano Profissional."],
  ["Qual a diferença entre o Básico e o Profissional?", "O Básico oferece as videoaulas. O Profissional inclui videoaulas, certificado, materiais de apoio e os 10 bônus exclusivos."],
  ["Como funciona a garantia de 7 dias?", "Você pode acessar o curso e avaliar o conteúdo durante o período de garantia estabelecido na compra."],
];

const audiences = [
  { Icon: GraduationCap, title: "Quem começa do zero", text: "Conteúdo progressivo e linguagem simples." },
  { Icon: Wrench, title: "Quem já faz manutenção", text: "Organize conhecimentos e amplie sua base técnica." },
  { Icon: Star, title: "Quem busca uma profissão", text: "Construa uma base prática para buscar oportunidades na área." },
];

function TrustLine() {
  return <p className="mt-4 flex flex-wrap justify-center gap-x-2 text-center text-xs font-semibold text-muted-foreground"><span>Acesso imediato</span><span>•</span><span>Compra segura</span><span>•</span><span>Garantia de 7 dias</span></p>;
}

function Cta({ label = "Quero começar agora" }: { label?: string }) {
  return <Button variant="sales" size="xl" asChild><a href="#planos">{label}<ChevronRight /></a></Button>;
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="mx-auto mb-10 max-w-3xl text-center"><p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-primary">{eyebrow}</p><h2 className="text-4xl font-extrabold uppercase leading-none text-foreground md:text-5xl">{title}</h2>{text && <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">{text}</p>}</div>;
}

function Index() {
  return <main className="min-h-screen bg-background">
    <header className="bg-surface-dark text-surface-dark-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#inicio" className="flex items-center gap-3 font-display text-xl font-extrabold uppercase"><span className="grid size-9 place-items-center rounded-md bg-primary"><Cog className="size-5" /></span><span>Moto <span className="text-primary">Expert</span></span></a>
        <a href="#planos" className="text-sm font-bold text-primary hover:text-accent">Ver planos</a>
      </div>
    </header>

    <section id="inicio" className="relative overflow-hidden bg-surface-dark text-surface-dark-foreground">
      <div className="absolute inset-x-0 bottom-0 h-px bg-primary/30" />
      <div className="mx-auto flex max-w-5xl flex-col items-center px-5 pb-14 pt-8 text-center md:min-h-[650px] md:px-8 md:py-16">
        <div className="relative z-10 flex w-full flex-col items-center">
          <p className="mb-5 inline-flex items-center gap-2 border-l-4 border-primary pl-3 text-xs font-extrabold uppercase tracking-widest text-primary">Formação profissionalizante online</p>
          <h1 className="max-w-4xl text-5xl font-extrabold uppercase leading-[0.94] md:text-7xl">Torne-se um <span className="text-primary">Mecânico de Motos</span>: do zero ao avançado</h1>
          <div className="relative mt-6 w-full max-w-3xl">
            <div className="absolute inset-8 rounded-full bg-primary/20 blur-3xl" />
            <img src={mockup.url} alt="Formação Mecânico de Motos com aulas, certificado e materiais de apoio" className="relative z-10 w-full object-contain drop-shadow-2xl" />
          </div>
          <p className="mt-6 max-w-2xl text-base leading-7 text-steel md:text-lg">Curso 100% online com mais de 80 videoaulas práticas sobre motor, elétrica, injeção, freios, suspensão e diagnóstico de motos.</p>
          <div className="mt-8"><Cta /></div>
          <TrustLine />
        </div>
      </div>
    </section>

    <section className="border-b border-border bg-card py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8"><SectionHeading eyebrow="O que você recebe" title="Tudo para começar na mecânica de motos" />
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">{benefits.map(([Icon,title,text]) => <article key={title} className="bg-card p-6"><Icon className="mb-5 size-8 text-primary"/><h3 className="text-xl font-bold uppercase">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div>
      </div>
    </section>

    <section className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-5 md:px-8"><SectionHeading eyebrow="Conteúdo da formação" title="O que você vai aprender" text="Uma base prática para entender os sistemas de uma motocicleta e os serviços realizados no dia a dia de uma oficina." />
      <div className="grid gap-4 md:grid-cols-3">{modules.map(([Icon,title,text],i) => <article key={title} className="group rounded-lg border border-border bg-card p-6 transition hover:border-primary/60 hover:shadow-lg"><span className="mb-7 flex items-center justify-between"><Icon className="size-7 text-primary"/><b className="font-display text-3xl text-muted">0{i+1}</b></span><h3 className="text-xl font-bold uppercase">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></article>)}</div>
      <p className="mx-auto mt-8 max-w-2xl text-center font-semibold">Tudo explicado em videoaulas organizadas, com linguagem simples e passo a passo.</p>
    </div></section>

    <section className="bg-muted py-16 md:py-24"><div className="mx-auto max-w-7xl px-5 md:px-8"><SectionHeading eyebrow="Material de apoio" title="Materiais para estudar e consultar" text="Guias, manuais e checklists ilustrados para complementar suas aulas." />
      <div className="grid gap-3 md:grid-cols-3">{support.map((item) => <div key={item} className="flex items-start gap-3 rounded-md border border-border bg-card p-4 text-sm font-bold"><Check className="mt-0.5 size-5 shrink-0 text-primary" />{item}</div>)}</div>
    </div></section>

    <section className="overflow-hidden bg-surface-dark py-16 text-surface-dark-foreground md:py-24"><div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 md:px-8">
      <div><p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-primary">Plataforma</p><h2 className="text-4xl font-extrabold uppercase md:text-5xl">Estude no seu ritmo, de onde estiver</h2><p className="mt-5 leading-7 text-steel">Aulas organizadas por módulos, progresso salvo e materiais para consultar pelo celular, tablet ou computador.</p>
        <div className="mt-8 flex gap-6"><span className="flex items-center gap-2 text-sm"><Smartphone className="text-primary"/> Celular</span><span className="flex items-center gap-2 text-sm"><TabletSmartphone className="text-primary"/> Tablet</span><span className="flex items-center gap-2 text-sm"><Laptop className="text-primary"/> Computador</span></div>
      </div>
      <div className="divide-y divide-primary/20 rounded-lg border border-primary/20 bg-surface-dark-soft p-2">{lessons.map((lesson) => <div key={lesson} className="flex items-center gap-3 px-4 py-3 text-sm"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/15"><Play className="size-3 text-primary"/></span>{lesson}</div>)}</div>
    </div></section>

    <section className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-5 md:px-8"><SectionHeading eyebrow="Exclusivo do Plano Profissional" title="10 bônus para complementar sua formação" text="Materiais práticos para estudar, consultar e acompanhar sua evolução." />
      <div className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-border bg-card shadow-xl">
        <img src="/bonus-mecanica-motos.webp" alt="10 bônus exclusivos da Formação Mecânico de Motos" className="block w-full" loading="lazy" />
      </div>
    </div></section>

    <section id="planos" className="scroll-mt-4 bg-muted py-16 md:py-24"><div className="mx-auto max-w-5xl px-5 md:px-8"><SectionHeading eyebrow="Planos" title="Escolha como quer começar" text="Dois caminhos para iniciar hoje mesmo." />
      <div className="grid items-stretch gap-6 md:grid-cols-2">
        <article className="flex flex-col rounded-lg border border-border bg-card p-7"><p className="text-sm font-bold text-muted-foreground">Para quem quer começar</p><h3 className="mt-1 text-3xl font-extrabold uppercase">Plano Básico</h3><p className="my-7 font-display text-5xl font-extrabold">R$ 10,00</p><ul className="mb-8 space-y-3">{["80+ aulas em vídeo","Conteúdo 100% online","Acesso vitalício"].map(x=><li className="flex gap-2 text-sm" key={x}><Check className="size-5 text-primary"/>{x}</li>)}</ul><Button variant="salesOutline" size="xl" className="mt-auto">Começar pelo básico</Button></article>
        <article className="relative flex flex-col rounded-lg border-2 border-primary bg-card p-7 shadow-xl"><span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1.5 text-xs font-extrabold uppercase text-primary-foreground">Mais vendido</span><p className="text-sm font-bold text-muted-foreground">Formação completa + materiais</p><h3 className="mt-1 text-3xl font-extrabold uppercase">Plano Profissional</h3><p className="my-7 font-display text-5xl font-extrabold">R$ 27,90</p><ul className="mb-6 space-y-3">{["80+ aulas em vídeo","Certificado de conclusão","Acesso vitalício","Materiais de apoio","10 bônus exclusivos"].map(x=><li className="flex gap-2 text-sm font-semibold" key={x}><Check className="size-5 text-primary"/>{x}</li>)}</ul><div className="mb-6 rounded-md bg-muted p-4 text-sm leading-6"><strong>Por apenas R$ 17,90 a mais</strong> você leva certificado, materiais, guias e todos os bônus.</div><Button variant="sales" size="xl">Quero o Plano Profissional</Button></article>
      </div><TrustLine />
    </div></section>

    <section className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-5 md:px-8"><SectionHeading eyebrow="Para quem é" title="Comece do seu ponto de partida" text="Uma formação pensada para diferentes objetivos na mecânica de motocicletas." />
      <div className="grid gap-4 md:grid-cols-3">{audiences.map(({ Icon,title,text })=><article key={title} className="border-l-4 border-primary bg-muted p-6"><Icon className="mb-4 size-7 text-primary"/><h3 className="text-xl font-bold uppercase">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{text}</p></article>)}</div>
    </div></section>

    <section className="bg-surface-dark py-16 text-surface-dark-foreground md:py-24"><div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:px-8"><div><p className="text-xs font-extrabold uppercase tracking-widest text-primary">Uma habilidade profissional</p><h2 className="mt-3 text-4xl font-extrabold uppercase md:text-5xl">Motos estão em todos os lugares</h2><p className="mt-5 leading-7 text-steel">Utilizadas para trabalho, transporte e lazer. Desenvolva uma base prática para entender manutenção, identificar defeitos e começar a buscar oportunidades.</p><div className="mt-7"><Cta /></div></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-lg border border-primary/20 bg-surface-dark-soft p-6"><Award className="mb-5 size-9 text-primary"/><h3 className="text-2xl font-bold uppercase">Certificado digital</h3><p className="mt-3 text-sm leading-6 text-steel">Incluído no Plano Profissional após a conclusão da formação.</p></div><div className="rounded-lg border border-primary/20 bg-surface-dark-soft p-6"><ShieldCheck className="mb-5 size-9 text-accent"/><h3 className="text-2xl font-bold uppercase">7 dias de garantia</h3><p className="mt-3 text-sm leading-6 text-steel">Conheça a plataforma e avalie a formação dentro do período de garantia.</p></div></div></div></section>

    <section className="py-16 md:py-24"><div className="mx-auto grid max-w-5xl items-center gap-10 px-5 md:grid-cols-[0.7fr_1.3fr] md:px-8"><div className="grid aspect-square place-items-center rounded-lg bg-secondary"><Wrench className="size-24 text-primary"/></div><div><p className="text-xs font-extrabold uppercase tracking-widest text-primary">Conheça seu instrutor</p><h2 className="mt-2 text-5xl font-extrabold uppercase">João Emanuel</h2><p className="mt-5 leading-7 text-muted-foreground">Profissional da área de mecânica com experiência prática em manutenção e diagnóstico. Apresenta os conteúdos de maneira simples, direta e passo a passo, especialmente para quem começa do zero.</p><div className="mt-6 flex flex-wrap gap-3">{["Experiência prática","Conteúdo objetivo","Ensino passo a passo"].map(x=><span key={x} className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-xs font-bold"><Check className="size-4 text-primary"/>{x}</span>)}</div></div></div></section>

    <section className="bg-muted py-16 md:py-24"><div className="mx-auto max-w-3xl px-5 md:px-8"><SectionHeading eyebrow="Dúvidas" title="Perguntas frequentes" /><Accordion type="single" collapsible className="rounded-lg border border-border bg-card px-6">{faqs.map(([q,a],i)=><AccordionItem value={`q-${i}`} key={q}><AccordionTrigger className="text-base font-bold">{q}</AccordionTrigger><AccordionContent className="leading-6 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>

    <section className="bg-primary py-16 text-center text-primary-foreground md:py-20"><div className="mx-auto max-w-3xl px-5"><Clock3 className="mx-auto mb-5 size-10"/><h2 className="text-4xl font-extrabold uppercase md:text-5xl">Comece hoje a desenvolver uma nova habilidade</h2><p className="mx-auto mt-4 max-w-xl">Acesse a Formação Mecânico de Motos e comece suas primeiras aulas.</p><div className="mt-7"><Button size="xl" variant="secondary" asChild><a href="#planos">Quero começar agora<ChevronRight /></a></Button></div><p className="mt-4 text-xs font-semibold">Acesso imediato • Acesso vitalício • Garantia de 7 dias</p></div></section>
    <footer className="bg-surface-dark px-5 py-8 text-center text-xs text-steel">© 2026 Formação Mecânico de Motos. Todos os direitos reservados.</footer>
  </main>;
}