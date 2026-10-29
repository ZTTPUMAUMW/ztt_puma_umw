import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'localizedText',
  title: 'Polish and English',
  type: 'object',
  fields: [
    defineField({
      name: 'pl',
      title: 'Polski',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .max(3000)
          .custom((value) => (!value || value.trim() ? true : 'Enter text, not only spaces.')),
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule
          .required()
          .min(1)
          .max(3000)
          .custom((value) => (!value || value.trim() ? true : 'Enter text, not only spaces.')),
    }),
  ],
})
