import SwaggerParser from '@apidevtools/swagger-parser'
import path from 'path'
import fs from 'fs'
import API_REFS from '@/constants/apiRefs'

const getLocale = (fileUrl) => {
  const possibleLocale = new URL(fileUrl).pathname.split('/src/pages/')[1].split('/')[0];
  return ['en'].includes(possibleLocale) ? possibleLocale : 'es';
}

const getRouteWithLocale = (fileUrl) => {
  const locale = getLocale(fileUrl);
  const folder = new URL(fileUrl).pathname.split(`/src/pages/${locale === 'es' ? '' : locale + '/'}`)[1].split('/')[0];
  return path.join(folder, `${locale}.yaml`)
}

const dereference = async (currentFileUrl) => {
  const fileName = getRouteWithLocale(currentFileUrl);
  const filePath = path.join(process.cwd(), 'src', 'assets', 'apis', fileName)

  if (!fs.existsSync(filePath)) {
    throw new Error(`File with OpenAPI structure ${filePath} does not exist`)
  }
  const api = await SwaggerParser.dereference(filePath);

  return [api, fileName];
}

const getEndpoints = ($refs, api) => {
  return $refs.reduce((acc, apiRef) => {
      return { ...acc, [apiRef]: api.paths[apiRef] }
  }, {})
}
export const dereferenceOpenapi = async (currentFileUrl, $refs) => {
  const [api] = await dereference(currentFileUrl);
  return getEndpoints($refs, api);
}

export const dereferenceOpenapiCached = async (currentFileUrl, $refs) => {
    const pathname = getRouteWithLocale(currentFileUrl);
    const namespace = pathname.split('/')[0];
    const locale = getLocale(currentFileUrl);
    const api = API_REFS[namespace.toUpperCase() + '_' + locale.toUpperCase() + '_API'];
    return getEndpoints($refs, api);
}