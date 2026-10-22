import {defineType, defineField, defineArrayMember} from 'sanity'
import seeds from '../sharedInitialValues.json'
const localized = (name: string, title: string) =>
  defineField({name, title, type: 'localizedText', validation: (rule) => rule.required()})
const score = defineField({
  name: 'score',
  title: 'Score',
  type: 'number',
  validation: (rule) => rule.required().integer().min(0).max(100),
})
const video = defineType({
  name: 'researchVideo',
  title: 'Scored video',
  type: 'object',
  fields: [
    score,
    localized('caption', 'Description in each language'),
    defineField({
      name: 'file',
      title: 'Replacement MP4 video',
      type: 'file',
      options: {accept: 'video/mp4'},
      description:
        'Optional replacement. The supplied review video remains until replaced. Sanity uploads are public CDN files; upload only material approved for public sharing.',
    }),
    defineField({
      name: 'poster',
      title: 'Preview image',
      type: 'image',
      options: {accept: 'image/png,image/jpeg,image/webp'},
    }),
    defineField({
      name: 'legacyVideo',
      title: 'Supplied review video',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'legacyPoster',
      title: 'Supplied preview image',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
  ],
  preview: {
    select: {score: 'score', subtitle: 'caption.pl'},
    prepare: ({score, subtitle}) => ({title: 'Score ' + score, subtitle}),
  },
})
const grade = defineType({
  name: 'researchGrade',
  title: 'Scale grade',
  type: 'object',
  fields: [score, localized('description', 'Description')],
  preview: {
    select: {score: 'score', subtitle: 'description.pl'},
    prepare: ({score, subtitle}) => ({title: 'Score ' + score, subtitle}),
  },
})
const parameter = defineType({
  name: 'researchParameter',
  title: 'Vitality parameter',
  type: 'object',
  fields: [
    localized('title', 'Title'),
    defineField({name: 'note', title: 'Optional note', type: 'localizedText'}),
    defineField({
      name: 'grades',
      title: 'Scale descriptions (accessible text version)',
      type: 'array',
      of: [defineArrayMember({type: 'researchGrade'})],
      validation: (rule) => rule.max(10),
    }),
    defineField({
      name: 'clips',
      title: 'Videos — shown from lowest to highest score',
      type: 'array',
      of: [defineArrayMember({type: 'researchVideo'})],
      validation: (rule) =>
        rule.max(20).custom((value) => {
          const scores = (value || [])
            .map((v) => (v as {score?: number}).score)
            .filter((v) => v !== undefined)
          return new Set(scores).size === scores.length
            ? true
            : 'Each video must have a unique score within this parameter.'
        }),
    }),
  ],
  preview: {select: {title: 'title.pl'}},
})
export const researchTypes = [video, grade, parameter]
export const researchMediaFields = [
  defineField({
    name: 'showAttachment',
    title: 'Show spreadsheet download',
    type: 'boolean',
    initialValue: true,
    description: 'Turn off to hide the download, including the supplied mock file.',
  }),
  defineField({
    name: 'attachmentFile',
    title: 'Replacement Excel workbook (.xlsx)',
    type: 'file',
    options: {accept: '.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'},
    description:
      'Optional replacement for the mock workbook. Update the bilingual download label and description when replacing it. Sanity uploads are public CDN files; upload only material approved for public sharing.',
  }),
  defineField({
    name: 'legacyAttachment',
    title: 'Supplied mock workbook',
    type: 'string',
    hidden: true,
    readOnly: true,
  }),
  defineField({
    name: 'tableImage',
    title: 'Vitality-scale table image',
    type: 'image',
    options: {accept: 'image/png,image/jpeg,image/webp,image/avif'},
    description:
      'Optional replacement for the supplied lossless PNG. Uploads to Sanity are public CDN files.',
  }),
  defineField({
    name: 'legacyTable',
    title: 'Supplied review table',
    type: 'string',
    hidden: true,
    readOnly: true,
  }),
  defineField({
    name: 'parameters',
    title: 'Vitality parameters — drag to reorder columns',
    type: 'array',
    of: [defineArrayMember({type: 'researchParameter'})],
    initialValue: seeds.research.parameters,
    validation: (rule) => rule.max(20),
  }),
]
