import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Award, Check, ChevronRight, Clock3, GraduationCap, Laptop, Play,
  ShieldCheck, Smartphone, Star, TabletSmartphone, Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BasicPlanOffer } from "@/components/BasicPlanOffer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import bonusExclusivosAsset from "@/assets/bonus-exclusivos-mecanicos-motos.png.asset.json";
import hero480Asset from "@/assets/performance/hero-480.webp.asset.json";
import hero800Asset from "@/assets/performance/hero-800.webp.asset.json";
import sample01Asset from "@/assets/performance/sample-01-480.webp.asset.json";
import sample02Asset from "@/assets/performance/sample-02-480.webp.asset.json";
import sample03Asset from "@/assets/performance/sample-03-480.webp.asset.json";
import sample04Asset from "@/assets/performance/sample-04-480.webp.asset.json";
import sample05Asset from "@/assets/performance/sample-05-480.webp.asset.json";
import sample06Asset from "@/assets/performance/sample-06-480.webp.asset.json";
import sample07Asset from "@/assets/performance/sample-07-480.webp.asset.json";
import sample08Asset from "@/assets/performance/sample-08-480.webp.asset.json";
import sample09Asset from "@/assets/performance/sample-09-480.webp.asset.json";
import sample10Asset from "@/assets/performance/sample-10-480.webp.asset.json";
import { buildVegaCheckoutUrl } from "@/lib/tracking";

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

