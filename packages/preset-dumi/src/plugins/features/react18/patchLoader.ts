/**
 * loader for path @umijs/renderer-react/dist/index.esm.js to workaround support react18
 */
export default function loader (raw: string) {
  if (this.resourcePath.includes('@umijs/renderer-react')) {
    // patch import
    raw = raw.replace("{ hydrate, render } from 'react-dom'", "{ createRoot, hydrateRoot } from 'react-dom/client'");

    // patch render
    raw = raw.replace('render(rootContainer, rootElement, callback)', 'createRoot(rootElement).render(rootContainer)');

    // patch hydrate (2 places)
    [0,1].forEach(() => {
      raw = raw.replace('hydrate(rootContainer, rootElement, callback)', 'hydrateRoot(rootElement, rootContainer)');
    });
  }

  return raw;
}
