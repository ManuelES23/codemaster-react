import { useEffect } from "react";

export const SITE_URL = "https://www.codemaster.com.mx";
export const SITE_NAME = "CodeMaster";
const DEFAULT_IMAGE = `${SITE_URL}/img/og-image.png`;

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(jsonLdString) {
  const id = "seo-jsonld";
  let el = document.getElementById(id);
  if (!jsonLdString) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = jsonLdString;
}

/**
 * Gestiona el <title>, meta description, canonical, Open Graph/Twitter y
 * JSON-LD de la página activa. Es una SPA sin SSR, así que estos tags parten
 * de los valores por defecto de index.html y este componente los reescribe
 * en el cliente para cada ruta — necesario para que cada página tenga su
 * propio title/description/canonical en lugar de heredar siempre los del
 * home (que es lo que pasaba antes: Google veía el mismo <title> y el mismo
 * canonical apuntando a "/" en todas las rutas).
 */
const Seo = ({ title, description, path = "", image, jsonLd, noIndex = false }) => {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : null;

  useEffect(() => {
    if (title) document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", noIndex ? "noindex, follow" : "index, follow");

    const url = `${SITE_URL}${path}`;
    setCanonical(url);

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image || DEFAULT_IMAGE);

    setMeta("property", "twitter:title", title);
    setMeta("property", "twitter:description", description);
    setMeta("property", "twitter:url", url);
    setMeta("property", "twitter:image", image || DEFAULT_IMAGE);

    setJsonLd(jsonLdString);

    return () => setJsonLd(null);
  }, [title, description, path, image, jsonLdString, noIndex]);

  return null;
};

export default Seo;