const lessons = [
  "Aula 01 — Fundamentos da motocicleta", "Aula 08 — Funcionamento do motor", "Aula 15 — Desmontagem do motor",
  "Aula 23 — Sistema elétrico da moto", "Aula 31 — Injeção eletrônica", "Aula 39 — Sistema de freios",
  "Aula 46 — Suspensão dianteira", "Aula 55 — Embreagem e transmissão", "Aula 63 — Diagnóstico de defeitos",
  "Aula 74 — Revisão preventiva completa",
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

const courseSamples = [
  { title: "Motor de motos", src: sample01Asset.url },
  { title: "Sistema de alimentação", src: sample02Asset.url },
  { title: "Injeção eletrônica", src: sample03Asset.url },
  { title: "Sistema elétrico", src: sample04Asset.url },
  { title: "Sistema de freios", src: sample05Asset.url },
  { title: "Suspensão de motos", src: sample06Asset.url },
  { title: "Embreagem de motos", src: sample07Asset.url },
  { title: "Transmissão final", src: sample08Asset.url },
  { title: "Manutenção preventiva", src: sample09Asset.url },
  { title: "Diagnóstico de defeitos", src: sample10Asset.url },
] as const;

const CAROUSEL_PLACEHOLDER = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

function CourseSamplesCarousel() {
  const [viewportRef, carousel] = useEmblaCarousel({
    align: "center",
    loop: true,
    duration: 35,
  });
  const regionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [loadedIndexes, setLoadedIndexes] = useState<Set<number>>(
    () => new Set<number>(),
  );

  const markNearbySlidesForLoad = (index: number) => {
    setLoadedIndexes((current) => {
      const next = new Set(current);
      const total = courseSamples.length;
      next.add(index);
      next.add((index + 1) % total);
      next.add((index - 1 + total) % total);
      return next.size === current.size ? current : next;
    });
  };

  useEffect(() => {
    const node = regionRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry?.isIntersecting ?? false),
      { rootMargin: "200px 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!carousel) return;

    const syncActiveIndex = () => {
      const index = carousel.selectedScrollSnap();
      setActiveIndex(index);
      if (isVisible) markNearbySlidesForLoad(index);
    };

    syncActiveIndex();
    carousel.on("select", syncActiveIndex);
    carousel.on("reInit", syncActiveIndex);

    return () => {
      carousel.off("select", syncActiveIndex);
      carousel.off("reInit", syncActiveIndex);
    };
  }, [carousel, isVisible]);

  useEffect(() => {
    if (!carousel || !isVisible) return;

    markNearbySlidesForLoad(carousel.selectedScrollSnap());

    const interval = window.setInterval(() => {
      if (!document.hidden) carousel.scrollNext();
    }, 2000);

    return () => window.clearInterval(interval);
  }, [carousel, isVisible]);

  return (
    <div
      ref={regionRef}
      className="relative left-1/2 w-screen -translate-x-1/2 py-3"
      role="region"
      aria-roledescription="carrossel"
      aria-label="Conteúdo da formação"
    >
      <div ref={viewportRef} className="mx-auto max-w-[904px] overflow-hidden">
        <div className="flex touch-pan-y items-center gap-3">
          {courseSamples.map((sample, index) => (
            <article
              key={sample.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} de ${courseSamples.length}: ${sample.title}`}
              className={`min-w-0 shrink-0 grow-0 overflow-hidden rounded-2xl border bg-white transition-opacity duration-700 ${
                index === activeIndex
                  ? "border-primary/40 opacity-100"
                  : "border-border opacity-60"
              }`}
              style={{ flexBasis: "calc((100% - 24px) / 2.2)" }}
            >
              <img
                src={loadedIndexes.has(index) ? sample.src : CAROUSEL_PLACEHOLDER}
                alt={sample.title}
                className="block aspect-square h-auto w-full object-cover"
                loading="lazy"
                fetchPriority="low"
                decoding="async"
                width="480"
                height="480"
                draggable={false}
              />
            </article>
          ))}
        </div>
      </div>

      <p className="mt-4 text-center text-sm font-extrabold uppercase text-foreground">
        {courseSamples[activeIndex]?.title ?? courseSamples[0].title}
      </p>

      <div className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
        {courseSamples.map((sample, index) => (
          <span
            key={sample.src}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index ? "w-6 bg-primary" : "w-2 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

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
    <section data-meta-section="inicio" id="inicio" className="relative overflow-hidden bg-surface-dark text-surface-dark-foreground">
      <div className="absolute inset-x-0 bottom-0 h-px bg-primary/30" />
      <div className="mx-auto flex max-w-5xl flex-col items-center px-5 pb-14 pt-8 text-center md:min-h-[650px] md:px-8 md:py-16">
        <div className="relative z-10 flex w-full flex-col items-center">
          <p className="mb-5 inline-flex items-center gap-2 border-l-4 border-primary pl-3 text-xs font-extrabold uppercase tracking-widest text-primary">Formação profissionalizante online</p>
          <h1 className="max-w-4xl text-5xl font-extrabold uppercase leading-[0.94] md:text-7xl">Torne-se um <span className="text-primary">Mecânico de Motos</span>: do zero ao avançado</h1>
          <div className="relative mt-6 aspect-square w-full max-w-3xl">
            <div className="absolute inset-8 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
            <div className="absolute inset-x-[5%] bottom-0 h-[14%] rounded-xl border border-primary/20 bg-sky-50 shadow-lg" aria-hidden="true" />
            <img width="800" height="800" src={hero800Asset.url} srcSet={`${hero480Asset.url} 480w, ${hero800Asset.url} 800w`} sizes="(max-width: 520px) calc(100vw - 40px), (max-width: 768px) calc(100vw - 64px), 768px" alt="Formação Mecânico de Motos com aulas, certificado e materiais de apoio" className="relative z-10 size-full object-contain drop-shadow-2xl" loading="eager" fetchPriority="high" decoding="async" />
          </div>
          <p className="mt-6 max-w-2xl text-base leading-7 text-steel md:text-lg">Curso 100% online com mais de 80 videoaulas práticas sobre motor, elétrica, injeção, freios, suspensão e diagnóstico de motos.</p>
          <div className="mt-8"><Cta /></div>
          <TrustLine />
        </div>
      </div>
    </section>

    <section data-meta-section="conteudo" className="py-14 md:py-20"><div className="mx-auto max-w-7xl px-4 md:px-8"><SectionHeading eyebrow="Conteúdo da formação" title="O que você vai aprender" text="Uma base prática para entender os sistemas de uma motocicleta e os serviços realizados no dia a dia de uma oficina." />
      <CourseSamplesCarousel />
      <p className="mx-auto mt-8 max-w-2xl text-center font-semibold">Veja exemplos reais do conteúdo visual que acompanha sua formação.</p>
    </div></section>

    <section data-meta-section="plataforma" className="overflow-hidden bg-surface-dark py-16 text-surface-dark-foreground md:py-24"><div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 md:px-8">
      <div><p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-primary">Plataforma</p><h2 className="text-4xl font-extrabold uppercase md:text-5xl">Estude no seu ritmo, de onde estiver</h2><p className="mt-5 leading-7 text-steel">Aulas organizadas por módulos, progresso salvo e materiais para consultar pelo celular, tablet ou computador.</p>
        <div className="mt-8 flex gap-6"><span className="flex items-center gap-2 text-sm"><Smartphone className="text-primary"/> Celular</span><span className="flex items-center gap-2 text-sm"><TabletSmartphone className="text-primary"/> Tablet</span><span className="flex items-center gap-2 text-sm"><Laptop className="text-primary"/> Computador</span></div>
      </div>
      <div className="divide-y divide-primary/20 rounded-lg border border-primary/20 bg-surface-dark-soft p-2">{lessons.map((lesson) => <div key={lesson} className="flex items-center gap-3 px-4 py-3 text-sm"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/15"><Play className="size-3 text-primary"/></span>{lesson}</div>)}</div>
    </div></section>

    <section data-meta-section="bonus" className="py-14 md:py-20"><div className="mx-auto max-w-7xl px-4 md:px-8"><SectionHeading eyebrow="Exclusivo do Plano Profissional" title="10 bônus para complementar sua formação" text="Materiais práticos para estudar, consultar e acompanhar sua evolução." />
      <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-xl border border-border bg-card shadow-lg">
        <img
          src={bonusExclusivosAsset.url}
          alt="10 bônus exclusivos da Formação Mecânico de Motos"
          className="block h-auto w-full object-contain"
          loading="lazy"
          decoding="async"
          width="768"
          height="768"
        />
      </div>
    </div></section>

    <section data-meta-section="planos" id="planos" className="scroll-mt-4 bg-muted py-16 md:py-24"><div className="mx-auto max-w-5xl px-5 md:px-8"><SectionHeading eyebrow="Planos" title="Escolha como quer começar" text="Dois caminhos para iniciar hoje mesmo." />
      <div className="grid items-stretch gap-6 md:grid-cols-2">
        <article className="flex flex-col rounded-lg border border-border bg-card p-7"><p className="text-sm font-bold text-muted-foreground">Para quem quer começar</p><h3 className="mt-1 text-3xl font-extrabold uppercase">Plano Básico</h3><p className="my-7 font-display text-5xl font-extrabold">R$ 10,00</p><ul className="mb-8 space-y-3">{["80+ aulas em vídeo","Conteúdo 100% online","Acesso vitalício"].map(x=><li className="flex gap-2 text-sm" key={x}><Check className="size-5 text-primary"/>{x}</li>)}</ul><BasicPlanOffer basicCheckoutUrl="https://checkout.kitpro.store/VCCL1O8SD9G1" completeCheckoutUrl="https://checkout.kitpro.store/VCCL1O8SD9G2" /></article>
        <article className="relative flex flex-col rounded-lg border-2 border-primary bg-card p-7 shadow-xl"><span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1.5 text-xs font-extrabold uppercase text-primary-foreground">Mais vendido</span><p className="text-sm font-bold text-muted-foreground">Formação completa + materiais</p><h3 className="mt-1 text-3xl font-extrabold uppercase">Plano Profissional</h3><p className="my-7 font-display text-5xl font-extrabold">R$ 27,90</p><ul className="mb-6 space-y-3">{["80+ aulas em vídeo","Certificado de conclusão","Acesso vitalício","Materiais de apoio","10 bônus exclusivos"].map(x=><li className="flex gap-2 text-sm font-semibold" key={x}><Check className="size-5 text-primary"/>{x}</li>)}</ul><div className="mb-6 rounded-md bg-muted p-4 text-sm leading-6"><strong>Por apenas R$ 17,90 a mais</strong> você leva certificado, materiais, guias e todos os bônus.</div><Button variant="sales" size="xl" asChild><a href="https://checkout.kitpro.store/VCCL1O8SD9G3" onClick={(event) => { event.currentTarget.href = buildVegaCheckoutUrl("https://checkout.kitpro.store/VCCL1O8SD9G3"); }}>Quero o Plano Profissional</a></Button></article>
      </div><TrustLine />
    </div></section>

    <section data-meta-section="publico" className="py-16 md:py-24"><div className="mx-auto max-w-7xl px-5 md:px-8"><SectionHeading eyebrow="Para quem é" title="Comece do seu ponto de partida" text="Uma formação pensada para diferentes objetivos na mecânica de motocicletas." />
      <div className="grid gap-4 md:grid-cols-3">{audiences.map(({ Icon,title,text })=><article key={title} className="border-l-4 border-primary bg-muted p-6"><Icon className="mb-4 size-7 text-primary"/><h3 className="text-xl font-bold uppercase">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{text}</p></article>)}</div>
    </div></section>

    <section data-meta-section="garantia" className="bg-surface-dark py-16 text-surface-dark-foreground md:py-24"><div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:px-8"><div><p className="text-xs font-extrabold uppercase tracking-widest text-primary">Uma habilidade profissional</p><h2 className="mt-3 text-4xl font-extrabold uppercase md:text-5xl">Motos estão em todos os lugares</h2><p className="mt-5 leading-7 text-steel">Utilizadas para trabalho, transporte e lazer. Desenvolva uma base prática para entender manutenção, identificar defeitos e começar a buscar oportunidades.</p><div className="mt-7"><Cta /></div></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-lg border border-primary/20 bg-surface-dark-soft p-6 sm:col-span-2"><Award className="mb-5 size-9 text-primary"/><h3 className="text-2xl font-bold uppercase">Certificado digital</h3><p className="mt-3 text-sm leading-6 text-steel">Incluído no Plano Profissional após a conclusão da formação.</p></div><div className="relative overflow-hidden rounded-2xl border border-accent/40 bg-surface-dark-soft p-6 shadow-xl sm:col-span-2 sm:p-8">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <div className="relative grid size-28 shrink-0 place-items-center rounded-full border-2 border-accent/60 bg-accent/10">
              <ShieldCheck className="absolute inset-0 m-auto size-24 text-accent/20" aria-hidden="true" />
              <div className="relative"><span className="block font-display text-6xl font-extrabold leading-none text-accent">7</span><span className="text-xs font-extrabold uppercase tracking-widest text-accent">dias</span></div>
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-accent">Sua compra com mais tranquilidade</p>
              <h3 className="mt-2 text-3xl font-extrabold uppercase leading-tight">7 dias para conhecer a formação</h3>
              <p className="mt-3 text-sm leading-6 text-steel">Acesse a plataforma, explore as aulas e avalie se o conteúdo faz sentido para você. Você conta com 7 dias de garantia, conforme as condições apresentadas na compra.</p>
              <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-semibold sm:justify-start">
                {["Conheça as aulas", "Avalie com calma", "Decida com confiança"].map(item => <span key={item} className="inline-flex items-center gap-1.5"><Check className="size-4 text-accent" aria-hidden="true" />{item}</span>)}
              </div>
            </div>
          </div>
        </div></div></div></section>

    <section data-meta-section="instrutor" className="py-16 md:py-24"><div className="mx-auto grid max-w-5xl items-center gap-10 px-5 md:grid-cols-[0.7fr_1.3fr] md:px-8"><div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-secondary shadow-xl">
          <img src="/instrutor-mecanica-motos.webp" alt="Apresentador da formação em uma oficina de motocicletas" width="1122" height="1402" className="block h-auto w-full" loading="lazy" fetchPriority="low" decoding="async" />
        </div><div><p className="text-xs font-extrabold uppercase tracking-widest text-primary">Quem sou eu</p><h2 className="mt-2 text-5xl font-extrabold uppercase">João Emanuel</h2><p className="mt-5 leading-7 text-muted-foreground">Profissional da área de mecânica com experiência prática em manutenção e diagnóstico. Apresenta os conteúdos de maneira simples, direta e passo a passo, especialmente para quem começa do zero.</p><div className="mt-6 flex flex-wrap gap-3">{["Experiência prática","Conteúdo objetivo","Ensino passo a passo"].map(x=><span key={x} className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-xs font-bold"><Check className="size-4 text-primary"/>{x}</span>)}</div></div></div></section>

    <section data-meta-section="duvidas" className="bg-muted py-16 md:py-24"><div className="mx-auto max-w-3xl px-5 md:px-8"><SectionHeading eyebrow="Dúvidas" title="Perguntas frequentes" /><Accordion type="single" collapsible className="rounded-lg border border-border bg-card px-6">{faqs.map(([q,a],i)=><AccordionItem value={`q-${i}`} key={q}><AccordionTrigger className="text-base font-bold">{q}</AccordionTrigger><AccordionContent className="leading-6 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>

    <section data-meta-section="cta_final" className="bg-primary py-16 text-center text-primary-foreground md:py-20"><div className="mx-auto max-w-3xl px-5"><Clock3 className="mx-auto mb-5 size-10"/><h2 className="text-4xl font-extrabold uppercase md:text-5xl">Comece hoje a desenvolver uma nova habilidade</h2><p className="mx-auto mt-4 max-w-xl">Acesse a Formação Mecânico de Motos e comece suas primeiras aulas.</p><div className="mt-7"><Button size="xl" variant="secondary" asChild><a href="#planos">Quero começar agora<ChevronRight /></a></Button></div><p className="mt-4 text-xs font-semibold">Acesso imediato • Acesso vitalício • Garantia de 7 dias</p></div></section>
    <footer className="bg-surface-dark px-5 py-8 text-center text-xs text-steel">© 2026 Formação Mecânico de Motos. Todos os direitos reservados.</footer>
  </main>;
}