function requireValue(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Set ${name} in studio/.env.local or the deployment environment.`)
  }
  return value
}

export const projectId = requireValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  'SANITY_STUDIO_PROJECT_ID',
)
export const dataset = requireValue(process.env.SANITY_STUDIO_DATASET, 'SANITY_STUDIO_DATASET')
