// next.config.js
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD
} = require('next/constants');

module.exports = phase => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isLocal = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isDev = PHASE_PRODUCTION_BUILD && process.env.ENV === 'DEV';
  // when `next build` or `npm run build` is used
  const isStaging = PHASE_PRODUCTION_BUILD && process.env.ENV === 'STG'
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.ENV === 'PROD'

  console.log(`isLocal:${isLocal} isDev:${isDev} isStaging:${isStaging} isProd:${isProd}`)

  let env = {};

  if(isProd) {
    env = require('./env/env.prod')
  } else if (isStaging) {
    env = require('./env/env.stg')
  } else if(isDev){
    env = require('./env/env.dev')
  } else {
    env = require('./env/env.local')
  }

  // next.config.js object
  return {env};
}
