import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type BasicPlanOfferProps = {
  basicCheckoutUrl: string;
  completeCheckoutUrl: string;
};

export function BasicPlanOffer({ basicCheckoutUrl, completeCheckoutUrl }: BasicPlanOfferProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="salesOutline" size="xl" className="mt-auto">
          Começar pelo básico
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-lg overflow-y-auto rounded-2xl border-primary/30 p-6 sm:p-8">
        <div className="text-center">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-primary">Uma oferta para você</p>
          <DialogTitle className="font-display text-3xl font-extrabold uppercase leading-tight sm:text-4xl">
            Leve o kit completo por R$ 18,90
          </DialogTitle>
          <DialogDescription className="mt-3 text-base leading-6">
            Por mais R$ 8,90 em relação ao Básico, você recebe todos os benefícios do Plano Profissional.
          </DialogDescription>
        </div>
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
          <p className="text-center text-sm text-muted-foreground">Valor total da oferta</p>
          <p className="mt-1 text-center font-display text-5xl font-extrabold text-foreground">R$ 18,90</p>
          <ul className="mt-5 space-y-3">
            {["80+ aulas em vídeo", "Acesso vitalício", "Certificado de conclusão", "Materiais de apoio", "10 bônus exclusivos"].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm font-semibold">
                <Check className="size-5 shrink-0 text-primary" aria-hidden="true" />{item}
              </li>
            ))}
          </ul>
        </div>
        <Button variant="sales" size="xl" className="h-auto min-h-14 w-full whitespace-normal py-3 text-center" asChild>
          <a href={completeCheckoutUrl}>Quero o kit completo por R$ 18,90</a>
        </Button>
        <a href={basicCheckoutUrl} className="rounded-md py-2 text-center text-sm font-semibold text-muted-foreground underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
          Continuar com o Básico por R$ 10,00
        </a>
        <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="size-4" aria-hidden="true" />Garantia de 7 dias
        </p>
      </DialogContent>
    </Dialog>
  );
}
