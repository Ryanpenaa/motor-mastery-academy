export type TrackingSession = {
  tracking_id: string;
  visitor_id?: string;
  landing_ts: number;
  fbclid: string | null;
  fbp: string | null;
  fbc: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  user_agent: string;
  landing_url: string;
  referrer: string | null;
};

const STORAGE_KEY = "moto_tracking_session";
const TRACKING_ENDPOINT =
  "https://xahydzcmpikbioeyvwst.supabase.co/functions/v1/tracking-start";
const OFFER_ID = "mecanica_motos";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const prefix = `${name}=`;
  const item = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith(prefix));

  if (!item) return null;

  try {
    return decodeURIComponent(item.slice(prefix.length));
  } catch {
    return item.slice(prefix.length);
  }
}

function randomPart() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID().replace(/-/g, "").slice(0, 16);
  }

  return Math.random().toString(36).slice(2, 18);
}

function createTrackingId() {
  return `trk_${Date.now().toString(36)}_${randomPart()}`;
}

function getQueryValue(params: URLSearchParams, key: string) {
  const value = params.get(key);
  return value && value.trim() ? value.trim() : null;
}

const ATTRIBUTION_WINDOW_MS = 30 * 24 * 60 * 60 * 1000;
const VISITOR_STORAGE_KEY = STORAGE_KEY + "_visitor";

function readStoredSession(): TrackingSession | null {
  if (typeof window === "undefined") return null;
  try {
    // Migrate pre-existing tab-only sessions without losing their UTMs.
    const raw =
      window.localStorage.getItem(STORAGE_KEY) ??
      window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as TrackingSession;
    if (
      !/^trk_[a-z0-9_]+$/i.test(session.tracking_id ?? "") ||
      !Number.isFinite(session.landing_ts) ||
      session.landing_ts > Date.now() + 600000 ||
      Date.now() - session.landing_ts > ATTRIBUTION_WINDOW_MS
    ) {
      return null;
    }
    window.localStorage.setItem(STORAGE_KEY, raw);
    return session;
  } catch {
    return null;
  }
}

function readVisitorId(previous: TrackingSession | null): string {
  let visitorId: string | null = null;
  try {
    visitorId = window.localStorage.getItem(VISITOR_STORAGE_KEY);
  } catch {
    // Storage may be disabled by the browser.
  }
  const candidate = visitorId ?? previous?.visitor_id ?? null;
  if (candidate && /^vis_[a-z0-9_]+$/i.test(candidate)) return candidate;
  const generated = "vis_" + randomPart() + "_" + randomPart();
  try {
    window.localStorage.setItem(VISITOR_STORAGE_KEY, generated);
  } catch {
    // Checkout still works without persistent storage.
  }
  return generated;
}

function writeStoredSession(session: TrackingSession) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      // Attribution should never block checkout.
    }
  }
}

export function initializeTracking(): TrackingSession | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const incomingFbclid = getQueryValue(params, "fbclid");
  const previous = readStoredSession();
  const visitorId = readVisitorId(previous);
  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ] as const;
  const isChangedCampaign = utmKeys.some((key) => {
    const incoming = getQueryValue(params, key);
    return incoming !== null && incoming !== previous?.[key];
  });
  const isNewAdClick =
    Boolean(incomingFbclid) && incomingFbclid !== previous?.fbclid;
  // New campaign: separate touch. Direct return: restore last touch.
  const base = isNewAdClick || isChangedCampaign ? null : previous;
  const now = Date.now();
  const fbclid = incomingFbclid ?? base?.fbclid ?? null;
  const pixelFbc = readCookie("_fbc");
  const fbcForClick =
    pixelFbc && fbclid && pixelFbc.endsWith("." + fbclid)
      ? pixelFbc
      : fbclid && /^[A-Za-z0-9._-]{8,2048}$/.test(fbclid)
        ? "fb.1." + (base?.landing_ts ?? now) + "." + fbclid
        : base?.fbc ?? null;

  const session: TrackingSession = {
    tracking_id: base?.tracking_id ?? createTrackingId(),
    visitor_id: visitorId,
    landing_ts: base?.landing_ts ?? now,
    fbclid,
    fbp: readCookie("_fbp") ?? base?.fbp ?? null,
    fbc: fbcForClick,
    utm_source: getQueryValue(params, "utm_source") ?? base?.utm_source ?? null,
    utm_medium: getQueryValue(params, "utm_medium") ?? base?.utm_medium ?? null,
    utm_campaign: getQueryValue(params, "utm_campaign") ?? base?.utm_campaign ?? null,
    utm_content: getQueryValue(params, "utm_content") ?? base?.utm_content ?? null,
    utm_term: getQueryValue(params, "utm_term") ?? base?.utm_term ?? null,
    user_agent: window.navigator.userAgent,
    landing_url: base?.landing_url ?? window.location.href,
    referrer: base?.referrer ?? (document.referrer || null),
  };
  writeStoredSession(session);
  return session;
}

export function persistTrackingSession(
  session: TrackingSession,
  options: { keepalive?: boolean } = {},
) {
  if (typeof window === "undefined") return;

  const body = JSON.stringify(session);

  if (options.keepalive && typeof navigator.sendBeacon === "function") {
    try {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(TRACKING_ENDPOINT, blob)) return;
    } catch {
      // Fall through to fetch.
    }
  }

  void fetch(TRACKING_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: options.keepalive ?? false,
  }).catch(() => {
    // Tracking must never affect storefront rendering or checkout navigation.
  });
}

export function captureAndPersistTracking(
  options: { keepalive?: boolean } = {},
): TrackingSession | null {
  const session = initializeTracking();
  if (session) persistTrackingSession(session, options);
  return session;
}

export function getTrackingSession(): TrackingSession | null {
  return initializeTracking();
}

export function buildVegaCheckoutUrl(baseUrl: string): string {
  if (typeof window === "undefined") return baseUrl;

  const session = getTrackingSession();
  if (!session) return baseUrl;

  // Persist the freshest _fbp/_fbc immediately before checkout navigation.
  persistTrackingSession(session, { keepalive: true });

  const checkoutUrl = new URL(baseUrl);
  checkoutUrl.searchParams.set("click_id", session.tracking_id);
  checkoutUrl.searchParams.set("offer_id", OFFER_ID);

  if (session.fbclid) {
    checkoutUrl.searchParams.set("fbclid", session.fbclid);
  }

  const utms = {
    utm_source: session.utm_source,
    utm_medium: session.utm_medium,
    utm_campaign: session.utm_campaign,
    utm_content: session.utm_content,
    utm_term: session.utm_term,
  };

  Object.entries(utms).forEach(([key, value]) => {
    if (value) checkoutUrl.searchParams.set(key, value);
  });

  return checkoutUrl.toString();
}
