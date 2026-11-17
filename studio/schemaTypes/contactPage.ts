import {defineField, defineType} from 'sanity'
import {contactInitialValue} from '../initialValues'

export default defineType({
  name: 'contactPage',
  title: 'Contact / Kontakt',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'Search engines'},
  ],
  description: 'Contact page labels. Address, phone and email are managed in Site settings.',
  initialValue: contactInitialValue,
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      group: 'content',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Introduction',
      group: 'content',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'addressTitle',
      title: 'Address heading',
      group: 'content',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'phoneTitle',
      title: 'Phone heading',
      group: 'content',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'emailTitle',
      title: 'Email heading',
      group: 'content',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'mapTitle',
      title: 'Accessible map title',
      group: 'content',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      group: 'seo',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      group: 'seo',
      type: 'localizedText',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {prepare: () => ({title: 'Contact / Kontakt'})},
})
