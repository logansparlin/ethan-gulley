export default function resolveProductionUrl(document) {
  if (!document && !document.slug) return undefined
  const slug = document.slug?.current
  const baseURL = window.location.href.includes('localhost:3333') ? 'http://localhost:3000' : `https://ethan-gulley.vercel.app`

  if (!slug) return undefined;

  if (slug === '/') {
    return `${baseURL}/?preview=true`
  }

  return `${baseURL}/projects/${slug}/?preview=true`
}
