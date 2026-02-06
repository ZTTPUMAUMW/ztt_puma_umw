import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '6gulcr1j',
  dataset: 'production',
  apiVersion: '2025-12-02', // aktualna data w formacie YYYY-MM-DD
  useCdn: true, // true = szybsze pobieranie, dane mogą być cache'owane
})
