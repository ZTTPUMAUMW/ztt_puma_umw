import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {projectId, dataset} from './env'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'PUMA Website (' + dataset + ')',
  projectId,
  dataset,
  plugins: [structureTool({structure}), visionTool()],
  schema: {types: schemaTypes},
  document: {
    newDocumentOptions: (options) =>
      options.filter(
        (option) =>
          ![
            'contactPage',
            'siteSettings',
            'teamPage',
            'projectsPage',
            'publicationsPage',
            'modelsPage',
            'homePage',
            'recruitmentPage',
            'cooperationPage',
            'researchPage',
            'siteChrome',
          ].includes(option.templateId),
      ),
    actions: (actions, context) =>
      [
        'contactPage',
        'siteSettings',
        'teamPage',
        'projectsPage',
        'publicationsPage',
        'modelsPage',
        'homePage',
        'recruitmentPage',
        'cooperationPage',
        'researchPage',
        'siteChrome',
      ].includes(context.schemaType)
        ? actions.filter(
            (action) =>
              action.action && ['publish', 'discardChanges', 'restore'].includes(action.action),
          )
        : actions,
  },
})
