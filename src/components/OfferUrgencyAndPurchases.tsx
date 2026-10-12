import { useEffect, useState } from "react";
import { Clock3, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const DURATION = 15 * 60 * 1000;
const STORAGE_KEY = "moto_offer_countdown_start_v1";
const DEMO_NAMES = ["Ana", "Carlos", "Mariana", "Pedro", "Juliana", "Rafael", "Bruna", "Lucas"];
const DEMO_PLANS = ["Básico", "Profissional"];
const MONTHS = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
function formatOfferDate(date: Date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
}

function getRemaining() {
  if (typeof window === "undefined") return DURATION;
  try {
    const stored = Number(window.sessionStorage.getItem(STORAGE_KEY));
    const start = Number.isFinite(stored) && stored > 0 && stored <= Date.now()
      ? stored : Date.now();
    if (start !== stored) window.sessionStorage.setItem(STORAGE_KEY, String(start));
    return Math.max(0, DURATION - (Date.now() - start));
  } catch {
    return DURATION;
  }
}

export type VerifiedPurchase = {
  name: string;
  plan: string;
  purchasedAt: string;
};

// Somente eventos reais, recebidos de uma integracao de pedidos confirmados.
// Exemplo: window.dispatchEvent(new CustomEvent("moto:verified-purchase", {
//   detail: { name: "Ana", plan: "Profissional", purchasedAt: new Date().toISOString() }
// }));
function timeAgo(iso: string, now: number) {
  const elapsed = Math.max(0, Math.floor((now - new Date(iso).getTime()) / 60000));
  if (elapsed < 1) return "agora mesmo";
  if (elapsed === 1) return "há 1 minuto";
  if (elapsed < 60) return `há ${elapsed} minutos`;
  const hours = Math.floor(elapsed / 60);
  return hours === 1 ? "há 1 hora" : `há ${hours} horas`;
}

export function OfferUrgencyAndPurchases() {
  const [remaining, setRemaining] = useState(DURATION);
  const [today, setToday] = useState(() => formatOfferDate(new Date()));
  const [purchase, setPurchase] = useState<VerifiedPurchase | null>(null);
  const [closed, setClosed] = useState(false);
  const [now, setNow] = useState(0);

  useEffect(() => {
    const update = () => {
      setRemaining(getRemaining());
      setToday(formatOfferDate(new Date()));
      setNow(Date.now());
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let timeout: number;
    let lastName = "";
    const showIllustration = () => {
      const candidates = DEMO_NAMES.filter((name) => name !== lastName);
      const name = candidates[Math.floor(Math.random() * candidates.length)] ?? "Ana";
      lastName = name;
      const plan = DEMO_PLANS[Math.floor(Math.random() * DEMO_PLANS.length)] ?? "Básico";
      setPurchase({ name, plan, purchasedAt: new Date(Date.now() - (2 + Math.floor(Math.random() * 12)) * 60000).toISOString() });
      setClosed(false);
      timeout = window.setTimeout(showIllustration, 17000 + Math.floor(Math.random() * 15000));
    };
    timeout = window.setTimeout(showIllustration, 7000);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!purchase) return;
    const timeout = window.setTimeout(() => setPurchase(null), 6500);
    return () => window.clearTimeout(timeout);
  }, [purchase]);

  const minutes = String(Math.floor(remaining / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0");

  return (
    <>
      <div className="relative z-20 border-b border-amber-400/30 bg-amber-400 px-3 py-2.5 text-center text-slate-950">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs font-extrabold sm:text-sm">
          <span className="uppercase tracking-wide font-black" style={{ color: "#dc2626", fontWeight: 900 }}>SÓ HOJE {today}</span>
          
          <Clock3 className="size-4 text-red-600" aria-hidden="true" />
          {remaining > 0 && <span className="rounded-md bg-slate-950 px-2.5 py-1 font-mono text-base font-black tabular-nums text-white" role="timer" aria-label={`${minutes} minutos e ${seconds} segundos restantes`}>{minutes}:{seconds}</span>}
        </div>
      </div>
      {purchase && !closed && (
        <aside aria-live="polite" aria-label="Exemplo ilustrativo de compra" className="pointer-events-none fixed right-3 top-16 z-50 w-[min(238px,calc(100vw-24px))] sm:right-5">
          <div className="pointer-events-auto flex items-start gap-1 rounded-md border border-border bg-card px-2.5 py-2 text-card-foreground shadow-sm">
            <div className="min-w-0 flex-1 text-xs leading-4">
              <p className="font-bold">{purchase.name} · Plano {purchase.plan}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{timeAgo(purchase.purchasedAt, now)} · Exemplo ilustrativo</p>
            </div>
            <Button type="button" variant="ghost" size="icon" aria-label="Fechar aviso de compra" title="Fechar aviso" onClick={() => setClosed(true)} className="size-5 shrink-0 text-muted-foreground"><X className="size-3" /></Button>
          </div>
        </aside>
      )}
    </>
  );
}
