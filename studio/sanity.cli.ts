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
  deployment: {autoUpdates: true},
})
