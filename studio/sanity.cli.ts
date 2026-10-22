import {defineCliConfig, getStudioEnvironmentVariables} from 'sanity/cli'

const env = getStudioEnvironmentVariables({
  envFile: {mode: process.env.SANITY_ACTIVE_ENV || process.env.NODE_ENV || 'development'},
})
const projectId = env.SANITY_STUDIO_PROJECT_ID
const dataset = env.SANITY_STUDIO_DATASET

if (!projectId || !dataset) {
  throw new Error(
    'Set the Studio project ID and dataset in studio/.env.local or the deployment environment.',
  )
}

export default defineCliConfig({
  api: {projectId, dataset},
  studioHost:
    env.SANITY_STUDIO_HOST ||
    (dataset === 'development'
      ? 'puma-development-s2jrzn3b'
      : dataset === 'production'
        ? 'puma-production-s2jrzn3b'
        : undefined),
  deployment: {
    appId:
      env.SANITY_STUDIO_APP_ID ||
      (dataset === 'development'
        ? 'z56voez80lfmqjks56f2j6wh'
        : dataset === 'production'
          ? 'erg9krbhxu3m52vv2plae6w3'
          : undefined),
    autoUpdates: true,
  },
})
