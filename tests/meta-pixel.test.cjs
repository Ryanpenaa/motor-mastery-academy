const { readFileSync } = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const source = readFileSync("public/meta-pixel.js", "utf8");
function setup(privacy = false) {
  const events = {}, calls = [], timers = [], navigations = [];
  class Element { constructor(href) { this.href = href; this.target = ""; } closest() { return this; } }
  const document = { head: { appendChild() {} }, createElement: () => ({}), addEventListener: (key, fn) => events[key] = fn, querySelectorAll: () => [], documentElement: { scrollHeight: 2000 }, visibilityState: "visible" };
  const location = { pathname: "/", href: "https://example.com/", origin: "https://example.com", assign: url => navigations.push(url) };
  const window = { fbq: (...args) => calls.push(args), addEventListener: (key, fn) => events[key] = fn, setTimeout: fn => timers.push(fn), setInterval: fn => { events.timer = fn; return 1; }, clearInterval() {}, innerHeight: 1000, scrollY: 500 };
  const context = vm.createContext({ window, document, location, navigator: { globalPrivacyControl: privacy }, Element, URL, Set });
  vm.runInContext(source, context);
  return { calls, events, context, timers, navigations, Element };
}
const a = setup();
const ic = () => a.calls.filter(x => x[2] === "InitiateCheckout");
a.events["moto:offer"]({ detail: { open: true } });
a.events["moto:offer"]({ detail: { open: false } });
assert.equal(ic().length, 0, "Opening/closing popup must not fire IC");
for (const [suffix, value] of [["1", 10], ["2", 18.9], ["3", 27.9]]) {
  let prevented = false;
  a.events.click({ type: "click", button: 0, target: new a.Element("https://checkout.kitpro.store/VCCL1O8SD9G" + suffix), preventDefault() { prevented = true; } });
  assert.equal(ic().at(-1)[3].value, value);
  assert.equal(ic().at(-1)[3].currency, "BRL");
  assert.equal(prevented, true);
}
assert.equal(ic().length, 3);
a.events.click({ type: "click", button: 0, target: new a.Element("https://example.com/#planos") });
assert.equal(ic().length, 3);
a.events.click({ type: "click", button: 0, target: new a.Element("https://evil.example/VCCL1O8SD9G1") });
assert.equal(ic().length, 3);
a.timers.forEach(fn => fn());
assert.equal(a.navigations.length, 3);
vm.runInContext(source, a.context);
assert.equal(a.calls.filter(x => x[2] === "PageView").length, 1);
a.events.scroll(); a.events.scroll();
assert.equal(a.calls.filter(x => x[2] === "ScrollDepth").length, 2);
assert.equal(setup(true).calls.length, 0);
console.log("PASS: popup has no IC; three checkouts each send one IC with correct BRL price; CTA does not send IC; navigation preserved; initialization/scroll deduplicated; privacy preference respected.");


