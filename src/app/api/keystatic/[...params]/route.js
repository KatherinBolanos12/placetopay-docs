import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../../keystatic.config.mjs';

export const { POST, GET } = makeRouteHandler({
  config,
});
