import {defineType, defineField, defineArrayMember, type FieldDefinition} from 'sanity'
import seeds from '../marketingInitialValues.json'

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
const route = defineField({
  name: 'route',
  title: 'Destination page',
  type: 'string',
  options: {list: routes},
  validation: (rule) =>
    rule
      .required()
      .custom((value) =>
        routes.includes(String(value)) ? true : 'Choose an existing website page.',
      ),
})
const title = localized('title', 'Title'),
  description = localized('description', 'Description')
const media = [
  defineField({
    name: 'image',
    title: 'Upload image',
    type: 'image',
    options: {hotspot: true, accept: 'image/png,image/jpeg,image/webp,image/avif'},
    description: 'The original website image remains until replaced.',
  }),
  defineField({
    name: 'legacyImage',
    title: 'Original image',
    type: 'string',
    readOnly: true,
    hidden: true,
  }),
  localized('alt', 'Image description'),
]
const card = defineType({
  name: 'marketingCard',
  title: 'Card',
  type: 'object',
  fields: [title, description],
  preview: {select: {title: 'title.pl'}},
})
const quickLink = defineType({
  name: 'marketingQuickLink',
  title: 'Quick link',
  type: 'object',
  fields: [title, description, route],
  preview: {select: {title: 'title.pl', subtitle: 'route'}},
})
const action = defineType({
  name: 'marketingAction',
  title: 'Button',
  type: 'object',
  fields: [localized('label', 'Label'), localized('aria', 'Accessible description'), route],
  preview: {select: {title: 'label.pl', subtitle: 'route'}},
})
function isHttps(value: unknown) {
  try {
    const u = new URL(String(value))
    return u.protocol === 'https:' && !u.username && !u.password
  } catch {
    return false
  }
}
const banner = defineType({
  name: 'marketingBanner',
  title: 'News banner',
  type: 'object',
  fields: [
    title,
    description,
    ...media,
    defineField({
      name: 'url',
      title: 'Link (each language)',
      type: 'localizedText',
      validation: (rule) =>
        rule.required().custom((value) => {
          const v = value as {pl?: string; en?: string} | undefined
          return v && isHttps(v.pl) && isHttps(v.en)
            ? true
            : 'Both links must use HTTPS without credentials.'
        }),
    }),
  ],
  preview: {select: {title: 'title.pl', media: 'image'}},
})
const logo = defineType({
  name: 'marketingLogo',
  title: 'Funder logo',
  type: 'object',
  fields: [
    ...media,
    defineField({
      name: 'url',
      title: 'HTTPS link',
      type: 'url',
      validation: (rule) => rule.required().uri({scheme: ['https']}),
    }),
  ],
  preview: {select: {title: 'alt.pl', media: 'image'}},
})
const track = defineType({
  name: 'recruitmentTrack',
  title: 'Recruitment path',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Path name (also the form subject)',
      type: 'localizedText',
      validation: (rule) =>
        rule.required().custom((value) => {
          const v = value as {pl?: string; en?: string} | undefined
          return v && [v.pl, v.en].every((s) => s && s.trim().length >= 5 && s.length <= 200)
            ? true
            : 'Both names must be 5–200 characters to work as form subjects.'
        }),
    }),
    description,
    localized('requirements', 'Preparation requirements'),
  ],
  preview: {select: {title: 'label.pl'}},
})
const scope = defineType({
  name: 'marketingText',
  title: 'Text item',
  type: 'object',
  fields: [localized('text', 'Text')],
  preview: {select: {title: 'text.pl'}},
})
function validMessage(value: unknown, template: string): boolean {
  if (typeof value !== 'string' || !value.trim()) return false
  const tokens = (s: string) =>
    [...new Set(s.match(/\{[A-Za-z][A-Za-z0-9]*\}/g) || [])].sort().join(',')
  return (
    !/[{}<>]/.test(value.replace(/\{[A-Za-z][A-Za-z0-9]*\}/g, '')) &&
    tokens(value) === tokens(template)
  )
}
function copyFields(copy: Record<string, unknown>): FieldDefinition[] {
  return Object.entries(copy).map(([name, raw]) => {
    const value = raw as Record<string, unknown>
    if (value._type === 'localizedText')
      return defineField({
        name,
        title: name.replace(/([A-Z])/g, ' $1'),
        type: 'localizedText',
        validation: (rule) =>
          rule.required().custom((input) => {
            const v = input as Record<string, unknown> | undefined
            return v && validMessage(v.pl, String(value.pl)) && validMessage(v.en, String(value.en))
              ? true
              : 'Keep any {parameter} placeholders and use plain text without HTML or extra braces.'
          }),
      })
    return defineField({
      name,
      title: name.replace(/([A-Z])/g, ' $1'),
      type: 'object',
      fields: copyFields(value),
      validation: (rule) => rule.required(),
    })
  })
}
const arrays: Record<string, [string, string, string][]> = {
  home: [
    ['heroButtons', 'Hero buttons', 'marketingAction'],
    ['banners', 'News banners', 'marketingBanner'],
    ['infoCards', 'Information cards', 'marketingCard'],
    ['researchAreas', 'Research areas', 'marketingCard'],
    ['features', 'Feature cards', 'marketingCard'],
    ['quickLinks', 'Quick links', 'marketingQuickLink'],
    ['grantLogos', 'Funder logos', 'marketingLogo'],
    ['ctaButtons', 'Closing buttons', 'marketingAction'],
  ],
  recruitment: [
    ['benefits', 'Benefits', 'marketingCard'],
    ['tracks', 'Recruitment paths', 'recruitmentTrack'],
  ],
  cooperation: [
    ['offers', 'Offers', 'marketingCard'],
    ['scope', 'Cooperation scope', 'marketingText'],
  ],
}
const labels: Record<string, string> = {
  home: 'Home / Strona główna',
  recruitment: 'Recruitment / Rekrutacja',
  cooperation: 'Cooperation / Współpraca',
}
const pages = Object.entries(seeds).map(([name, initial]) =>
  defineType({
    name: name + 'Page',
    title: labels[name],
    type: 'document',
    initialValue: initial,
    groups: [
      {name: 'lists', title: 'Cards and lists', default: true},
      {name: 'copy', title: 'Page and form labels'},
      {name: 'seo', title: 'Search engines'},
    ],
    fields: [
      ...arrays[name].map(([key, title, type]) =>
        defineField({
          name: key,
          title: title + ' — drag to reorder',
          group: 'lists',
          type: 'array',
          of: [defineArrayMember({type})],
          validation: (rule) => rule.required().max(100),
        }),
      ),
      defineField({
        name: 'copy',
        title: 'Bilingual text',
        group: 'copy',
        type: 'object',
        fields: copyFields(initial.copy),
        validation: (rule) => rule.required(),
      }),
      {...localized('seoTitle', 'SEO title'), group: 'seo'},
      {...localized('seoDescription', 'SEO description'), group: 'seo'},
    ],
    preview: {prepare: () => ({title: labels[name]})},
  }),
)
export const marketingTypes = [card, quickLink, action, banner, logo, track, scope, ...pages]
