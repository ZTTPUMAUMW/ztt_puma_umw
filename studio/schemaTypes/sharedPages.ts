import {defineType, defineField, defineArrayMember, type FieldDefinition} from 'sanity'
import {researchTypes, researchMediaFields} from './researchMedia'
import seeds from '../sharedInitialValues.json'
const localized = (name: string, title: string) =>
  defineField({name, title, type: 'localizedText', validation: (rule) => rule.required()})
const routes = [
  '/',
  '/team',
  '/projects',
  '/publications',
  '/models',
  '/research',
  '/recruitment',
  '/cooperation',
  '/contact',
]
const link = defineType({
  name: 'websiteLink',
  title: 'Website link',
  type: 'object',
  fields: [
    localized('label', 'Label'),
    defineField({
      name: 'route',
      title: 'Internal page (leave blank for an external link)',
      type: 'string',
      options: {list: routes},
    }),
    defineField({
      name: 'url',
      title: 'External HTTPS URL (both languages)',
      type: 'localizedText',
      hidden: ({parent}) => Boolean(parent?.route),
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      const v = value as {route?: string; url?: {pl?: string; en?: string}} | undefined
      if (v?.route) return routes.includes(v.route) ? true : 'Choose a known website page.'
      try {
        return [v?.url?.pl, v?.url?.en].every((s) => {
          const u = new URL(s || '')
          return u.protocol === 'https:' && !u.username && !u.password
        })
          ? true
          : 'Enter HTTPS links in both languages.'
      } catch {
        return 'Enter HTTPS links in both languages.'
      }
    }),
  preview: {select: {title: 'label.pl', subtitle: 'route'}},
})
const copyFields = (copy: Record<string, unknown>): FieldDefinition[] =>
  Object.keys(copy).map((k) => localized(k, k.replace(/([A-Z])/g, ' $1')))
const image = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'image',
    options: {hotspot: true, accept: 'image/png,image/jpeg,image/webp,image/avif'},
    description: 'Optional replacement for the original website logo.',
  })
const array = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [defineArrayMember({type: 'websiteLink'})],
    initialValue: seeds.shell[name as 'header'],
    validation: (rule) => rule.max(30),
  })
const shell = defineType({
  name: 'siteChrome',
  title: 'Navigation and branding',
  type: 'document',
  initialValue: seeds.shell,
  fields: [
    image('logo', 'P.U.M.A. logo'),
    image('universityLogo', 'University logo'),
    localized('universityUrl', 'University logo HTTPS link'),
    array('header', 'Main menu — drag to reorder'),
    array('footerSite', 'Footer website links'),
    array('footerContact', 'Footer contact links'),
    array('externalLinks', 'Footer external links'),
    defineField({
      name: 'copy',
      title: 'Bilingual headings and accessibility labels',
      type: 'object',
      fields: copyFields(seeds.shell.copy),
    }),
  ],
  preview: {prepare: () => ({title: 'Navigation and branding'})},
})
const clip = defineType({
  name: 'clipPlaceholder',
  title: 'Video placeholder',
  type: 'object',
  fields: [localized('label', 'Title'), localized('description', 'Description')],
  preview: {select: {title: 'label.pl'}},
})
const research = defineType({
  name: 'researchPage',
  title: 'Resources / Materiały',
  type: 'document',
  initialValue: seeds.research,
  fields: [
    defineField({
      name: 'copy',
      title: 'Bilingual page text',
      type: 'object',
      fields: copyFields(seeds.research.copy),
    }),
    defineField({
      name: 'clips',
      title: 'Legacy video placeholders',
      hidden: true,
      readOnly: true,
      description: 'Replaced by the vitality parameters editor.',
      type: 'array',
      of: [defineArrayMember({type: 'clipPlaceholder'})],
      validation: (rule) => rule.max(20),
    }),
    ...researchMediaFields,
    localized('seoTitle', 'SEO title'),
    localized('seoDescription', 'SEO description'),
  ],
  preview: {prepare: () => ({title: 'Resources / Materiały'})},
})
export const sharedTypes = [link, clip, shell, research, ...researchTypes]
