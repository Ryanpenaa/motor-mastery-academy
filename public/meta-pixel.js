/* Meta Pixel: explicit funnel events only. No form scraping or invented lead data. */
(() => {
  const w = window;
  if (w.__motoMetaPixel || location.pathname !== "/") return;
  if (navigator.globalPrivacyControl || navigator.doNotTrack === "1") return;
  w.__motoMetaPixel = true;
  const pixelId = "1414444593913961";
  if (!w.fbq) {
    const fbq = function (...args) {
      if (fbq.callMethod) fbq.callMethod.apply(fbq, args);
      else fbq.queue.push(args);
    };
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    w.fbq = fbq;
    w._fbq = fbq;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }
  // Disable inferred button events so opening an offer cannot become checkout.
  w.fbq("set", "autoConfig", false, pixelId);
  w.fbq("init", pixelId);
  const product = { content_name: "Formação Mecânico de Motos", content_category: "Curso online", content_type: "product", content_ids: ["formacao-mecanica-motos"] };
  function send(name, data = {}, custom = false) {
    try {
      w.fbq(custom ? "trackSingleCustom" : "trackSingle", pixelId, name, { ...product, ...data });
    } catch { /* Analytics must never prevent a checkout. */ }
  }
  send("PageView");
  send("ViewContent");
  const offers = {
    "/VCCL1O8SD9G1": { value: 10, plan: "basico", source: "popup_basic" },
    "/VCCL1O8SD9G2": { value: 18.9, plan: "completo_oferta", source: "popup_upgrade" },
    "/VCCL1O8SD9G3": { value: 27.9, plan: "profissional", source: "plan_card" },
  };
  function onClick(event) {
    if (event.defaultPrevented || (event.type === "auxclick" && event.button !== 1)) return;
    const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!link) return;
    const url = new URL(link.href, location.href);
    const offer = url.hostname === "checkout.kitpro.store" ? offers[url.pathname] : null;
    if (offer) {
      send("InitiateCheckout", {
        value: offer.value, currency: "BRL", num_items: 1,
        content_ids: [offer.plan],
        contents: [{ id: offer.plan, quantity: 1, item_price: offer.value }],
        plan: offer.plan, checkout_source: offer.source,
      });
      // Give the browser pixel time to dispatch; never wait on Meta's availability.
      if (event.type === "click" && event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey && (!link.target || link.target === "_self")) {
        event.preventDefault();
        w.setTimeout(() => location.assign(link.href), 300);
      }
    } else if (url.origin === location.origin && url.hash === "#planos") {
      send("PlansCTA", {}, true);
    }
  }
  document.addEventListener("click", onClick);
  document.addEventListener("auxclick", onClick);
  w.addEventListener("moto:offer", event => {
    send(event.detail.open ? "OfferOpened" : "OfferClosed", { offered_value: 18.9, currency: "BRL" }, true);
  });
  const sectionsSeen = new Set();
  if ("IntersectionObserver" in w) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const section = entry.target.dataset.metaSection;
        if (entry.isIntersecting && section && !sectionsSeen.has(section)) {
          sectionsSeen.add(section);
          send("SectionViewed", { section }, true);
        }
      }
    }, { threshold: 0.15 });
    document.querySelectorAll("[data-meta-section]").forEach(node => observer.observe(node));
  }
  const scrollSeen = new Set();
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - w.innerHeight;
    if (max <= 0) return;
    const percent = Math.min(100, Math.round(w.scrollY / max * 100));
    for (const depth of [25, 50, 75, 90]) {
      if (percent >= depth && !scrollSeen.has(depth)) {
        scrollSeen.add(depth);
        send("ScrollDepth", { percent: depth }, true);
      }
    }
  };
  w.addEventListener("scroll", onScroll, { passive: true });
  let activeSeconds = 0;
  const timer = w.setInterval(() => {
    if (document.visibilityState !== "visible") return;
    activeSeconds += 1;
    if ([30, 60, 120].includes(activeSeconds)) send("EngagedVisit", { active_seconds: activeSeconds }, true);
    if (activeSeconds >= 120) w.clearInterval(timer);
  }, 1000);
})();
