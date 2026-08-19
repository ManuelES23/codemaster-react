import "@testing-library/jest-dom/vitest";
import { vi, beforeEach } from "vitest";

// Fires isIntersecting:true immediately on observe(), same as before — most
// tests just need "does it reveal at all" and rely on that. It also now
// tracks its live observe() calls, so a test can reach back in later and
// simulate the target leaving (or re-entering) the viewport — see
// dispararInterseccion below — without needing to swap the whole
// IntersectionObserver constructor (framer-motion caches one instance per
// viewport-options combination and reuses it across components, so a
// per-test constructor swap after the first render in a file never reaches
// anything real).
class IntersectionObserverStub {
  static registros = [];

  constructor(callback) {
    this.callback = callback;
  }
  observe(target) {
    IntersectionObserverStub.registros.push({ target, observer: this });
    this.callback([{ target, isIntersecting: true, intersectionRatio: 1 }], this);
  }
  unobserve(target) {
    IntersectionObserverStub.registros = IntersectionObserverStub.registros.filter(
      (registro) => !(registro.observer === this && (target === undefined || registro.target === target))
    );
  }
  disconnect() {
    IntersectionObserverStub.registros = IntersectionObserverStub.registros.filter(
      (registro) => registro.observer !== this
    );
  }
  takeRecords() {
    return [];
  }
}

globalThis.IntersectionObserver = IntersectionObserverStub;

// Simulates `target` entering or leaving the viewport, for tests that need
// to verify behavior beyond the initial auto-fired isIntersecting:true —
// e.g. that a `once={false}` Reveal reverses on exit, or that a `once=true`
// one has genuinely unobserved (and so no longer receives this at all) once
// it's been triggered. Silently does nothing if `target` isn't currently
// observed by anything, which is itself meaningful: a real unobserve() call
// removes it from `registros`, so this can't reach a component that
// correctly stopped listening.
export function dispararInterseccion(target, isIntersecting) {
  IntersectionObserverStub.registros
    .filter((registro) => registro.target === target)
    .forEach((registro) =>
      registro.observer.callback(
        [{ target, isIntersecting, intersectionRatio: isIntersecting ? 1 : 0 }],
        registro.observer
      )
    );
}

let reducedMotion = false;
const listeners = new Map();

function matchesQuery(query) {
  return query.includes("prefers-reduced-motion") ? reducedMotion : false;
}

function notifyListeners() {
  listeners.forEach((callbacks, query) => {
    const event = { matches: matchesQuery(query), media: query };
    callbacks.forEach((callback) => callback(event));
  });
}

export function setReducedMotion(enabled) {
  reducedMotion = enabled;
  notifyListeners();
}

window.matchMedia = vi.fn().mockImplementation((query) => {
  const register = (callback) => {
    if (!listeners.has(query)) listeners.set(query, new Set());
    listeners.get(query).add(callback);
  };
  const unregister = (callback) => listeners.get(query)?.delete(callback);

  return {
    get matches() {
      return matchesQuery(query);
    },
    media: query,
    onchange: null,
    addEventListener: (_type, callback) => register(callback),
    removeEventListener: (_type, callback) => unregister(callback),
    addListener: register,
    removeListener: unregister,
    dispatchEvent: vi.fn(),
  };
});

beforeEach(() => {
  setReducedMotion(false);
  IntersectionObserverStub.registros = [];
});
