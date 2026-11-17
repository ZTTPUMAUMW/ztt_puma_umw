import {defineArrayMember, defineField, defineType, type Rule, type FieldDefinition} from 'sanity'
import initialValues from '../collectionInitialValues.json'

const localized = (name: string, title: string, required = true) =>
  defineField({
    name,
    title,
    type: 'localizedText',
    ...(required ? {validation: (rule: Rule) => rule.required()} : {}),
  })
const plain = (name: string, title: string, required = true) =>
  defineField({
    name,
    title,
    type: 'string',
    validation: (rule) => (required ? rule.required().max(500) : rule.max(500)),
  })
const url = (name: string, title: string, required = false) =>
  defineField({
    name,
    title,
    type: 'url',
    validation: (rule) =>
      required ? rule.required().uri({scheme: ['https']}) : rule.uri({scheme: ['https']}),
  })
const imageFields = [
  defineField({
    name: 'image',
    title: 'Upload image',
    type: 'image',
    options: {hotspot: true, accept: 'image/png,image/jpeg,image/webp,image/avif'},
    description: 'The current website image is retained until you upload a replacement.',
  }),
  defineField({
    name: 'legacyImage',
    title: 'Existing image path',
    type: 'string',
    readOnly: true,
    hidden: true,
  }),
  localized('alt', 'Image description'),
]
const profileLink = defineType({
  name: 'profileLink',
  title: 'Profile link',
  type: 'object',
  fields: [localized('title', 'Label'), url('url', 'HTTPS URL', true)],
  preview: {select: {title: 'title.pl', subtitle: 'url'}},
})
const projectRole = defineType({
  name: 'projectRole',
  title: 'Project team member',
  type: 'object',
  fields: [
    plain('name', 'Name'),
    localized('academicTitle', 'Academic title', false),
    localized('universityTitle', 'University title', false),
    localized('role', 'Role'),
  ],
  preview: {select: {title: 'name'}},
})
const teamEntry = defineType({
  name: 'teamEntry',
  title: 'Team member',
  type: 'object',
  fields: [
    plain('name', 'Name'),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Researchers / Pracownicy', value: 'pracownicy'},
          {title: 'Doctoral students / Doktoranci', value: 'doktoranci'},
          {title: 'Students / Studenci', value: 'studenci'},
        ],
      },
      initialValue: 'pracownicy',
      validation: (rule) => rule.required(),
    }),
    localized('academicTitle', 'Academic title', false),
    localized('universityTitle', 'University title', false),
    localized('position', 'Position'),
    localized('copy', 'Biography'),
    ...imageFields,
    defineField({
      name: 'links',
      title: 'Profile links',
      type: 'array',
      of: [defineArrayMember({type: 'profileLink'})],
      validation: (rule) => rule.max(20),
    }),
  ],
  preview: {select: {title: 'name', subtitle: 'category', media: 'image'}},
})
const projectEntry = defineType({
  name: 'projectEntry',
  title: 'Project',
  type: 'object',
  fields: [
    localized('title', 'Title'),
    localized('description', 'Description'),
    localized('fundingBody', 'Funder'),
    plain('fundingNumber', 'Project number', false),
    plain('funderCode', 'Funder acronym'),
    defineField({
      name: 'fundingAmount',
      title: 'Funding amount',
      type: 'number',
      validation: (rule) => rule.required().min(0).max(1e12),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'PLN',
      validation: (rule) => rule.required().regex(/^[A-Z]{3}$/),
    }),
    ...imageFields.filter((field) => field.name !== 'alt'),
    url('url', 'Project link'),
    defineField({
      name: 'roles',
      title: 'Project team',
      type: 'array',
      of: [defineArrayMember({type: 'projectRole'})],
      validation: (rule) => rule.max(100),
    }),
  ],
  preview: {select: {title: 'title.pl', subtitle: 'fundingBody.pl', media: 'image'}},
})
const publicationEntry = defineType({
  name: 'publicationEntry',
  title: 'Publication',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Original publication title',
      type: 'text',
      rows: 3,
      description: 'Preserve the published bibliographic title in its original language.',
      validation: (rule) => rule.required().max(3000),
    }),
    defineField({
      name: 'authors',
      title: 'Authors in publication order',
      type: 'text',
      description: 'Separate author names with " and ", as in the existing records.',
      validation: (rule) => rule.required().max(10000),
    }),
    plain('journal', 'Journal'),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1800).max(3000),
    }),
    defineField({
      name: 'month',
      title: 'Month (1–12)',
      type: 'number',
      validation: (rule) => rule.required().integer().min(1).max(12),
    }),
    plain('doi', 'DOI', false),
    url('url', 'Article URL', true),
  ],
  preview: {select: {title: 'title', subtitle: 'journal'}},
})
const richFields = ['pl', 'en'].map((name) =>
  defineField({
    name,
    title: name === 'pl' ? 'Polski' : 'English',
    type: 'array',
    of: [
      defineArrayMember({
        type: 'block',
        styles: [{title: 'Paragraph', value: 'normal'}],
        lists: [
          {title: 'Bulleted list', value: 'bullet'},
          {title: 'Numbered list', value: 'number'},
        ],
        marks: {
          decorators: [
            {title: 'Bold', value: 'strong'},
            {title: 'Italic', value: 'em'},
          ],
          annotations: [],
        },
      }),
    ],
    validation: (rule) => rule.required().min(1).max(100),
  }),
)
const localizedRichText = defineType({
  name: 'localizedRichText',
  title: 'Bilingual rich text',
  type: 'object',
  fields: richFields,
})
const modelEntry = defineType({
  name: 'modelEntry',
  title: 'Research model',
  type: 'object',
  fields: [
    localized('title', 'Title'),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localizedRichText',
      validation: (rule) => rule.required(),
    }),
    ...imageFields,
  ],
  preview: {select: {title: 'title.pl', media: 'image'}},
})
function copyFields(value: Record<string, unknown>): FieldDefinition[] {
  return Object.entries(value).map(([name, item]) => {
    const title = name.replace(/([A-Z])/g, ' $1')
    if ((item as {_type?: string})._type === 'localizedText') return localized(name, title)
    return defineField({
      name,
      title,
      type: 'object',
      fields: copyFields(item as Record<string, unknown>),
      validation: (rule) => rule.required(),
    })
  })
}
const labels: Record<string, string> = {
  team: 'Team / Zespół',
  projects: 'Projects / Projekty',
  publications: 'Publications / Publikacje',
  models: 'Models / Modele',
}
const itemTypes = {
  team: 'teamEntry',
  projects: 'projectEntry',
  publications: 'publicationEntry',
  models: 'modelEntry',
}
export const collectionPageTypes = Object.entries(initialValues).map(([name, initial]) =>
  defineType({
    name: name + 'Page',
    title: labels[name],
    type: 'document',
    groups: [
      {name: 'items', title: 'Entries', default: true},
      {name: 'copy', title: 'Page labels'},
      {name: 'seo', title: 'Search engines'},
    ],
    initialValue: initial,
    fields: [
      defineField({
        name: 'items',
        title: 'Entries — drag to reorder',
        group: 'items',
        type: 'array',
        of: [defineArrayMember({type: itemTypes[name as keyof typeof itemTypes]})],
        validation: (rule) => rule.required().max(1000),
      }),
      defineField({
        name: 'copy',
        title: 'Page copy and interface labels',
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
export const collectionTypes = [
  profileLink,
  projectRole,
  teamEntry,
  projectEntry,
  publicationEntry,
  localizedRichText,
  modelEntry,
  ...collectionPageTypes,
]
