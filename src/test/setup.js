import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

class IntersectionObserverStub {
  constructor(callback) {
    this.callback = callback;
  }
  observe(target) {
    this.callback([{ target, isIntersecting: true, intersectionRatio: 1 }], this);
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

globalThis.IntersectionObserver = IntersectionObserverStub;

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
});
