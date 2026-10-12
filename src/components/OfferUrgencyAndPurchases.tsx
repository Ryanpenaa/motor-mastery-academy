import { useEffect, useState } from "react";
import { Clock3, CheckCircle2, X } from "lucide-react";

const DURATION = 15 * 60 * 1000;
const STORAGE_KEY = "moto_offer_countdown_start_v1";

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
  const [today, setToday] = useState("");
  const [purchase, setPurchase] = useState<VerifiedPurchase | null>(null);
  const [closed, setClosed] = useState(false);
  const [now, setNow] = useState(0);

  useEffect(() => {
    const update = () => {
      setRemaining(getRemaining());
      setToday(new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" }).format(new Date()));
      setNow(Date.now());
    };
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onVerified = (event: Event) => {
      const data = (event as CustomEvent<VerifiedPurchase>).detail;
      if (!data || typeof data.name !== "string" || typeof data.plan !== "string" || typeof data.purchasedAt !== "string") return;
      const timestamp = Date.parse(data.purchasedAt);
      if (!Number.isFinite(timestamp) || timestamp > Date.now() || Date.now() - timestamp > 24 * 60 * 60 * 1000) return;
      const name = data.name.trim().split(/\s+/)[0]?.slice(0, 24);
      if (!name || !["Básico", "Profissional"].includes(data.plan)) return;
      setPurchase({ name, plan: data.plan, purchasedAt: data.purchasedAt });
      setClosed(false);
    };
    window.addEventListener("moto:verified-purchase", onVerified);
    return () => window.removeEventListener("moto:verified-purchase", onVerified);
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
          <span className="uppercase tracking-wide">Oferta de hoje {today ? `• ${today}` : ""}</span>
          <span className="hidden sm:inline" aria-hidden="true">|</span>
          <span className="flex items-center gap-1.5"><Clock3 className="size-4" aria-hidden="true" />
            {remaining > 0 ? "Seu tempo para aproveitar:" : "Tempo da oferta encerrado"}
          </span>
          {remaining > 0 && <span className="rounded-md bg-slate-950 px-2.5 py-1 font-mono text-base font-black tabular-nums text-white" role="timer" aria-label={`${minutes} minutos e ${seconds} segundos restantes`}>{minutes}:{seconds}</span>}
        </div>
      </div>
      {purchase && !closed && (
        <aside aria-live="polite" className="pointer-events-none fixed right-3 top-16 z-50 w-[min(310px,calc(100vw-24px))] sm:right-5">
          <div className="pointer-events-auto flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-white p-3 text-slate-900 shadow-xl">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" aria-hidden="true" />
            <div className="min-w-0 flex-1 text-xs leading-5">
              <p className="font-extrabold">{purchase.name} adquiriu o Plano {purchase.plan}</p>
              <p className="text-slate-500">{timeAgo(purchase.purchasedAt, now)}</p>
            </div>
            <button type="button" aria-label="Fechar aviso de compra" onClick={() => setClosed(true)} className="rounded p-0.5 text-slate-500 hover:text-slate-900"><X className="size-4" /></button>
          </div>
        </aside>
      )}
    </>
  );
}
